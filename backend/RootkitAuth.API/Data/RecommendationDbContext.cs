using Microsoft.EntityFrameworkCore;

namespace RootkitAuth.API.Data
{
    public class RecommendationDbContext : DbContext
    {
        public RecommendationDbContext(DbContextOptions<RecommendationDbContext> options) : base(options) { }

        public DbSet<UserRecommendation> UserRecommendations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRecommendation>().HasNoKey();
            modelBuilder.Entity<UserRecommendation>().ToTable("user_recommendations");
        }
    }

}
