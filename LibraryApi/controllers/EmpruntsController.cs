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

    // GET ALL
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
                EtudiantPrenom = e.Etudiant.Prenom,
                LivreTitre = e.Livre.Titre,
                DateEmprunt = e.Date_Emprunt,
                DateRetourPrevue = e.DateRetourPrevue,
                DateRetourReelle = e.DateRetourReelle,
                Statut = string.IsNullOrEmpty(e.Statut) ? "En attente" : e.Statut
            })
            .ToListAsync();

        return Ok(emprunts);
    }

    // CREATE
    [HttpPost]
    public async Task<IActionResult> Create(EmpruntDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.EtudiantCef))
            return BadRequest(new { message = "CEF obligatoire" });

        if (string.IsNullOrWhiteSpace(dto.LivreTitre))
            return BadRequest(new { message = "Titre livre obligatoire" });

        var etudiant = await _context.Etudiants
            .FirstOrDefaultAsync(e => e.Cef.Trim().ToLower() == dto.EtudiantCef.Trim().ToLower());

        if (etudiant == null)
            return BadRequest(new { message = "Étudiant introuvable" });

        var livre = await _context.Books
            .FirstOrDefaultAsync(l => l.Titre.Trim().ToLower() == dto.LivreTitre.Trim().ToLower());

        if (livre == null)
            return BadRequest(new { message = "Livre introuvable" });

        if (livre.Quantite <= 0)
            return BadRequest(new { message = "Quantite insuffisant" });

        var emprunt = new Emprunt
        {
            Id_etudiant = etudiant.Id_etudiant,
            Id_Livre = livre.Id_Livre,
            Date_Emprunt = dto.DateEmprunt,
            DateRetourPrevue = dto.DateRetourPrevue,
            Statut = "En attente"
        };

        _context.Emprunts.Add(emprunt);
        livre.Quantite -= 1; // Décrémenter le Quantite
        await _context.SaveChangesAsync();

        return Ok(new EmpruntDto
        {
            Id_Emprunt = emprunt.Id_Emprunt,
            EtudiantCef = etudiant.Cef,
            EtudiantNom = etudiant.Nom,
            EtudiantPrenom = etudiant.Prenom,
            LivreTitre = livre.Titre,
            DateEmprunt = emprunt.Date_Emprunt,
            DateRetourPrevue = emprunt.DateRetourPrevue,
            DateRetourReelle = emprunt.DateRetourReelle,
            Statut = emprunt.Statut
        });
    }

    // VALIDER
    [HttpPut("valider/{id}")]
    public async Task<IActionResult> Valider(int id)
    {
        var emprunt = await _context.Emprunts
            .Include(e => e.Livre)
            .FirstOrDefaultAsync(e => e.Id_Emprunt == id);

        if (emprunt == null)
            return NotFound(new { message = "Emprunt introuvable" });

        if (emprunt.Statut == "Emprunté")
            return BadRequest(new { message = "Emprunt déjà validé" });

        emprunt.Statut = "Emprunté";
        await _context.SaveChangesAsync();

        return Ok(new { message = "Emprunt validé" });
    }

    // RETOURNER
    [HttpPut("retourner/{id}")]
    public async Task<IActionResult> Retourner(int id)
    {
        var emprunt = await _context.Emprunts
            .Include(e => e.Livre)
            .FirstOrDefaultAsync(e => e.Id_Emprunt == id);

        if (emprunt == null)
            return NotFound(new { message = "Emprunt introuvable" });

        if (emprunt.Statut != "Emprunté")
            return BadRequest(new { message = "Emprunt non validé" });

        emprunt.Statut = "Retourné";
        emprunt.DateRetourReelle = DateTime.Now;
        emprunt.Livre.Quantite += 1; // Remettre le stock

        await _context.SaveChangesAsync();

        return Ok(new { message = "Emprunt retourné" });
    }
}