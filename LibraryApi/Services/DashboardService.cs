// using LibraryApi.Repositories; // Pour trouver IDashboardRepository
// using LibraryApi.Models;       // Pour trouver DashboardDto

// namespace LibraryApi.Services
// {
//     public interface IDashboardService
//     {
//         Task<DashboardDto> GetDashboardStats();
//     }

//     public class DashboardService : IDashboardService
//     {
//         private readonly IDashboardRepository _repo;

//         // L'injection de dépendance utilise maintenant le bon nom d'interface
//         public DashboardService(IDashboardRepository repo) => _repo = repo;

//         public async Task<DashboardDto> GetDashboardStats()
//         {
//             var total = await _repo.GetTotalBooksCount();
//             var borrowed = await _repo.GetBorrowedBooksCount();
            
//             return new DashboardDto {
//                 TotalBooks = total,
//                 BorrowedBooks = borrowed,
//                 PendingRequests = await _repo.GetPendingRequestsCount(),
//                 AvailableBooks = total - borrowed, // Calcul logique métier
//                 MonthlyBorrows = await _repo.GetMonthlyBorrows(6)
//             };
//         }
//     }
// }