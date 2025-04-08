using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RootkitAuth.API.Data
{
    public class MovieRecs
    {
        [Key]
        public int source_show_id { get; set; }
        public int rec_rank { get; set; }
        public int rec_show_id { get; set; }
        public string? rec_title { get; set; }
        public string? rec_genre { get; set; }
    }
}