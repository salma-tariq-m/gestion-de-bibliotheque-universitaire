using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Repositories
{
    public class EmpruntRepository
    {
        private readonly LibraryContext _context;

        public EmpruntRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task<List<Emprunt>> GetAllAsync()
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .ToListAsync();
        }

        public async Task<Emprunt> AddAsync(Emprunt emprunt)
        {
            _context.Emprunts.Add(emprunt);
            await _context.SaveChangesAsync();
            return emprunt;
        }

        public async Task<Emprunt?> GetByIdAsync(int id)
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == id);
        }

        public async Task UpdateAsync(Emprunt emprunt)
        {
            _context.Emprunts.Update(emprunt);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Emprunt emprunt)
        {
            _context.Emprunts.Remove(emprunt);
            await _context.SaveChangesAsync();
        }
    }
}