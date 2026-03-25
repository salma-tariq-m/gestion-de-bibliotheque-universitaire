using LibraryApi.Models;
using LibraryApi.DTOs; // On importe les DTOs

namespace LibraryApi.Services
{
    public interface IEtudiantService
    {
        Task<List<Etudiant>> GetAllStudents();
        Task<Etudiant?> GetStudentById(int id);
        Task<Etudiant> CreateStudent(LibraryApi.DTOs.EtudiantDto dto);
        Task<Etudiant?> UpdateStudent(int id, LibraryApi.DTOs.EtudiantDto dto);
        Task<bool> DeleteStudent(int id);
    }
}