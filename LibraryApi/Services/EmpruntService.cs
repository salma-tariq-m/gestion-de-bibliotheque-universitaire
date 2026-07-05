using LibraryApi.Data;
using LibraryApi.DTOs;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Services
{
    public class EmpruntService
    {
        private readonly LibraryContext _context;

        public EmpruntService(LibraryContext context)
        {
            _context = context;
        }

        // ============================
        // Liste des emprunts
        // ============================
        public async Task<List<EmpruntDto>> GetAllEmpruntsAsync()
        {
            var emprunts = await _context.Emprunts
                .Include(e => e.Livre)
                .ToListAsync();

            return emprunts.Select(e => new EmpruntDto
            {
                Id_Emprunt = e.Id_Emprunt,
                EtudiantCEF = e.EtudiantCEF,
                LivreTitre = e.Livre.Titre,
                DateEmprunt = e.Date_Emprunt,
                DateRetourPrevue = e.DateRetourPrevue,
                DateRetourReelle = e.DateRetourReelle,
                EtatAvantEmprunt = e.EtatAvantEmprunt,
                EtatAuRetour = e.EtatAuRetour,
                Observation = e.Observation,
                Statut = e.Statut
            }).ToList();
        }

        // ============================
        // Créer un emprunt
        // ============================
        public async Task<EmpruntDto> CreateEmpruntAsync(CreateEmpruntDto dto)
        {
            var livre = await _context.Books
                .FirstOrDefaultAsync(l =>
                    l.Titre.ToLower().Trim() ==
                    dto.LivreTitre.ToLower().Trim());

            if (livre == null)
                throw new Exception("Livre introuvable.");

            if (livre.Quantite <= 0)
                throw new Exception("Livre non disponible.");

            var emprunt = new Emprunt
            {
                EtudiantCEF = dto.EtudiantCEF,
                Id_Livre = livre.Id_Livre,
                Date_Emprunt = DateTime.Now,
                DateRetourPrevue = dto.DateRetourPrevue,
                EtatAvantEmprunt = dto.EtatAvantEmprunt,
                Observation = dto.Observation,
                Statut = "En Cours"
            };

            livre.Quantite--;

            _context.Emprunts.Add(emprunt);

            await _context.SaveChangesAsync();

            return new EmpruntDto
            {
                Id_Emprunt = emprunt.Id_Emprunt,
                EtudiantCEF = emprunt.EtudiantCEF,
                LivreTitre = livre.Titre,
                DateEmprunt = emprunt.Date_Emprunt,
                DateRetourPrevue = emprunt.DateRetourPrevue,
                DateRetourReelle = emprunt.DateRetourReelle,
                EtatAvantEmprunt = emprunt.EtatAvantEmprunt,
                EtatAuRetour = emprunt.EtatAuRetour,
                Observation = emprunt.Observation,
                Statut = emprunt.Statut
            };
        }

        // ============================
        // Retourner un livre
        // ============================
        public async Task<EmpruntDto> RetournerEmpruntAsync(
            int empruntId,
            string etatRetour)
        {
            var emprunt = await _context.Emprunts
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == empruntId);

            if (emprunt == null)
                throw new Exception("Emprunt introuvable.");

            if (emprunt.Statut != "En Cours")
                throw new Exception("Cet emprunt est déjà clôturé.");

            emprunt.DateRetourReelle = DateTime.Now;
            emprunt.EtatAuRetour = etatRetour;
            emprunt.Statut = "Terminé";

            emprunt.Livre.Quantite++;

            await _context.SaveChangesAsync();

            return new EmpruntDto
            {
                Id_Emprunt = emprunt.Id_Emprunt,
                EtudiantCEF = emprunt.EtudiantCEF,
                LivreTitre = emprunt.Livre.Titre,
                DateEmprunt = emprunt.Date_Emprunt,
                DateRetourPrevue = emprunt.DateRetourPrevue,
                DateRetourReelle = emprunt.DateRetourReelle,
                EtatAvantEmprunt = emprunt.EtatAvantEmprunt,
                EtatAuRetour = emprunt.EtatAuRetour,
                Observation = emprunt.Observation,
                Statut = emprunt.Statut
            };
        }

        // ============================
        // Annuler un emprunt
        // ============================
        public async Task AnnulerEmpruntAsync(int empruntId)
        {
            var emprunt = await _context.Emprunts
                .Include(e => e.Livre)
                .FirstOrDefaultAsync(e => e.Id_Emprunt == empruntId);

            if (emprunt == null)
                throw new Exception("Emprunt introuvable.");

            if (emprunt.Statut != "En Cours")
                throw new Exception("Impossible d'annuler.");

            emprunt.Statut = "Annulé";
            emprunt.Livre.Quantite++;

            await _context.SaveChangesAsync();
        }

        // ============================
        // Liste des retards
        // ============================
        public async Task<List<RetardDto>> GetRetardsAsync()
        {
            var retards = await _context.Emprunts
                .Include(e => e.Livre)
                .Where(e =>
                    e.DateRetourReelle != null &&
                    e.DateRetourReelle > e.DateRetourPrevue)
                .ToListAsync();

            return retards.Select(e => new RetardDto
            {
                Id_Emprunt = e.Id_Emprunt,
                EtudiantCEF = e.EtudiantCEF,
                LivreTitre = e.Livre.Titre,
                DateEmprunt = e.Date_Emprunt,
                DateRetourPrevue = e.DateRetourPrevue,
                DateRetourReelle = e.DateRetourReelle!.Value,
                NombreJoursRetard =
                    (e.DateRetourReelle.Value - e.DateRetourPrevue).Days
            }).ToList();
        }
    }
}