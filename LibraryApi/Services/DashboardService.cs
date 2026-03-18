using LibraryApi.DTOs;
using LibraryApi.Models; 
using LibraryApi.Data;
namespace LibraryApi.Services
{
    public class DashboardService
    {
        private readonly LibraryContext _context;

        public DashboardService(LibraryContext context)
        {
            _context = context;
        }

        public DashboardDto GetDashboardData()
        {
            var totalBooks = _context.Books.Count();
            var borrowedBooks = _context.Books.Count(b => b.IsBorrowed);
            var pendingRequests = _context.Requests.Count(r => r.Status == "Pending");
            var availableBooks = totalBooks - borrowedBooks;

            var monthlyBorrows = _context.Borrows
            .GroupBy(b => b.DateBorrowed.ToDateTime(TimeOnly.MinValue).Month) // <- conversion DateOnly -> DateTime
            .Select(g => new MonthlyBorrow
            {
                Month = new DateTime(2026, g.Key, 1).ToString("MMM"),
                Count = g.Count()
            })
            .ToList();
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
}