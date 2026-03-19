using Microsoft.EntityFrameworkCore;
using LibraryApi.Models;

namespace LibraryApi.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Livre>().HasKey(b => b.Id_Livre);

            modelBuilder.Entity<Categorie>(entity =>
            {
                entity.ToTable("Categorie");
                entity.HasKey(c => c.Id_Categorie); 
            });
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Livre> Books { get; set; }
        public DbSet<Etudiant> Etudiants { get; set; }
        public DbSet<Emprunt> Emprunts { get; set; }
        public DbSet<Categorie> Categorie { get; set; } // <== ici le nom correspond à ta table SQL



    }
}