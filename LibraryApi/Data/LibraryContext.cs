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
        public DbSet<Emprunt> Emprunts { get; set; }
        public DbSet<Categorie> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // =========================
            // PRIMARY KEYS
            // =========================
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<User>().HasKey(u => u.Id);

            modelBuilder.Entity<Livre>()
                .HasKey(l => l.Id_Livre);

            modelBuilder.Entity<Categorie>()
                .HasKey(c => c.Id_Categorie);

            modelBuilder.Entity<Emprunt>()
                .HasKey(e => e.Id_Emprunt);

     
            // =========================
            // TABLES
            // =========================

            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Livre>().ToTable("Livre");
            modelBuilder.Entity<Categorie>().ToTable("Categorie");
            modelBuilder.Entity<Emprunt>().ToTable("Emprunt");

            // =========================
            // RELATIONS
            // =========================

            // Livre -> Catégorie
            modelBuilder.Entity<Livre>()
                .HasOne(l => l.Categorie)
                .WithMany(c => c.Livres)
                .HasForeignKey(l => l.Id_Categorie)
                .OnDelete(DeleteBehavior.Cascade);

            // Emprunt -> Livre
            modelBuilder.Entity<Emprunt>()
                .HasOne(e => e.Livre)
                .WithMany()
                .HasForeignKey(e => e.Id_Livre)
                .OnDelete(DeleteBehavior.Cascade);

          
            // =========================
            // CONFIGURATION
            // =========================

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .IsRequired();

            modelBuilder.Entity<Emprunt>()
                .Property(e => e.EtudiantCEF)
                .HasMaxLength(20)
                .IsRequired();

            modelBuilder.Entity<Emprunt>()
                .Property(e => e.Statut)
                .HasMaxLength(20);

            modelBuilder.Entity<Emprunt>()
                .Property(e => e.EtatAvantEmprunt)
                .HasMaxLength(20);

            modelBuilder.Entity<Emprunt>()
                .Property(e => e.EtatAuRetour)
                .HasMaxLength(20);

            modelBuilder.Entity<Emprunt>()
                .Property(e => e.Observation)
                .HasMaxLength(500);
        }
    }
}