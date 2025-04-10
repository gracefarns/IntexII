using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using RootkitAuth.API.Data;

namespace RootkitAuth.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        private readonly MovieRecDbContext _movieRecDbContext;
        private readonly RecommendationDbContext _userTop10DbContext;
        private readonly GenreRecommendationDbContext _genreDbContext;

        public RecommendationController(MovieRecDbContext movieRecDbContext, RecommendationDbContext userTop10DbContext, GenreRecommendationDbContext genreDbContext)
        {
            _movieRecDbContext = movieRecDbContext;
            _userTop10DbContext = userTop10DbContext;
            _genreDbContext = genreDbContext;
        }

        [HttpGet("Test")]
        public IActionResult Test()
        {
            return Ok(new { message = "Recommendation controller is working!" });
        }

        [HttpGet("ForMovie/{sourceId}")]
        public IActionResult GetForMovie(int sourceId)
        {
            try
            {
                var recs = _movieRecDbContext.recommendations
                    .Where(r => r.source_show_id == sourceId)
                    .OrderBy(r => r.rec_rank)
                    .Take(10)
                    .ToList();
                
                return Ok(recs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        //Camden's recommendation controller routes
        [Authorize]
        [HttpGet("whoami")]
        public IActionResult WhoAmI()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
            return Ok(claims);
        }


        [Authorize]
        [HttpGet("personalized")]
        public IActionResult GetPersonalized()
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();

            var azureUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Console.WriteLine(azureUserId); 

            if (azureUserId == null)
                return BadRequest("Azure user ID not found.");

            // TEMPORARY mapping for dev replace with a table later
            var devMap = new Dictionary<string, int>
            {
                ["5e2e9389-2da7-4cf1-91a2-114063032ca1"] = 1
                // add the rest of the users
            };

            if (!devMap.TryGetValue(azureUserId, out int recUserId))
                return NotFound("User not mapped to recommendations.");

            var top10 = _userTop10DbContext.UserRecommendations
                .FirstOrDefault(r => r.user_id == recUserId);

            var genreRecs = _genreDbContext.UserGenreRecommendations
                .Where(r => r.user_id == recUserId)
                .Select(r => new
                {
                    r.genre,
                    Recs = new[] { r.rec_1, r.rec_2, r.rec_3, r.rec_4, r.rec_5, r.rec_6, r.rec_7, r.rec_8, r.rec_9, r.rec_10 }
                })
                .ToList();

            return Ok(new
            {
                UserId = recUserId,
                Top10 = top10,
                ByGenre = genreRecs
            });
        }

    }
}