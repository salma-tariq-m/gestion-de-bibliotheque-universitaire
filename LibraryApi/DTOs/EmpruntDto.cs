namespace LibraryApi.DTOs
{
    public class EmpruntDto
    {
        public int EtudiantId { get; set; }    // ajouté
        public int LivreId { get; set; }       // ajouté
        public string EtudiantNom { get; set; } = string.Empty;

        public string LivreTitre { get; set; } = string.Empty;

        public DateTime DateEmprunt { get; set; }

        public DateTime DateRetourPrevue { get; set; }
    }
}