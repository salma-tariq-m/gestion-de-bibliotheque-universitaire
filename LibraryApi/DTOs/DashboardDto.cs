public class DashboardDto
{
    public int TotalBooks { get; set; }
    public int BorrowedBooks { get; set; }
    public int PendingRequests { get; set; }
    public int AvailableBooks { get; set; }

    public List<MonthlyBorrowDto> MonthlyBorrows { get; set; } = new();
}

public class MonthlyBorrowDto
{
    public string Month { get; set; } = string.Empty;
    public int Count { get; set; }
}