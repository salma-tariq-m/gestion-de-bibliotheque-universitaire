using LibraryApi.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryApi.Services
{
    public class RetardService
    {
        private readonly RetardRepository _repo;

        // Constructor inject Repository
        public RetardService(RetardRepository repo)
        {
            _repo = repo;
        }

        // Méthode pour récupérer tous les retards
        public async Task<List<RetardDto>> GetRetards()
        {
            // On appelle le repository
            var retards = await _repo.GetRetards();

            // Optionnel : tu peux faire un tri par jours de retard décroissant
            retards.Sort((a, b) => b.JoursRetard.CompareTo(a.JoursRetard));

            return retards;
        }
    }
}