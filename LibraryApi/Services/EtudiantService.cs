using LibraryApi.Data;
using LibraryApi.DTOs;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Services
{
    public class EtudiantService
    {
        private readonly LibraryContext _context;

        public EtudiantService(LibraryContext context)
        {
            _context = context;
        }

        // GET: Tous les étudiants
        public async Task<List<Etudiant>> GetAllStudents()
        {
            return await _context.Etudiants.ToListAsync();
        }

        // POST: Créer un nouvel étudiant
        public async Task<Etudiant> CreateStudent(EtudiantDto dto)
        {
            var etudiant = new Etudiant
            {
                Nom = dto.Nom,
                Prenom = dto.Prenom,
                Email = dto.Email,
                Id_Fillier = dto.Id_Fillier
            };

            _context.Etudiants.Add(etudiant);
            await _context.SaveChangesAsync();

            return etudiant;
        }

        // DELETE: Supprimer un étudiant par Id
        public async Task<bool> DeleteStudent(int id)
        {
            var etudiant = await _context.Etudiants
                .Include(e => e.Emprunts) // si tu as une relation Emprunt
                .FirstOrDefaultAsync(e => e.Id_etudiant == id);

            if (etudiant == null)
                return false;

            // Vérifier si l’étudiant a des emprunts actifs
            if (etudiant.Emprunts != null && etudiant.Emprunts.Any(e => e.DateRetourReelle == null))
                throw new InvalidOperationException("Impossible de supprimer un étudiant ayant des emprunts actifs.");

            _context.Etudiants.Remove(etudiant);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}