using Microsoft.EntityFrameworkCore;

namespace RootkitAuth.API.Data
{
    public class GenreRecommendationDbContext : DbContext
    {
        public GenreRecommendationDbContext(DbContextOptions<GenreRecommendationDbContext> options) : base(options) { }

        public DbSet<UserGenreRecommendation> UserGenreRecommendations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGenreRecommendation>().HasNoKey();
            modelBuilder.Entity<UserGenreRecommendation>().ToTable("user_genre_recommendations");
        }
    }

}
