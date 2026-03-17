using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Categorie
{
    [Key]
    public int Id_Categorie { get; set; }
    public string NomCategorie { get; set; } = string.Empty;

    public List<Livre> Livres { get; set; } = new List<Livre>();
}