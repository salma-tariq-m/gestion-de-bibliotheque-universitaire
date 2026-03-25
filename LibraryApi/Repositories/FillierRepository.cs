using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Repositories
{
    public class FillierRepository
    {
        private readonly LibraryContext _context;

        public FillierRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task<List<Fillier>> GetAllAsync()
        {
            return await _context.Filliers.ToListAsync(); // Assurez-vous que DbSet s'appelle Filliers
        }
    }
}