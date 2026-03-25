using LibraryContext;
public interface DashboardRepository
{
    Task<int> GetTotalBooksCount();
    Task<int> GetBorrowedBooksCount();
    Task<int> GetPendingRequestsCount();
    Task<List<MonthlyBorrowDto>> GetMonthlyBorrows(int months);
}

public class DashboardRepository : DashboardRepository
{
    private readonly LibraryContext _context;
    public DashboardRepository(LibraryContext context) => _context = context;

    public async Task<int> GetTotalBooksCount() => await _context.Livres.CountAsync();
    
    public async Task<int> GetBorrowedBooksCount() => 
        await _context.Emprunts.CountAsync(e => e.Statut == "EnCours");

    public async Task<int> GetPendingRequestsCount() => 
        await _context.Demandes.CountAsync(d => d.Statut == "EnAttente");

    public async Task<List<MonthlyBorrowDto>> GetMonthlyBorrows(int months)
    {
        return await _context.Emprunts
            .Where(e => e.DateEmprunt >= DateTime.Now.AddMonths(-months))
            .GroupBy(e => new { e.DateEmprunt.Year, e.DateEmprunt.Month })
            .Select(g => new MonthlyBorrowDto {
                Month = $"{g.Key.Month}/{g.Key.Year}",
                Count = g.Count()
            }).ToListAsync();
    }
}