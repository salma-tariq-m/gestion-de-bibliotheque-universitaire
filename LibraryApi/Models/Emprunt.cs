using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
namespace LibraryApi.Models
{

    public class Emprunt
    {
        [Key]
        public int Id_Emprunt { get; set; }
        public Etudiant? Etudiant { get; set; }
        public int Id_etudiant { get; set; }
        public Livre? Livre { get; set; }
        public int Id_Livre { get; set; }
        public DateTime Date_Emprunt { get; set; }
        public DateTime DateRetourPrevue { get; set; } 
        public DateTime? DateRetourReelle { get; set; } 
        public string Statut { get; set; } = string.Empty;
    }
}
