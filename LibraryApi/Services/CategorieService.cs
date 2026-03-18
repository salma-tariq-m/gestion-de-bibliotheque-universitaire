using LibraryApi.Models;
using LibraryApi.Repositories;

namespace LibraryApi.Services
{
    public class CategorieService
    {
        private readonly CategorieRepository _repository;

        public CategorieService(CategorieRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Categorie>> GetAllCategories()
        {
            return await _repository.GetAllAsync();
        }
    }
}