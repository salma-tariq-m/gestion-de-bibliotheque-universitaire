using LibraryApi.Data;
using LibraryApi.DTOs;
using LibraryApi.Models;
using LibraryApi.Repositories;
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
            EtudiantNom = $"{e.Etudiant.Prenom} {e.Etudiant.Nom}",
            EtudiantCef = e.Etudiant.Cef.ToString(),
            LivreTitre = e.Livre.Titre,
            DateEmprunt = e.Date_Emprunt,
            DateRetourPrevue = e.DateRetourPrevue,
            DateRetourReelle = e.DateRetourReelle,
            Statut = e.DateRetourReelle == null ? "En cours" : "Terminé"
        }).ToList();
    }
    public async Task<EmpruntDto?> CreateEmpruntAsync(CreateEmpruntDto dto)
    {
        var etudiant = await _context.Etudiants
            .FirstOrDefaultAsync(e => e.Cef.Trim() == dto.EtudiantCEF.Trim());

        var livre = await _context.Books
            .FirstOrDefaultAsync(l => l.Titre.ToLower().Trim() == dto.LivreTitre.ToLower().Trim());

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
        await _context.SaveChangesAsync();

        // Retourner le DTO
        var result = new EmpruntDto
        {
            Id_Emprunt = emprunt.Id_Emprunt,
            EtudiantNom = $"{etudiant.Prenom} {etudiant.Nom}",
            EtudiantCef = etudiant.Cef.ToString(),
            LivreTitre = livre.Titre,
            DateEmprunt = emprunt.Date_Emprunt,
            DateRetourPrevue = emprunt.DateRetourPrevue,
            DateRetourReelle = emprunt.DateRetourReelle,
            Statut = "En cours"
        };

        return result;
    }
}