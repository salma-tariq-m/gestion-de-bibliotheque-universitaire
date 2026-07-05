using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    public class Categorie
    {
        [Key]
        public int Id_Categorie { get; set; }

        [Required]
        [MaxLength(100)]
        public string NomCategorie { get; set; } = string.Empty;

        [MaxLength(300)]
        public string? Description { get; set; }

        // Une catégorie contient plusieurs livres
        public ICollection<Livre> Livres { get; set; } = new List<Livre>();
    }
}