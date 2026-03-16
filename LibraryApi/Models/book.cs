using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    public class Book
    {
        [Key] // Indique que c'est la clé primaire
        public int Id_livre { get; set; }
        public string Titre { get; set; } = string.Empty;
        public string Auteur { get; set; } = string.Empty;
        public int Quantite { get; set; }
        public int Annee { get; set; }
    }
}