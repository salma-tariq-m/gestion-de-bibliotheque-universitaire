using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;
using LibraryApi.DTOs;

public class RetardRepository
{
    private readonly LibraryContext _context;

    public RetardRepository(LibraryContext context)
    {
        _context = context;
    }

    public async Task<List<RetardDto>> GetRetards()
{
    var today = DateTime.Now;

    return await _context.Emprunts
        .Include(e => e.Etudiant)
        .Include(e => e.Livre)
        .Where(e => e.DateRetourReelle == null && e.DateRetourPrevue < today)
        .Select(e => new RetardDto
        {
            Id_Emprunt = e.Id_Emprunt,
            EtudiantNom = e.Etudiant.Nom,
            EtudiantCef = e.Etudiant.Cef.ToString(),
            LivreTitre = e.Livre.Titre,
            DateRetourPrevue = e.DateRetourPrevue,
            JoursRetard = (today - e.DateRetourPrevue).Days
        })
        .ToListAsync();
}
}