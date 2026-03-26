namespace LibraryApi.Models
{
public class Retard
{
    public int Id_Emprunt { get; set; }

    public DateTime DateEmprunt { get; set; }
    public DateTime DateRetourPrevue { get; set; }
    public DateTime? DateRetourReelle { get; set; }

    public int EtudiantId { get; set; }
    public Etudiant? Etudiant { get; set; }

    public int LivreId { get; set; }
    public Livre? Livre { get; set; }
}
}