using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RootkitAuth.API.Data
{
    public class MovieRating
    {
        [Key]
        public int user_id { get; set; }
        [ForeignKey("show_id")]
        public string? show_id { get; set; }
        public MovieTitle? MovieTitle { get; set; }

        [ForeignKey("user_id")]
        public int? rating { get; set; }
        public MovieUser? MovieUser { get; set; }

    }
}