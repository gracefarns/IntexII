using Microsoft.EntityFrameworkCore;

namespace RootkitAuth.API.Data;

public class MovieDbContext: DbContext
{
    public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<MovieRating> movies_ratings { get; set; }
    public DbSet<MovieTitle> movies_titles { get; set; }
    public DbSet<MovieUser> movies_users { get; set; }
}