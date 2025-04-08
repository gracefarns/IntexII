using Microsoft.AspNetCore.Mvc;
using RootkitAuth.API.Data;

namespace RootkitAuth.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        private readonly MovieRecDbContext _movieRecDbContext;

        public RecommendationController(MovieRecDbContext movieRecDbContext)
        {
            _movieRecDbContext = movieRecDbContext;
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
    }
}