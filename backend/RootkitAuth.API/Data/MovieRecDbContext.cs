using Microsoft.EntityFrameworkCore;

namespace RootkitAuth.API.Data
{
    public class MovieRecDbContext : DbContext
    {
        public MovieRecDbContext(DbContextOptions<MovieRecDbContext> options) : base(options)
        {
        }

        public DbSet<MovieRecs> movie_recommendations { get; set; }
    }
}