using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryApi.Models
{
    public class Emprunt
    {
        [Key]
        public int Id_Emprunt { get; set; }

        // CEF de l'étudiant (provenant du serveur Administration)
        [Required]
        [MaxLength(20)]
        public string EtudiantCEF { get; set; } = string.Empty;

        // Livre
        public int Id_Livre { get; set; }

        [ForeignKey(nameof(Id_Livre))]
        public Livre Livre { get; set; } = null!;

        // Dates
        public DateTime Date_Emprunt { get; set; }

        public DateTime DateRetourPrevue { get; set; }

        public DateTime? DateRetourReelle { get; set; }

        // État du livre avant l'emprunt
        [Required]
        [MaxLength(20)]
        public string EtatAvantEmprunt { get; set; } = "Bon";

        // État du livre au retour
        [MaxLength(20)]
        public string? EtatAuRetour { get; set; }

        // Observation
        [MaxLength(500)]
        public string? Observation { get; set; }

        // En Cours - Terminé - Annulé - En Retard
        [Required]
        [MaxLength(20)]
        public string Statut { get; set; } = "En Cours";


    }
}