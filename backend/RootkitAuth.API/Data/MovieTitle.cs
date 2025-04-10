using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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

        [JsonPropertyName("action")]
        public int? Action { get; set; }

        [JsonPropertyName("adventure")]
        public int? Adventure { get; set; }
        [JsonPropertyName("anime")]
        public int? Anime{ get; set; }
        [JsonPropertyName("british_Docuseries")]
        public int? British_Docuseries { get; set; }
        [JsonPropertyName("children")]
        public int? Children { get; set; }
        [JsonPropertyName("comedies")]
        public int? Comedies { get; set; }
        [JsonPropertyName("comedies_Dramas")]
        public int? Comedies_Dramas { get; set; }
        [JsonPropertyName("comedies_International")]
        public int? Comedies_International { get; set; }
        [JsonPropertyName("comedies_Romantic")]
        public int? Comedies_Romantic { get; set; }
        [JsonPropertyName("crime_TV")]
        public int? Crime_TV { get; set; }
        [JsonPropertyName("documentaries")]
        public int? Documentaries { get; set; }
        [JsonPropertyName("documentaries_International")]
        public int? Documentaries_International { get; set; }
        [JsonPropertyName("docuseries")]
        public int? Docuseries { get; set; }
        [JsonPropertyName("dramas")]
        public int? Dramas { get; set; }
        [JsonPropertyName("dramas_International")]
        public int? Dramas_International { get; set; }
        [JsonPropertyName("dramas_Romantic")]
        public int? Dramas_Romantic { get; set; }
        [JsonPropertyName("family")]

        public int? Family { get; set; }
        [JsonPropertyName("fantasy")]

        public int? Fantasy { get; set; }
        [JsonPropertyName("horror")]

        public int? Horror { get; set; }
        [JsonPropertyName("international_Thrillers")]

        public int? International_Thrillers { get; set; }
        [JsonPropertyName("international_Romantic_Dramas_TV")]

        public int? International_Romantic_Dramas_TV { get; set; }
        [JsonPropertyName("kids_TV")]

        public int? Kids_TV { get; set; }
        [JsonPropertyName("language_TV")]

        public int? Language_TV { get; set; }
        [JsonPropertyName("musicals")]

        public int? Musicals { get; set; }
        [JsonPropertyName("nature_TV")]

        public int? Nature_TV { get; set; }
        [JsonPropertyName("reality_TV")]

        public int? Reality_TV { get; set; }
        [JsonPropertyName("spirituality")]

        public int? Spirituality { get; set; }
        [JsonPropertyName("tv_Action")]

        public int? TV_Action { get; set; }
        [JsonPropertyName("tv_Comedies")]

        public int? TV_Comedies { get; set; }
        [JsonPropertyName("tv_Dramas")]

        public int? TV_Dramas { get; set; }
        [JsonPropertyName("talk_Shows")]

        public int? Talk_Shows { get; set; }
        [JsonPropertyName("thrillers")]

        public int? Thrillers { get; set; }

    }
}
