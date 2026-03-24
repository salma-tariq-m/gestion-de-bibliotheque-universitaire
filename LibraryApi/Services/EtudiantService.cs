using LibraryApi.Data;
using LibraryApi.DTOs;
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

        public async Task<List<Etudiant>> GetAllStudents()
        {
            return await _context.Etudiants.ToListAsync();
        }

        public async Task<Etudiant> CreateStudent(EtudiantDto dto)
        {
            var etudiant = new Etudiant
            {
                Cef=dto.Cef,
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
                .Include(e => e.Emprunts) 
                .FirstOrDefaultAsync(e => e.Id_etudiant == id);

            if (etudiant == null)
                return false;

            if (etudiant.Emprunts != null && etudiant.Emprunts.Any(e => e.DateRetourReelle == null))
                throw new InvalidOperationException("Impossible de supprimer un étudiant ayant des emprunts actifs.");

            _context.Etudiants.Remove(etudiant);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Etudiant?> UpdateStudent(int id, EtudiantDto dto)
        {
            var etudiant = await _context.Etudiants.FindAsync(id);

            if (etudiant == null)
                return null;
            etudiant.Cef = dto.Cef;
            etudiant.Nom = dto.Nom;
            etudiant.Prenom = dto.Prenom;
            etudiant.Email = dto.Email;
            etudiant.Id_Fillier = dto.Id_Fillier;

            await _context.SaveChangesAsync();

            return etudiant;
        }
    }
}