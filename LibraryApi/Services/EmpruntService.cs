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

    public async Task<EmpruntDto?> CreateEmpruntAsync(CreateEmpruntDto dto)
    {
        var etudiant = await _context.Etudiants.FirstOrDefaultAsync(e => e.Cef== dto.EtudiantCEF);
        if (etudiant == null) return null; 

        var livre = await _context.Books.FirstOrDefaultAsync(l => l.Titre == dto.LivreTitre);
        if (livre == null) return null; 

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