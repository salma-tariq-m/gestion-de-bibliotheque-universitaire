using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryApi.Repositories
{
    public class EmpruntRepository
    {
        private readonly LibraryContext _context;

        public EmpruntRepository(LibraryContext context)
        {
            _context = context;
        }

        // GET: tous les emprunts avec info étudiant et livre
        public async Task<List<Emprunt>> GetAllAsync()
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .ToListAsync();
        }

        // GET: emprunt par Id
        public async Task<Emprunt?> GetByIdAsync(int id)
        {
            return await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == id);
        }

        // POST: ajouter un emprunt
        public async Task<Emprunt> AddAsync(Emprunt emprunt)
        {
            // vérifier livre disponible
            var livre = await _context.Books.FindAsync(emprunt.Id_Livre);
            if (livre == null || livre.Quantite <= 0)
                throw new InvalidOperationException("Livre non disponible.");

            await _context.Emprunts.AddAsync(emprunt);

            // réduire la quantité du livre
            livre.Quantite--;

            await _context.SaveChangesAsync();
            return emprunt;
        }

        // PUT: mettre à jour un emprunt
        public async Task<Emprunt> UpdateAsync(Emprunt emprunt)
        {
            _context.Emprunts.Update(emprunt);
            await _context.SaveChangesAsync();
            return emprunt;
        }

        // DELETE: supprimer un emprunt
        public async Task<bool> DeleteAsync(int id)
        {
            var emprunt = await _context.Emprunts
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == id);

            if (emprunt == null)
                return false;

            // remettre le livre en stock
            if (emprunt.Livre != null)
                emprunt.Livre.Quantite++;

            _context.Emprunts.Remove(emprunt);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}