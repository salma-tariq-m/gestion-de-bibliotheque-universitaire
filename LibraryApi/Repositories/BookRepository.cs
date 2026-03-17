using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task UpdateAsync(Livre book)
        {
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
        }

      
        public async Task DeleteAsync(Livre book)
        {
            Console.WriteLine($"bookrepository : {book}");
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
        }
    }
}