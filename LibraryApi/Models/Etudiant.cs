using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    public class Etudiant
    {
        [Key]
        public int Id_etudiant { get; set; }

        [Required]
        public string Cef { get; set; } 

        [Required]
        [StringLength(100)]
        public string Nom { get; set; }

        [Required]
        [StringLength(100)]
        public string Prenom { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public int Id_Fillier { get; set; }
        public virtual ICollection<Emprunt>? Emprunts { get; set; }
        public Fillier? Fillier { get; set; }
    }
}