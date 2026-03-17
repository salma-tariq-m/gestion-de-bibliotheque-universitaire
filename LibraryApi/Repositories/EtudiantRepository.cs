using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryApi.Repositories
{
    public class EtudiantRepository
    {
        private readonly LibraryContext _context;

        public EtudiantRepository(LibraryContext context)
        {
            _context = context;
        }

        // GET: tous les étudiants
       public async Task<List<Etudiant>> GetAllAsync()
        {
            return await _context.Etudiants.ToListAsync();
        }
        // GET: étudiant par Id
        public async Task<Etudiant?> GetByIdAsync(int id)
        {
            return await _context.Etudiants
                .Include(e => e.Emprunts) // inclure emprunts
                .FirstOrDefaultAsync(e => e.Id_etudiant == id);
        }

        // POST: ajouter un étudiant
        public async Task<Etudiant> AddAsync(Etudiant etudiant)
        {
            await _context.Etudiants.AddAsync(etudiant);
            await _context.SaveChangesAsync();
            return etudiant;
        }

        // PUT: mettre à jour un étudiant
        public async Task<Etudiant> UpdateAsync(Etudiant etudiant)
        {
            _context.Etudiants.Update(etudiant);
            await _context.SaveChangesAsync();
            return etudiant;
        }

        // DELETE: supprimer un étudiant
        public async Task<bool> DeleteAsync(int id)
        {
            var etudiant = await _context.Etudiants
                .Include(e => e.Emprunts)
                .FirstOrDefaultAsync(e => e.Id_etudiant == id);

            if (etudiant == null)
                return false;

            // vérifier s'il a des emprunts actifs
            if (etudiant.Emprunts != null && etudiant.Emprunts.Any(e => e.DateRetourReelle == null))
                throw new InvalidOperationException("Impossible de supprimer un étudiant ayant des emprunts actifs.");

            _context.Etudiants.Remove(etudiant);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}