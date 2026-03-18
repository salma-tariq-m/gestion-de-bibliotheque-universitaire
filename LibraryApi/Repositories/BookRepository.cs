using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;
using LibraryApi.DTOs;
namespace LibraryApi.Repositories
{
    public class BookRepository
    {
        private readonly LibraryContext _context;

        public BookRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task<List<Livre>> GetAllAsync() => await _context.Books.ToListAsync();

        public async Task<Livre?> GetByIdAsync(int id) => await _context.Books.FindAsync(id);

        public async Task AddAsync(Livre book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }


      
        public async Task DeleteAsync(Livre book)
        {
            Console.WriteLine($"bookrepository : {book}");
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
        }

        // Mettre à jour un livre
        public async Task UpdateAsync(Livre livre)
        {
            _context.Books.Update(livre);
            await _context.SaveChangesAsync();
        }

         public async Task<List<BookWithCategorieDto>> GetAllWithCategorieDtoAsync()
        {
            return await _context.Books
                .Include(b => b.Categorie)
                .Select(b => new BookWithCategorieDto
                {
                    Id_Livre = b.Id_Livre,
                    Titre = b.Titre,
                    Auteur = b.Auteur,
                    Quantite = b.Quantite,
                    Annee = b.Annee,
                    Id_Categorie = b.Id_Categorie,
                    NomCategorie = b.Categorie.NomCategorie
                })
                .ToListAsync();
        }
    }
}