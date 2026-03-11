namespace LibraryApi.Models
{
    public class Book
    {
        public int Id { get; set; }       // Identifiant unique
        public string Title { get; set; } = null!;  // Titre du livre
        public string Author { get; set; } = null!; // Auteur
        public int Year { get; set; }       // Année
    }
}