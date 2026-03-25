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

        // DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<Livre> Books { get; set; }
        public DbSet<Etudiant> Etudiants { get; set; }
        public DbSet<Emprunt> Emprunts { get; set; }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<Fillier> Filliers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // =========================
            // PRIMARY KEYS
            // =========================
            modelBuilder.Entity<Livre>()
                .HasKey(l => l.Id_Livre);

            modelBuilder.Entity<Categorie>()
                .HasKey(c => c.Id_Categorie);

            modelBuilder.Entity<Etudiant>()
                .HasKey(e => e.Id_etudiant);

            modelBuilder.Entity<Fillier>()
                .HasKey(f => f.Id_Fillier);

            modelBuilder.Entity<Emprunt>()
                .HasKey(e => e.Id_Emprunt);

            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            // =========================
            // TABLE NAMES (optional)
            // =========================
            modelBuilder.Entity<Categorie>().ToTable("Categorie");
            modelBuilder.Entity<Livre>().ToTable("Livre");
            modelBuilder.Entity<Etudiant>().ToTable("Etudiant");
            modelBuilder.Entity<Fillier>().ToTable("Fillier");
            modelBuilder.Entity<Emprunt>().ToTable("Emprunt");
            modelBuilder.Entity<User>().ToTable("User");

            // =========================
            // RELATIONSHIPS
            // =========================

            // Livre → Categorie (Many-to-One)
            modelBuilder.Entity<Livre>()
                .HasOne(l => l.Categorie)
                .WithMany(c => c.Livres)
                .HasForeignKey(l => l.Id_Categorie)
                .OnDelete(DeleteBehavior.Cascade);

            // Etudiant → Fillier (Many-to-One)
            modelBuilder.Entity<Etudiant>()
                .HasOne<Fillier>()
                .WithMany(f => f.Etudiants)
                .HasForeignKey(e => e.Id_Fillier)
                .OnDelete(DeleteBehavior.Cascade);

            // Emprunt → Etudiant (Many-to-One)
            modelBuilder.Entity<Emprunt>()
                .HasOne(e => e.Etudiant)
                .WithMany(e => e.Emprunts)
                .HasForeignKey(e => e.Id_etudiant)
                .OnDelete(DeleteBehavior.Cascade);

            // Emprunt → Livre (Many-to-One)
            modelBuilder.Entity<Emprunt>()
                .HasOne(e => e.Livre)
                .WithMany()
                .HasForeignKey(e => e.Id_Livre)
                .OnDelete(DeleteBehavior.Cascade);

            // =========================
            // PROPERTY CONFIGURATIONS (optional but recommended)
            // =========================

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .IsRequired();

            modelBuilder.Entity<Etudiant>()
                .Property(e => e.Email)
                .IsRequired();

            modelBuilder.Entity<Etudiant>()
                .Property(e => e.Nom)
                .HasMaxLength(100)
                .IsRequired();

            modelBuilder.Entity<Etudiant>()
                .Property(e => e.Prenom)
                .HasMaxLength(100)
                .IsRequired();
        }
    }
}