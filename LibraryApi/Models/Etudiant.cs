using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Etudiant
{
    [Key]
    public int Id_etudiant { get; set; }
    public string Cef { get; set; } = string.Empty;
    public string Prenom { get; set; } = string.Empty;
    public string Nom { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Id_Fillier { get; set; }
    public Fillier? Fillier { get; set; }

    public List<Emprunt> Emprunts { get; set; } = new List<Emprunt>();
}