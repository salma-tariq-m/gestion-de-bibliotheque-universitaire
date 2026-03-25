using LibraryApi.Models;

namespace LibraryApi.Repositories
{
    public interface IEtudiantRepository
    {
        Task<List<Etudiant>> GetAllAsync();
        Task<Etudiant?> GetByIdAsync(int id);
        Task<Etudiant> AddAsync(Etudiant etudiant);
        Task<Etudiant?> UpdateAsync(int id, Etudiant etudiant);
        Task<bool> DeleteAsync(int id);
    }
}