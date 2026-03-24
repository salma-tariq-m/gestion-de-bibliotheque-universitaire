namespace LibraryApi.DTOs
{
    public class CreateEmpruntDto
    {
        public int EtudiantCEF { get; set; }
        public string LivreTitre { get; set; } = string.Empty;
        public DateTime DateEmprunt { get; set; }
        public DateTime DateRetourPrevue { get; set; }
    }
    public class EmpruntDto
    {
        public int Id_Emprunt { get; set; }
        public string EtudiantNom { get; set; } = string.Empty;
        public string EtudiantCEF { get; set; }= string.Empty;
        public string LivreTitre { get; set; } = string.Empty;
        public DateTime DateEmprunt { get; set; }
        public DateTime DateRetourPrevue { get; set; }
        public DateTime? DateRetourReelle { get; set; }
        public string Statut { get; set; } = string.Empty;
    }
}