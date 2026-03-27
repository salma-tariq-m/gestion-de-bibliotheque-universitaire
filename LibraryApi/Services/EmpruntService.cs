using LibraryApi.Data;
using LibraryApi.DTOs;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

public class EmpruntService
{
    private readonly LibraryContext _context;

    public EmpruntService(LibraryContext context)
    {
        _context = context;
    }

    public async Task<List<EmpruntDto>> GetAllEmpruntsAsync()
    {
        var emprunts = await _context.Emprunts
            .Include(e => e.Etudiant)
            .Include(e => e.Livre)
            .ToListAsync();

        return emprunts.Select(e => new EmpruntDto
        {
            Id_Emprunt = e.Id_Emprunt,
            EtudiantNom = e.Etudiant.Nom,
            EtudiantPrenom = e.Etudiant.Prenom,
            EtudiantCef = e.Etudiant.Cef,
            LivreTitre = e.Livre.Titre,
            DateEmprunt = e.Date_Emprunt,
            DateRetourPrevue = e.DateRetourPrevue,
            DateRetourReelle = e.DateRetourReelle,
            Statut = e.DateRetourReelle == null ? "En cours" : "Terminé"
        }).ToList();
    }

    // ✅ Créer un emprunt avec contrôle du stock
    public async Task<EmpruntDto?> CreateEmpruntAsync(CreateEmpruntDto dto)
    {
        var etudiant = await _context.Etudiants
            .FirstOrDefaultAsync(e => e.Cef.Trim() == dto.EtudiantCEF.Trim());

        if (etudiant == null)
            throw new Exception("Étudiant introuvable");

        var livre = await _context.Books
            .FirstOrDefaultAsync(l => l.Titre.ToLower().Trim() == dto.LivreTitre.ToLower().Trim());

        if (livre == null)
            throw new Exception("Livre introuvable");

        if (livre.Quantite <= 0)
            throw new Exception("Stock insuffisant pour ce livre");

        // Créer l'emprunt
        var emprunt = new Emprunt
        {
            Id_etudiant = etudiant.Id_etudiant,
            Id_Livre = livre.Id_Livre,
            Date_Emprunt = dto.DateEmprunt,
            DateRetourPrevue = dto.DateRetourPrevue,
            DateRetourReelle = null
        };

        _context.Emprunts.Add(emprunt);
        livre.Quantite -= 1; 
        await _context.SaveChangesAsync();

        return new EmpruntDto
        {
            Id_Emprunt = emprunt.Id_Emprunt,
            EtudiantNom = etudiant.Nom,
            EtudiantPrenom = etudiant.Prenom,
            EtudiantCef = etudiant.Cef,
            LivreTitre = livre.Titre,
            DateEmprunt = emprunt.Date_Emprunt,
            DateRetourPrevue = emprunt.DateRetourPrevue,
            DateRetourReelle = emprunt.DateRetourReelle,
            Statut = "En cours"
        };
    }
    public async Task<EmpruntDto?> RetournerEmpruntAsync(int empruntId)
    {
        var emprunt = await _context.Emprunts
            .Include(e => e.Livre)
            .Include(e => e.Etudiant)
            .FirstOrDefaultAsync(e => e.Id_Emprunt == empruntId);

        if (emprunt == null)
            throw new Exception("Emprunt introuvable");

        emprunt.DateRetourReelle = DateTime.Now;
        emprunt.Statut = "Terminé";

        emprunt.Livre.Quantite += 1; // Remettre le stock

        await _context.SaveChangesAsync();

        return new EmpruntDto
        {
            Id_Emprunt = emprunt.Id_Emprunt,
            EtudiantNom = emprunt.Etudiant.Nom,
            EtudiantPrenom = emprunt.Etudiant.Prenom,
            EtudiantCef = emprunt.Etudiant.Cef,
            LivreTitre = emprunt.Livre.Titre,
            DateEmprunt = emprunt.Date_Emprunt,
            DateRetourPrevue = emprunt.DateRetourPrevue,
            DateRetourReelle = emprunt.DateRetourReelle,
            Statut = emprunt.Statut
        };
    }
}