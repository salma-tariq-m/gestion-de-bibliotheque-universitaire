using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryApi.Models
{
    public class Livre
    {
        [Key]
        public int Id_Livre { get; set; }

        [Required]
        [MaxLength(200)]
        public string Titre { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Auteur { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string ISBN { get; set; } = string.Empty;

        public int Annee { get; set; }

        [Required]
        public int Quantite { get; set; }

        // Foreign Key
        public int Id_Categorie { get; set; }

        // Navigation Property
        [ForeignKey(nameof(Id_Categorie))]
        public Categorie Categorie { get; set; } = null!;

        // Un livre peut être emprunté plusieurs fois
        public ICollection<Emprunt> Emprunts { get; set; } = new List<Emprunt>();
    }
}