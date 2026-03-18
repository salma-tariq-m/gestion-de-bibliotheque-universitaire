using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Repositories
{
    public class CategorieRepository
    {
        private readonly LibraryContext _context;

        public CategorieRepository(LibraryContext context)
        {
            _context = context;
        }

        // Récupérer toutes les catégories
        public async Task<List<Categorie>> GetAllAsync()
        {
            return await _context.Categorie.ToListAsync(); // <== correspond au DbSet
        }
    }
}