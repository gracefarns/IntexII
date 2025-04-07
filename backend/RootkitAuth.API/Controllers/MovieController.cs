using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using RootkitAuth.API.Data;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace RootkitAuth.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
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

        [HttpGet("GetSingleMovie/{id}")]
        public IActionResult GetSingleMovie(string id)
        {
            var movie = _movieDbContext.movies_titles
                .First(m => m.show_id == id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] Movie newMovie)
        {
            _movieDbContext.movies_titles.Add(newMovie);
            _movieDbContext.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{movieId}")]
        public IActionResult UpdateMovie(string movieId, [FromBody] Book updatedMovie)
        {
            var existingMovie = _movieDbContext.movies_titles.Find(movieId);

            existingMovie.type = updatedMovie.type;
            existingMovie.title = updatedMovie.title;
            existingMovie.director = updatedMovie.director;
            existingMovie.cast = updatedMovie.cast;
            existingMovie.country = updatedMovie.country;
            existingMovie.release_year = updatedMovie.release_year;
            existingMovie.rating = updatedMovie.rating;
            existingMovie.duration = updatedMovie.duration;
            existingMovie.description = updatedMovie.description;

            existingMovie.Action = updatedMovie.Action;
            existingMovie.Adventure = updatedMovie.Adventure;
            existingMovie.Anime = updatedMovie.Anime;
            existingMovie.British_Docuseries = updatedMovie.British_Docuseries;
            existingMovie.Children = updatedMovie.Children;
            existingMovie.Comedies = updatedMovie.Comedies;
            existingMovie.Comedies_Dramas = updatedMovie.Comedies_Dramas;
            existingMovie.Comedies_International = updatedMovie.Comedies_International;
            existingMovie.Comedies_Romantic = updatedMovie.Comedies_Romantic;
            existingMovie.Crime_TV = updatedMovie.Crime_TV;
            existingMovie.Documentaries = updatedMovie.Documentaries;
            existingMovie.Documentaries_International = updatedMovie.Documentaries_International;
            existingMovie.Docuseries = updatedMovie.Docuseries;
            existingMovie.Dramas = updatedMovie.Dramas;
            existingMovie.Dramas_International = updatedMovie.Dramas_International;
            existingMovie.Dramas_Romantic = updatedMovie.Dramas_Romantic;
            existingMovie.Family = updatedMovie.Family;
            existingMovie.Fantasy = updatedMovie.Fantasy;
            existingMovie.Horror = updatedMovie.Horror;
            existingMovie.International_Thrillers = updatedMovie.International_Thrillers;
            existingMovie.International_Romantic_Dramas_TV = updatedMovie.International_Romantic_Dramas_TV;
            existingMovie.Kids_TV = updatedMovie.Kids_TV;
            existingMovie.Language_TV = updatedMovie.Language_TV;
            existingMovie.Musicals = updatedMovie.Musicals;
            existingMovie.Nature_TV = updatedMovie.Nature_TV;
            existingMovie.Reality_TV = updatedMovie.Reality_TV;
            existingMovie.Spirituality = updatedMovie.Spirituality;
            existingMovie.TV_Action = updatedMovie.TV_Action;
            existingMovie.TV_Comedies = updatedMovie.TV_Comedies;
            existingMovie.TV_Dramas = updatedMovie.TV_Dramas;
            existingMovie.Talk_Shows = updatedMovie.Talk_Shows;
            existingMovie.Thrillers = updatedMovie.Thrillers;

            _movieDbContext.movies_titles.Update(existingMovie);
            _movieDbContext.SaveChanges();

            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{movieId}")]
        public IActionResult DeleteMovie(string movieId)
        {
            var movie = _movieDbContext.movies_titles.Find(movieId);

            if (movie == null){
                return NotFound(new {message = "Movie not found"});
            }

            _movieDbContext.movies_titles.Remove(movie);
            _movieDbContext.SaveChanges();

            return NoContent();
        }

    }
}
