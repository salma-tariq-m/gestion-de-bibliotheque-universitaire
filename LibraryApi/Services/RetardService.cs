using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.Models;
using LibraryApi.DTOs;
namespace LibraryApi.Services
{
    public class RetardService
    {
        private readonly RetardRepository _repo;

        public RetardService(RetardRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<RetardDto>> GetRetards()
        {
            return await _repo.GetRetards();
        }
    }
}