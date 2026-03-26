using LibraryApi.Data;
using LibraryApi.DTOs;
using LibraryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/emprunt")]
public class EmpruntController : ControllerBase
{
    private readonly LibraryContext _context;

    public EmpruntController(LibraryContext context)
    {
        _context = context;
    }

    //  GET ALL
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var emprunts = await _context.Emprunts
            .Include(e => e.Etudiant)
            .Include(e => e.Livre)
            .Select(e => new EmpruntDto
            {
                Id_Emprunt = e.Id_Emprunt,
                EtudiantCef = e.Etudiant.Cef,
                EtudiantNom = e.Etudiant.Nom,
                LivreTitre = e.Livre.Titre,
                DateEmprunt = e.Date_Emprunt,
                DateRetourPrevue = e.DateRetourPrevue,
                DateRetourReelle = e.DateRetourReelle
            })
            .ToListAsync();

        return Ok(emprunts);
    }

//  CREATE
    [HttpPost]
public async Task<IActionResult> Create(EmpruntDto dto)
{
    var etudiant = await _context.Etudiants
        .Where(e => e.Cef.Trim() == dto.EtudiantCef.Trim())
        .FirstOrDefaultAsync();
    if (etudiant == null)
        return BadRequest(new { message = "Étudiant introuvable" });

    var livre = await _context.Books
        .Where(l => l.Titre.Trim() == dto.LivreTitre.Trim())
        .FirstOrDefaultAsync(); 

    if (livre == null)
        return BadRequest(new { message = "Livre introuvable" });

    if (dto.DateRetourPrevue <= dto.DateEmprunt)
        return BadRequest(new { message = "Date retour invalide" });

    var emprunt = new Emprunt
    {
        Id_etudiant = etudiant.Id_etudiant,
        Id_Livre = livre.Id_Livre,
        Date_Emprunt = dto.DateEmprunt,
        DateRetourPrevue = dto.DateRetourPrevue
    };

    _context.Emprunts.Add(emprunt);
    await _context.SaveChangesAsync();

    var resultDto = new
    {
        Id_Emprunt = emprunt.Id_Emprunt,
        EtudiantNom = etudiant.Nom,
        LivreTitre = livre.Titre,
        Date_Emprunt = emprunt.Date_Emprunt,
        DateRetourPrevue = emprunt.DateRetourPrevue,
        DateRetourReelle = emprunt.DateRetourReelle
    };

    return Ok(resultDto);
}

}