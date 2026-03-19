using LibraryApi.DTOs;
using LibraryApi.Models;
using LibraryApi.Repositories;
using Microsoft.EntityFrameworkCore;

public class EmpruntService
{
    private readonly EmpruntRepository _repository;

    public EmpruntService(EmpruntRepository repository)
    {
        _repository = repository;
    }

    // ✅ GET ALL
    public async Task<List<EmpruntDto>> GetAllEmprunts()
    {
        var emprunts = await _repository.GetAllWithIncludes();

        return emprunts.Select(e => new EmpruntDto
        {
            Id_Emprunt = e.Id_Emprunt,
            EtudiantNom = e.Etudiant!.Nom + " " + e.Etudiant.Prenom,
            EtudiantCEF = e.Etudiant.CEF,
            LivreTitre = e.Livre!.Titre,
            DateEmprunt = e.Date_Emprunt,
            DateRetourPrevue = e.DateRetourPrevue,
            DateRetourReelle = e.DateRetourReelle,
            Statut = e.DateRetourReelle != null ? "Retourné" : "Emprunté"
        }).ToList();
    }

    // ✅ CREATE
public async Task<string> CreateEmprunt(CreateEmpruntDto dto)
{
    var etudiant = await _repository.GetEtudiantByCEF(dto.EtudiantCEF);
    if (etudiant == null)
        return "Étudiant introuvable";

    var livre = await _repository.GetLivreByTitre(dto.LivreTitre);
    if (livre == null)
        return "Livre introuvable";

    if (livre.Quantite <= 0)
        return "Livre en rupture de stock";

    var dejaEmprunte = await _repository.IsLivreDejaEmprunte(livre.Id_Livre);
    if (dejaEmprunte)
        return "Ce livre est déjà emprunté";

    var emprunt = new Emprunt
    {
        Id_etudiant = etudiant.Id_etudiant,
        Id_Livre = livre.Id_Livre,
        Date_Emprunt = dto.DateEmprunt,
        DateRetourPrevue = dto.DateRetourPrevue
    };

    await _repository.AddAsync(emprunt);

    livre.Quantite -= 1;

    await _repository.SaveAsync();

    return "Emprunt créé avec succès";
}
    // ✅ RETOURNER
    public async Task<bool> RetournerEmprunt(int id)
    {
        var emprunt = await _repository.GetByIdAsync(id);
        if (emprunt == null) return false;

        emprunt.DateRetourReelle = DateTime.Now;

        await _repository.UpdateAsync(emprunt);
        return true;
    }

    // ✅ DELETE
    public async Task<bool> DeleteEmprunt(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}