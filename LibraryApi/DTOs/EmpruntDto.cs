namespace LibraryApi.DTOs
{
  
    public class CreateEmpruntDto
    {
        public string EtudiantCEF { get; set; } = string.Empty;

        public string LivreTitre { get; set; } = string.Empty;

        public DateTime DateRetourPrevue { get; set; }

        public string EtatAvantEmprunt { get; set; } = "Bon";

        public string? Observation { get; set; }
    }


    public class EmpruntDto
    {
        public int Id_Emprunt { get; set; }

        public string EtudiantCEF { get; set; } = string.Empty;

        public string LivreTitre { get; set; } = string.Empty;

        public DateTime DateEmprunt { get; set; }

        public DateTime DateRetourPrevue { get; set; }

        public DateTime? DateRetourReelle { get; set; }

        public string EtatAvantEmprunt { get; set; } = string.Empty;

        public string? EtatAuRetour { get; set; }

        public string? Observation { get; set; }

        public string Statut { get; set; } = string.Empty;
    }

}