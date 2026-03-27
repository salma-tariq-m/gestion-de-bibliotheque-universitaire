using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.DTOs;

public class DashboardService
{
    private readonly DashboardRepository _repo;

    public DashboardService(DashboardRepository repo)
    {
        _repo = repo;
    }

    public async Task<DashboardDto> GetDashboardData()
    {
        return new DashboardDto
        {
            TotalBooks = await _repo.GetTotalBooks(),
            BorrowedBooks = await _repo.GetBorrowedBooks(),
            PendingRequests = await _repo.GetPendingRequests(),
            AvailableBooks = await _repo.GetAvailableBooks(),
            MonthlyBorrows = await _repo.GetMonthlyBorrows()
        };
    }
}