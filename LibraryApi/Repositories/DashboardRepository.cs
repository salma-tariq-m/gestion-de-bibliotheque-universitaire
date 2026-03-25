// using Microsoft.EntityFrameworkCore; // Nécessaire pour CountAsync et ToListAsync
// using LibraryApi.Data; // Remplacez par le namespace réel de votre LibraryContext
// using LibraryApi.Models; // Remplacez par le namespace de vos DTOs et Modèles

// namespace LibraryApi.Repositories
// {
//     // 1. On renomme l'interface avec un "I"
//     public interface IDashboardRepository
//     {
//         Task<int> GetTotalBooksCount();
//         Task<int> GetBorrowedBooksCount();
//         Task<int> GetPendingRequestsCount();
//         Task<List<MonthlyBorrowDto>> GetMonthlyBorrows(int months);
//     }

//     // 2. La classe implémente l'interface IDashboardRepository
//     public class DashboardRepository : IDashboardRepository
//     {
//         private readonly LibraryContext _context;

//         public DashboardRepository(LibraryContext context)
//         {
//             _context = context;
//         }

//         public async Task<int> GetTotalBooksCount() => await _context.Books.CountAsync();


//         public async Task<List<MonthlyBorrowDto>> GetMonthlyBorrows(int months)
//         {
//             return await _context.Emprunts
//                 .Where(e => e.DateEmprunt >= DateTime.Now.AddMonths(-months))
//                 .GroupBy(e => new { e.DateEmprunt.Year, e.DateEmprunt.Month })
//                 .Select(g => new MonthlyBorrowDto {
//                     Month = $"{g.Key.Month}/{g.Key.Year}",
//                     Count = g.Count()
//                 }).ToListAsync();
//         }
//     }
// }