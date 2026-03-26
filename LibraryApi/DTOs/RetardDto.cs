namespace LibraryApi.DTOs
{
    public class RetardDto
    {
        public int Id_Emprunt { get; set; }
        public string EtudiantNom { get; set; } = string.Empty;
        public string EtudiantCef { get; set; } = string.Empty;
        public string LivreTitre { get; set; } = string.Empty;
        public DateTime DateRetourPrevue { get; set; }
        public int JoursRetard { get; set; }
    }
}