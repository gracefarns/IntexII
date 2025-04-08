using Microsoft.EntityFrameworkCore;

namespace RootkitAuth.API.Data
{
    public class MovieRecDbContext : DbContext
    {
        public MovieRecDbContext(DbContextOptions<MovieRecDbContext> options) : base(options)
        {
        }

        public DbSet<MovieRecs> recommendations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieRecs>()
                .HasKey(r => new { r.source_show_id, r.rec_rank });
                
            // If table name in database is different from DbSet name
            modelBuilder.Entity<MovieRecs>()
                .ToTable("recommendations"); // Use actual table name
        }
    }
}