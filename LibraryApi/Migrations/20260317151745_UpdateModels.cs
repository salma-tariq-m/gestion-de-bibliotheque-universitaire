using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id_livre",
                table: "Books",
                newName: "Id_Livre");

            migrationBuilder.AddColumn<int>(
                name: "CategorieId_Categorie",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id_Categorie",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categorie",
                columns: table => new
                {
                    Id_Categorie = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomCategorie = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorie", x => x.Id_Categorie);
                });

            migrationBuilder.CreateTable(
                name: "Fillier",
                columns: table => new
                {
                    Id_Fillier = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomFillier = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fillier", x => x.Id_Fillier);
                });

            migrationBuilder.CreateTable(
                name: "Etudiants",
                columns: table => new
                {
                    Id_etudiant = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Id_Fillier = table.Column<int>(type: "int", nullable: false),
                    FillierId_Fillier = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Etudiants", x => x.Id_etudiant);
                    table.ForeignKey(
                        name: "FK_Etudiants_Fillier_FillierId_Fillier",
                        column: x => x.FillierId_Fillier,
                        principalTable: "Fillier",
                        principalColumn: "Id_Fillier");
                });

            migrationBuilder.CreateTable(
                name: "Emprunts",
                columns: table => new
                {
                    Id_Emprunt = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_Etudiant = table.Column<int>(type: "int", nullable: false),
                    EtudiantId_etudiant = table.Column<int>(type: "int", nullable: true),
                    Id_Livre = table.Column<int>(type: "int", nullable: false),
                    LivreId_Livre = table.Column<int>(type: "int", nullable: true),
                    Date_Emprunt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateRetourPrevue = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateRetourReelle = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emprunts", x => x.Id_Emprunt);
                    table.ForeignKey(
                        name: "FK_Emprunts_Books_LivreId_Livre",
                        column: x => x.LivreId_Livre,
                        principalTable: "Books",
                        principalColumn: "Id_Livre");
                    table.ForeignKey(
                        name: "FK_Emprunts_Etudiants_EtudiantId_etudiant",
                        column: x => x.EtudiantId_etudiant,
                        principalTable: "Etudiants",
                        principalColumn: "Id_etudiant");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_CategorieId_Categorie",
                table: "Books",
                column: "CategorieId_Categorie");

            migrationBuilder.CreateIndex(
                name: "IX_Emprunts_EtudiantId_etudiant",
                table: "Emprunts",
                column: "EtudiantId_etudiant");

            migrationBuilder.CreateIndex(
                name: "IX_Emprunts_LivreId_Livre",
                table: "Emprunts",
                column: "LivreId_Livre");

            migrationBuilder.CreateIndex(
                name: "IX_Etudiants_FillierId_Fillier",
                table: "Etudiants",
                column: "FillierId_Fillier");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Categorie_CategorieId_Categorie",
                table: "Books",
                column: "CategorieId_Categorie",
                principalTable: "Categorie",
                principalColumn: "Id_Categorie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Categorie_CategorieId_Categorie",
                table: "Books");

            migrationBuilder.DropTable(
                name: "Categorie");

            migrationBuilder.DropTable(
                name: "Emprunts");

            migrationBuilder.DropTable(
                name: "Etudiants");

            migrationBuilder.DropTable(
                name: "Fillier");

            migrationBuilder.DropIndex(
                name: "IX_Books_CategorieId_Categorie",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CategorieId_Categorie",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Id_Categorie",
                table: "Books");

            migrationBuilder.RenameColumn(
                name: "Id_Livre",
                table: "Books",
                newName: "Id_livre");
        }
    }
}
