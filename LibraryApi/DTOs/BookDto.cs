namespace LibraryApi.DTOs
{
    public class BookDto
    {
        public string Titre { get; set; } = string.Empty;
        public string Auteur { get; set; } = string.Empty;
        public int Quantite { get; set; }
        public int Annee { get; set; }
        public int Id_Categorie { get; set; }
        public string NomCategorie { get; set; } = string.Empty;
    }
}