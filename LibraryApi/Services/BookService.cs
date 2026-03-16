using LibraryApi.DTOs;
using LibraryApi.Models;
using LibraryApi.Repositories;

namespace LibraryApi.Services
{
    public class BookService
    {
        private readonly BookRepository _repository;

        public BookService(BookRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Book>> GetAllBooks() => await _repository.GetAllAsync();

        public async Task CreateBook(BookDto dto)
        {
            // Logique métier : par exemple, vérifier que la quantité n'est pas négative
            if (dto.Quantite < 0) throw new Exception("La quantité ne peut pas être négative");

            var book = new Book
            {
                Titre = dto.Titre,
                Auteur = dto.Auteur,
                Quantite = dto.Quantite,
                Annee = dto.Annee,
            };
            await _repository.AddAsync(book);
        }
        public async Task<bool> DeleteBook(int id_livre)
        { 
            Console.WriteLine($"bookservice : {id_livre}");
            var book = await _repository.GetByIdAsync(id_livre); 
            if (book == null) return false;

            await _repository.DeleteAsync(book); 
            return true;
        }
        
    }
    
}
