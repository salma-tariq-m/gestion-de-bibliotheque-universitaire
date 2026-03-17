using LibraryApi.DTOs;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
namespace LibraryApi.Services
{
    public class EmpruntService
    {
        private readonly LibraryContext _context;

        public EmpruntService(LibraryContext context)
        {
            _context = context;
        }

        // GET: tous les emprunts avec nom étudiant et titre livre
        public async Task<List<EmpruntDto>> GetAllEmprunts()
        {
            var emprunts = await _context.Emprunts
                .Include(e => e.Etudiant)
                .Include(e => e.Livre)
                .Select(e => new EmpruntDto
                {
                    DateEmprunt = e.Date_Emprunt,
                    DateRetourPrevue = e.DateRetourPrevue,
                    EtudiantNom = e.Etudiant.Nom,
                    LivreTitre = e.Livre.Titre
                })
                .ToListAsync();

            return emprunts;
        }

        // POST: ajouter un nouvel emprunt
        public async Task<Emprunt> CreateEmprunt(EmpruntDto dto)
        {
            // Vérifier disponibilité du livre
            var livre = await _context.Books.FindAsync(dto.LivreId);
            if (livre == null || livre.Quantite <= 0)
                throw new InvalidOperationException("Livre non disponible.");

            var emprunt = new Emprunt
            {
                Id_Etudiant = dto.EtudiantId,
                Id_Livre = dto.LivreId,
                Date_Emprunt = dto.DateEmprunt,
                DateRetourPrevue = dto.DateRetourPrevue
            };

            _context.Emprunts.Add(emprunt);
            livre.Quantite--; // réduire quantité
            await _context.SaveChangesAsync();

            return emprunt;
        }

        // DELETE: supprimer / retourner un emprunt
        public async Task<bool> DeleteEmprunt(int id)
        {
            var emprunt = await _context.Emprunts
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == id);

            if (emprunt == null)
                return false;

            // remettre le livre en stock
            emprunt.Livre.Quantite++;

            _context.Emprunts.Remove(emprunt);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}