using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;
using LibraryApi.DTOs;
public class DashboardRepository
{
    private readonly LibraryContext _context;

    public DashboardRepository(LibraryContext context)
    {
        _context = context;
    }

    public async Task<int> GetTotalBooks()
    {
        return await _context.Books.CountAsync();
    }

    // ✅ Emprunts en cours (مازال ما ترجعوش)
    public async Task<int> GetBorrowedBooks()
    {
        return await _context.Emprunts
            .Where(e => e.DateRetourReelle == null)
            .CountAsync();
    }

    // ✅ demandes en attente (حسب statut)
    public async Task<int> GetPendingRequests()
    {
        return await _context.Emprunts
            .Where(e => e.Statut == "En attente")
            .CountAsync();
    }

    // ✅ stats par mois
    public async Task<List<MonthlyBorrowDto>> GetMonthlyBorrows()
    {
        return await _context.Emprunts
            .GroupBy(e => e.Date_Emprunt.Month)
            .Select(g => new MonthlyBorrowDto
            {
                Month = g.Key.ToString(),
                Count = g.Count()
            })
            .ToListAsync();
    }
}