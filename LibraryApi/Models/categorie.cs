using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    public class Categorie
    {
        [Key]
        public int Id_Categorie { get; set; }
        public string NomCategorie { get; set; } = string.Empty;

        // Liste des livres de cette catégorie
        public ICollection<Livre> Livres { get; set; } = new List<Livre>();
    }
}