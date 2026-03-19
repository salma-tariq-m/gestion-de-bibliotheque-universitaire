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

        public async Task<List<Emprunt>> GetAllWithIncludes()
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .ToListAsync();
        }
        public async Task<List<Emprunt>> GetAllAsync()
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .ToListAsync();
        }

        public async Task<Emprunt?> GetByIdAsync(int id)
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == id);
        }

        public async Task<Emprunt> AddAsync(Emprunt emprunt)
        {
            await _context.Emprunts.AddAsync(emprunt);
            await _context.SaveChangesAsync();
            return emprunt;
        }

        public async Task<Emprunt> UpdateAsync(Emprunt emprunt)
        {
            _context.Emprunts.Update(emprunt);
            await _context.SaveChangesAsync();
            return emprunt;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var emprunt = await _context.Emprunts.FindAsync(id);
            if (emprunt == null) return false;

            _context.Emprunts.Remove(emprunt);
            await _context.SaveChangesAsync();
            return true;
        }
        
        public async Task<Etudiant?> GetEtudiantByCEF(int cef)
        {
            return await _context.Etudiants
                .FirstOrDefaultAsync(e => e.CEF == cef);
        }

        public async Task<Livre?> GetLivreByTitre(string titre)
        {
            return await _context.Books
                .FirstOrDefaultAsync(l => l.Titre == titre);
        }

        public async Task<bool> IsLivreDejaEmprunte(int livreId)
        {
            return await _context.Emprunts
                .AnyAsync(e => e.Id_Livre == livreId && e.DateRetourReelle == null);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}