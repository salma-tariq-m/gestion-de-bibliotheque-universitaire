using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;

public class EtudiantRepository
{
    private readonly LibraryContext _context;

    public EtudiantRepository(LibraryContext context)
    {
        _context = context;
    }

    public async Task<List<Etudiant>> GetAll()
    {
        return await _context.Etudiants
            .Include(e => e.Fillier)
            .ToListAsync();
    }

    public async Task<Etudiant?> GetById(int id)
    {
        return await _context.Etudiants.FindAsync(id);
    }

    public async Task Add(Etudiant etudiant)
    {
        await _context.Etudiants.AddAsync(etudiant);
        await _context.SaveChangesAsync();

    }

    public async Task Update(Etudiant etudiant)
    {
        _context.Etudiants.Update(etudiant);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var etudiant = await _context.Etudiants.FindAsync(id);
        if (etudiant != null)
        {
            _context.Etudiants.Remove(etudiant);
            await _context.SaveChangesAsync();
        }
    }
}