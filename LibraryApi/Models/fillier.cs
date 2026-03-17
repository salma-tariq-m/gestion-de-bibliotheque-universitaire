using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Fillier
{
    [Key]
    public int Id_Fillier { get; set; }
    public string NomFillier { get; set; } = string.Empty;

    public List<Etudiant> Etudiants { get; set; } = new List<Etudiant>();
}