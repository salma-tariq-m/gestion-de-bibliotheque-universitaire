namespace LibraryApi.DTOs
{
    public class EtudiantDto
    {
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string Cef { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Id_Fillier { get; set; }
        public string NomFillier { get; set; } = string.Empty;
    }
}