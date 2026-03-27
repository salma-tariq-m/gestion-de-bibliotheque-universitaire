using LibraryApi.Data;
using LibraryApi.DTOs;
using Microsoft.EntityFrameworkCore;

public class DashboardRepository
{
    private readonly LibraryContext _context;

    public DashboardRepository(LibraryContext context)
    {
        _context = context;
    }

    // 📚 Total books (عدد العناوين)
    public async Task<int> GetTotalBooks()
    {
        return await _context.Books.CountAsync();
    }

    // 🔄 Emprunts en cours
    public async Task<int> GetBorrowedBooks()
    {
        return await _context.Emprunts
            .Where(e => e.DateRetourReelle == null)
            .CountAsync();
    }

    // ⏳ En attente
    public async Task<int> GetPendingRequests()
    {
        return await _context.Emprunts
            .Where(e => e.Statut == "En attente")
            .CountAsync();
    }

    // 📦 Stock total (Quantite)
    public async Task<int> GetAvailableBooks()
    {
        return await _context.Books
            .SumAsync(l => l.Quantite);
    }

    // 📊 Stat par mois
    public async Task<List<MonthlyBorrowDto>> GetMonthlyBorrows()
    {
        return await _context.Emprunts
            .GroupBy(e => e.Date_Emprunt.Month)
            .Select(g => new MonthlyBorrowDto
            {
                Month = System.Globalization.CultureInfo
                    .CurrentCulture.DateTimeFormat
                    .GetAbbreviatedMonthName(g.Key),
                Count = g.Count()
            })
            .ToListAsync();
    }
}