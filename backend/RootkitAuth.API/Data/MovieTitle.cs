using System.ComponentModel.DataAnnotations;

namespace RootkitAuth.API.Data
{
    public class MovieTitle
    {
        [Key]
        public int? show_id { get; set; }
        public string? type { get; set; }
        public string? title { get; set; }
        public string? director { get; set; }
        public string? cast { get; set; }
        public string? country { get; set; }
        public int? release_year { get; set; }
        public string? rating { get; set; }
        public string? duration { get; set; }
        public string? description { get; set; }
        public int? Action { get; set; }
        public int? Adventure { get; set; }
        public int? Anime{ get; set; }
        public int? British_Docuseries { get; set; }
        public int? Children { get; set; }
        public int? Comedies { get; set; }
        public int? Comedies_Dramas { get; set; }
        public int? Comedies_International { get; set; }
        public int? Comedies_Romantic { get; set; }
        public int? Crime_TV { get; set; }
        public int? Documentaries { get; set; }
        public int? Documentaries_International { get; set; }
        public int? Docuseries { get; set; }
        public int? Dramas { get; set; }
        public int? Dramas_International { get; set; }
        public int? Dramas_Romantic { get; set; }
        public int? Family { get; set; }
        public int? Fantasy { get; set; }
        public int? Horror { get; set; }
        public int? International_Thrillers { get; set; }
        public int? International_Romantic_Dramas_TV { get; set; }
        public int? Kids_TV { get; set; }
        public int? Language_TV { get; set; }
        public int? Musicals { get; set; }
        public int? Nature_TV { get; set; }
        public int? Reality_TV { get; set; }
        public int? Spirituality { get; set; }
        public int? TV_Action { get; set; }
        public int? TV_Comedies { get; set; }
        public int? TV_Dramas { get; set; }
        public int? Talk_Shows { get; set; }
        public int? Thrillers { get; set; }

    }
}
