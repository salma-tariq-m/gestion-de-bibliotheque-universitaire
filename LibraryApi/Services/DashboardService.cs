public interface IDashboardService
{
    Task<DashboardDto> GetDashboardStats();
}

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _repo;
    public DashboardService(IDashboardRepository repo) => _repo = repo;

    public async Task<DashboardDto> GetDashboardStats()
    {
        var total = await _repo.GetTotalBooksCount();
        var borrowed = await _repo.GetBorrowedBooksCount();
        
        return new DashboardDto {
            TotalBooks = total,
            BorrowedBooks = borrowed,
            PendingRequests = await _repo.GetPendingRequestsCount(),
            AvailableBooks = total - borrowed, // Logique métier ici
            MonthlyBorrows = await _repo.GetMonthlyBorrows(6)
        };
    }
}