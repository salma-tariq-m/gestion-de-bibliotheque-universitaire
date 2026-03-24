using LibraryApi.Models;
using LibraryApi.Repositories;

namespace LibraryApi.Services
{
    public class FillierService
    {
        private readonly FillierRepository _repository;

        public FillierService(FillierRepository repository)
        {
            _repository = repository;
        }

        // Récupérer toutes les fillières
        public async Task<List<Fillier>> GetAllFilliersAsync()
        {
            return await _repository.GetAllAsync();
        }
    }
}