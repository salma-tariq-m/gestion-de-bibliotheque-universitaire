namespace LibraryApi.DTOs
{
    public class RetardDto
    {
        public int Id_Emprunt { get; set; }

        public string EtudiantCEF { get; set; } = string.Empty;

        public string LivreTitre { get; set; } = string.Empty;

        public DateTime DateEmprunt { get; set; }

        public DateTime DateRetourPrevue { get; set; }

        public DateTime DateRetourReelle { get; set; }

        public int NombreJoursRetard { get; set; }
    }
}