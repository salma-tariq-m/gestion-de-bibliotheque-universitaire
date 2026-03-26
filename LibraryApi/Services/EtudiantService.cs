using LibraryApi.Models;

public class EtudiantService
{
    private readonly EtudiantRepository _repo;

    public EtudiantService(EtudiantRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Etudiant>> GetAll() => await _repo.GetAll();
    public async Task<Etudiant?> GetById(int id) => await _repo.GetById(id);
    public async Task Add(Etudiant e) => await _repo.Add(e);
    public async Task Update(int id, Etudiant e)
    {
        var existing = await _repo.GetById(id);
        if (existing == null) return;

        existing.Cef = e.Cef;
        existing.Nom = e.Nom;
        existing.Prenom = e.Prenom;
        existing.Email = e.Email;
        existing.Id_Fillier = e.Id_Fillier;

        await _repo.Update(existing);
    }
    public async Task Delete(int id) => await _repo.Delete(id);
}