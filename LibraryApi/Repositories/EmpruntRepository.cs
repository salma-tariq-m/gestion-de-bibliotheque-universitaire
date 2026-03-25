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

        // Ajouter un nouvel emprunt
        public async Task<Emprunt> AddAsync(Emprunt emprunt)
        {
            _context.Emprunts.Add(emprunt);
            await _context.SaveChangesAsync();
            return emprunt;
        }

        // Récupérer un emprunt par Id
        public async Task<Emprunt?> GetByIdAsync(int id)
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == id);
        }

        // Récupérer tous les emprunts
        public async Task<List<Emprunt>> GetAllAsync()
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .ToListAsync();
        }

        // Vérifier si un livre est déjà emprunté et non encore retourné
        public async Task<bool> IsLivreEmprunteAsync(int livreId)
        {
            return await _context.Emprunts
                .AnyAsync(e => e.Id_Livre == livreId && e.DateRetourReelle == null);
        }

        // Mettre à jour un emprunt (ex: retour)
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
    }
}