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
    //[Authorize]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieDbContext;
        public MovieController(MovieDbContext movieDbContext)
        {
            _movieDbContext = movieDbContext;
        }

        [HttpGet("GetMovies")]
        public IActionResult GetMovies(
        int pageSize = 10,
        int pageNum = 1,
        [FromQuery(Name = "selectedCategories")] List<string>? selectedCategories = null,
        string? searchTerm = null)
            {
                Console.WriteLine("Received GetMovies request");

                var query = _movieDbContext.movies_titles.AsQueryable();

                //Log selected categories
                Console.WriteLine("Selected Categories:");
                if (selectedCategories != null && selectedCategories.Any())
                {
                    foreach (var category in selectedCategories)
                    {
                        Console.WriteLine($" - {category}");

                        switch (category)
                        {
                            case "Action":
                                query = query.Where(m => m.Action == 1);
                                break;
                            case "Adventure":
                                query = query.Where(m => m.Adventure == 1);
                                break;
                            case "Anime":
                                query = query.Where(m => m.Anime == 1);
                                break;
                            case "British_Docuseries":
                                query = query.Where(m => m.British_Docuseries == 1);
                                break;
                            case "Children":
                                query = query.Where(m => m.Children == 1);
                                break;
                            case "Comedies":
                                query = query.Where(m => m.Comedies == 1);
                                break;
                            case "Comedies_Dramas":
                                query = query.Where(m => m.Comedies_Dramas == 1);
                                break;
                            case "Comedies_International":
                                query = query.Where(m => m.Comedies_International == 1);
                                break;
                            case "Comedies_Romantic":
                                query = query.Where(m => m.Comedies_Romantic == 1);
                                break;
                            case "Crime_TV":
                                query = query.Where(m => m.Crime_TV == 1);
                                break;
                            case "Documentaries":
                                query = query.Where(m => m.Documentaries == 1);
                                break;
                            case "Documentaries_International":
                                query = query.Where(m => m.Documentaries_International == 1);
                                break;
                            case "Docuseries":
                                query = query.Where(m => m.Docuseries == 1);
                                break;
                            case "Dramas":
                                query = query.Where(m => m.Dramas == 1);
                                break;
                            case "Dramas_International":
                                query = query.Where(m => m.Dramas_International == 1);
                                break;
                            case "Dramas_Romantic":
                                query = query.Where(m => m.Dramas_Romantic == 1);
                                break;
                            case "Family":
                                query = query.Where(m => m.Family == 1);
                                break;
                            case "Fantasy":
                                query = query.Where(m => m.Fantasy == 1);
                                break;
                            case "Horror":
                                query = query.Where(m => m.Horror == 1);
                                break;
                            case "International_Thrillers":
                                query = query.Where(m => m.International_Thrillers == 1);
                                break;
                            case "International_Romantic_Dramas_TV":
                                query = query.Where(m => m.International_Romantic_Dramas_TV == 1);
                                break;
                            case "Kids_TV":
                                query = query.Where(m => m.Kids_TV == 1);
                                break;
                            case "Language_TV":
                                query = query.Where(m => m.Language_TV == 1);
                                break;
                            case "Musicals":
                                query = query.Where(m => m.Musicals == 1);
                                break;
                            case "Nature_TV":
                                query = query.Where(m => m.Nature_TV == 1);
                                break;
                            case "Reality_TV":
                                query = query.Where(m => m.Reality_TV == 1);
                                break;
                            case "Spirituality":
                                query = query.Where(m => m.Spirituality == 1);
                                break;
                            case "TV_Action":
                                query = query.Where(m => m.TV_Action == 1);
                                break;
                            case "TV_Comedies":
                                query = query.Where(m => m.TV_Comedies == 1);
                                break;
                            case "TV_Dramas":
                                query = query.Where(m => m.TV_Dramas == 1);
                                break;
                            case "Talk_Shows":
                                query = query.Where(m => m.Talk_Shows == 1);
                                break;
                            case "Thrillers":
                                query = query.Where(m => m.Thrillers == 1);
                                break;
                            default:
                                Console.WriteLine($" Unknown category: {category}");
                                break;
                        }
                    }
                }
                else
                {
                    Console.WriteLine(" - (none)");
                }

                //  Log searchTerm
                if (!string.IsNullOrEmpty(searchTerm))
                {
                    Console.WriteLine($"Applying searchTerm: {searchTerm}");
                    query = query.Where(m =>
                        (m.title ?? "").ToLower().Contains(searchTerm.ToLower()) ||
                        (m.director ?? "").ToLower().Contains(searchTerm.ToLower()));
                }

                //  Log total before paging
                var totalNumMovies = query.Count();
                Console.WriteLine($"Total matching movies: {totalNumMovies}");

                //  Apply pagination
                var movies = query
                    .OrderBy(m => m.title)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                Console.WriteLine($"Returning {movies.Count} movies on page {pageNum}");

                return Ok(new
                {
                    movies,
                    totalNumMovies
                });
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
        public IActionResult GetSingleMovie(int id)
        {
            var movie = _movieDbContext.movies_titles
                .Find(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpPost("AddMovie")]
        [Authorize(Roles = "Administrator")]
        public IActionResult AddMovie([FromBody] MovieTitle newMovie)
        {
            _movieDbContext.movies_titles.Add(newMovie);
            _movieDbContext.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{movieId}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult UpdateMovie(int movieId, [FromBody] MovieTitle updatedMovie)
        {
            Console.WriteLine($"Looking for movie ID: {movieId}");
            var existingMovie = _movieDbContext.movies_titles.FirstOrDefault(m => m.show_id == movieId);

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
        [Authorize(Roles = "Administrator")]
        public IActionResult DeleteMovie(int movieId)
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
