using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.Models;
using LibraryApi.DTOs;
public class DashboardService
{
    private readonly LibraryContext _context;

    public DashboardService(LibraryContext context)
    {
        _context = context;
    }

    public async Task<DashboardDto> GetDashboardData()
    {
        var totalBooks = await _context.Books.CountAsync();

        var borrowedBooks = await _context.Emprunts
            .Where(e => e.DateRetourReelle == null)
            .CountAsync();

        var pendingRequests = await _context.Emprunts
            .Where(e => e.Statut == "En attente")
            .CountAsync();

        var availableBooks = totalBooks - borrowedBooks;

        var monthlyBorrows = await _context.Emprunts
            .GroupBy(e => e.Date_Emprunt.Month)
            .Select(g => new MonthlyBorrowDto
            {
                Month = g.Key.ToString(),
                Count = g.Count()
            })
            .ToListAsync();

        return new DashboardDto
        {
            TotalBooks = totalBooks,
            BorrowedBooks = borrowedBooks,
            PendingRequests = pendingRequests,
            AvailableBooks = availableBooks,
            MonthlyBorrows = monthlyBorrows
        };
    }
}