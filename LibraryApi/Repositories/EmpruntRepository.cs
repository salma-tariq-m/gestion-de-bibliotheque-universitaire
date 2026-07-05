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

        // Récupérer tous les emprunts
        public async Task<List<Emprunt>> GetAllAsync()
        {
            return await _context.Emprunts
                .Include(e => e.Livre)
                .ToListAsync();
        }

        // Récupérer un emprunt par ID
        public async Task<Emprunt?> GetByIdAsync(int id)
        {
            return await _context.Emprunts
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == id);
        }

        // Ajouter un emprunt
        public async Task<Emprunt> AddAsync(Emprunt emprunt)
        {
            _context.Emprunts.Add(emprunt);
            await _context.SaveChangesAsync();
            return emprunt;
        }

        // Modifier un emprunt
        public async Task UpdateAsync(Emprunt emprunt)
        {
            _context.Emprunts.Update(emprunt);
            await _context.SaveChangesAsync();
        }

        // Supprimer un emprunt
        public async Task DeleteAsync(Emprunt emprunt)
        {
            _context.Emprunts.Remove(emprunt);
            await _context.SaveChangesAsync();
        }

        // Vérifier si un livre est déjà emprunté
        public async Task<bool> LivreEstEmprunteAsync(int idLivre)
        {
            return await _context.Emprunts.AnyAsync(e =>
                e.Id_Livre == idLivre &&
                e.Statut == "En Cours");
        }

        // Récupérer tous les retards
        public async Task<List<Emprunt>> GetRetardsAsync()
        {
            return await _context.Emprunts
                .Include(e => e.Livre)
                .Where(e =>
                    e.DateRetourReelle != null &&
                    e.DateRetourReelle > e.DateRetourPrevue)
                .ToListAsync();
        }
    }
}