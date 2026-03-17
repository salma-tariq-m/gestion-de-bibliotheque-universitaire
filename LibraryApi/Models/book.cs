using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Livre
{
  [Key]
    public int Id_Livre { get; set; }
    public string Titre { get; set; } = string.Empty;
    public string Auteur { get; set; } = string.Empty;
    public int Quantite { get; set; }
    public int Annee { get; set; }

    // Correction ici :
    public int Id_Categorie { get; set; }

    [ForeignKey("Id_Categorie")] // On lie l'objet à la colonne Id_Categorie
    public Categorie? Categorie { get; set; }

    // Navigation vers emprunts
    public List<Emprunt> Emprunts { get; set; } = new List<Emprunt>();
}
