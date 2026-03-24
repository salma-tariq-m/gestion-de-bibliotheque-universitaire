// using LibraryApi.DTOs;
// using LibraryApi.Models;
// using LibraryApi.Repositories;
// using Microsoft.EntityFrameworkCore;

// public class EmpruntService
// {
//     private readonly EmpruntRepository _repository;

//     public EmpruntService(EmpruntRepository repository)
//     {
//         _repository = repository;
//     }

//     // ✅ GET ALL EMPRUNTS
//     public async Task<List<EmpruntDto>> GetAllEmprunts()
//     {
//         var emprunts = await _repository.GetAllWithIncludes();

//         return emprunts.Select(e => new EmpruntDto
//         {
//             Id_Emprunt = e.Id_Emprunt,
//             EtudiantNom = e.Etudiant != null ? e.Etudiant.Nom + " " + e.Etudiant.Prenom : "Inconnu",
//             EtudiantCEF = e.Etudiant?.Cef ?? 0,
//             LivreTitre = e.Livre != null ? e.Livre.Titre : "Inconnu",
//             DateEmprunt = e.Date_Emprunt,
//             DateRetourPrevue = e.DateRetourPrevue,
//             DateRetourReelle = e.DateRetourReelle,
//             Statut = e.DateRetourReelle != null ? "Retourné" : "Emprunté"
//         }).ToList();
//     }

//     // ✅ CREATE EMPRUNT
//     public async Task<string> CreateEmprunt(CreateEmpruntDto dto)
//     {
//         // Récupération de l'étudiant
//         var etudiant = await _repository.GetEtudiantByCEF(dto.EtudiantCEF);
//         if (etudiant == null)
//             return "Étudiant introuvable";

//         // Récupération du livre
//         var livre = await _repository.GetLivreByTitre(dto.LivreTitre);
//         if (livre == null)
//             return "Livre introuvable";

//         // Vérification de la quantité
//         if (livre.Quantite <= 0)
//             return "Livre en rupture de stock";

//         // Vérification si l'étudiant a déjà emprunté ce livre et pas encore retourné
//         var dejaEmprunte = await _repository.IsLivreDejaEmprunte(livre.Id_Livre, etudiant.Id_etudiant);
//         if (dejaEmprunte)
//             return "Ce livre est déjà emprunté par cet étudiant";

//         // Création de l'emprunt
//         var emprunt = new Emprunt
//         {
//             Id_etudiant = etudiant.Id_etudiant, // il faut l'ajouter pour la FK
//             Id_Livre = livre.Id_Livre,
//             Date_Emprunt = dto.DateEmprunt,
//             DateRetourPrevue = dto.DateRetourPrevue
//         };

//         await _repository.AddAsync(emprunt);

//         // Décrémentation de la quantité du livre
//         livre.Quantite -= 1;

//         await _repository.SaveAsync();

//         return "Emprunt créé avec succès";
//     }

//     // ✅ RETOURNER EMPRUNT
//     public async Task<bool> RetournerEmprunt(int id)
//     {
//         var emprunt = await _repository.GetByIdAsync(id);
//         if (emprunt == null) return false;

//         // Mise à jour de la date de retour
//         emprunt.DateRetourReelle = DateTime.Now;

//         // Récupérer le livre pour incrémenter la quantité
//         var livre = await _repository.GetLivreById(emprunt.Id_Livre);
//         if (livre != null)
//         {
//             livre.Quantite += 1;
//         }

//         await _repository.UpdateAsync(emprunt);
//         await _repository.SaveAsync();
//         return true;
//     }

//     // ✅ DELETE EMPRUNT
//     public async Task<bool> DeleteEmprunt(int id)
//     {
//         var emprunt = await _repository.GetByIdAsync(id);
//         if (emprunt == null) return false;

//         // Restaurer la quantité du livre si l'emprunt n'était pas retourné
//         if (emprunt.DateRetourReelle == null)
//         {
//             var livre = await _repository.GetLivreById(emprunt.Id_Livre);
//             if (livre != null)
//             {
//                 livre.Quantite += 1;
//             }
//         }

//         await _repository.DeleteAsync(id);
//         await _repository.SaveAsync();
//         return true;
//     }
// }