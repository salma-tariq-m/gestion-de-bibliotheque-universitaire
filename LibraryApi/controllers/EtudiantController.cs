using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/etudiant")]
public class EtudiantController : ControllerBase
{
    private readonly EtudiantService _service;
    private readonly LibraryContext _context;

    public EtudiantController(EtudiantService service, LibraryContext context)
    {
        _service = service;
        _context = context; 
    }


    // GET ALL
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var etudiants = await _context.Etudiants
            .Include(e => e.Fillier) // مهم باش fillier يجي مع etudiant
            .ToListAsync();

        return Ok(etudiants);
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var etudiant = await _service.GetById(id);
        if (etudiant == null) return NotFound();
        return Ok(etudiant);
    }

    // CREATE
    [HttpPost]
    public async Task<IActionResult> Create(Etudiant e)
    {
        await _service.Add(e);
        return Ok(e);
    }

    // UPDATE
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Etudiant e)
    {
        var existing = await _context.Etudiants.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Cef = e.Cef;
        existing.Nom = e.Nom;
        existing.Prenom = e.Prenom;
        existing.Email = e.Email;
        existing.Id_Fillier = e.Id_Fillier;

        await _context.SaveChangesAsync();

        // هاد السطر مهم باش Fillier يجي مرفق
        var updated = await _context.Etudiants
            .Include(et => et.Fillier)
            .FirstOrDefaultAsync(et => et.Id_etudiant == id);

        return Ok(updated);
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.Delete(id);
        return Ok();
    }
}