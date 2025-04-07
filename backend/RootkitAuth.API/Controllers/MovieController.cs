using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using RootkitAuth.API.Data;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace RootkitAuth.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieDbContext;
        public MovieController(MovieDbContext temp)
        {
            _movieDbContext = temp;
        }
        [HttpGet("GetMovies")]

        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? containers = null)
        {
            var query = _movieDbContext.movies_titles.AsQueryable();

            if (containers != null && containers.Any())
            {
                query = query.Where(c => containers.Contains(c.rating));
            }

            var totalNumMovies = query.Count();
            var movies = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var returnMovies = new
            {
                Movies = movies,
                TotalNumMovies = totalNumMovies
            };
            
            return Ok(returnMovies);
        }

        [HttpGet("GetMovieRatings")]
        public IActionResult GetMovieRatings()
        {
            var movieRatings = _movieDbContext.movies_titles
                .Select(c => c.rating)
                .Distinct()
                .ToList();
            
            return Ok(movieRatings);
        }
    }
}
