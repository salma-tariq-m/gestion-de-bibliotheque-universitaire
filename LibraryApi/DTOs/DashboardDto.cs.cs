namespace LibraryApi.DTOs
{
    public class DashboardDto
    {
        public int TotalBooks { get; set; }
        public int BorrowedBooks { get; set; }
        public int PendingRequests { get; set; }
        public int AvailableBooks { get; set; }
        public List<MonthlyBorrow> MonthlyBorrows { get; set; } = new List<MonthlyBorrow>();
    }

    public class MonthlyBorrow
    {
        public string Month { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}