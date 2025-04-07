using System.ComponentModel.DataAnnotations;

namespace RootkitAuth.API.Data
{
    public class MovieRating
    {
        [Key]
        public int user_id { get; set; }
        public string? show_id { get; set; }
        public int? rating { get; set; }
        
    }
}