using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Livre",
                columns: table => new
                {
                    Id_Livre = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Auteur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantite = table.Column<int>(type: "int", nullable: false),
                    Annee = table.Column<int>(type: "int", nullable: false),
                    Id_Categorie = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Livre", x => x.Id_Livre);
                    table.ForeignKey(
                        name: "FK_Livre_Categorie_Id_Categorie",
                        column: x => x.Id_Categorie,
                        principalTable: "Categorie",
                        principalColumn: "Id_Categorie",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Etudiant",
                columns: table => new
                {
                    Id_etudiant = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cef = table.Column<int>(type: "int", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Id_Fillier = table.Column<int>(type: "int", nullable: false),
                    FillierId_Fillier = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Etudiant", x => x.Id_etudiant);
                    table.ForeignKey(
                        name: "FK_Etudiant_Fillier_FillierId_Fillier",
                        column: x => x.FillierId_Fillier,
                        principalTable: "Fillier",
                        principalColumn: "Id_Fillier");
                    table.ForeignKey(
                        name: "FK_Etudiant_Fillier_Id_Fillier",
                        column: x => x.Id_Fillier,
                        principalTable: "Fillier",
                        principalColumn: "Id_Fillier",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Emprunt",
                columns: table => new
                {
                    Id_Emprunt = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_etudiant = table.Column<int>(type: "int", nullable: false),
                    Id_Livre = table.Column<int>(type: "int", nullable: false),
                    Date_Emprunt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateRetourPrevue = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateRetourReelle = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emprunt", x => x.Id_Emprunt);
                    table.ForeignKey(
                        name: "FK_Emprunt_Etudiant_Id_etudiant",
                        column: x => x.Id_etudiant,
                        principalTable: "Etudiant",
                        principalColumn: "Id_etudiant",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Emprunt_Livre_Id_Livre",
                        column: x => x.Id_Livre,
                        principalTable: "Livre",
                        principalColumn: "Id_Livre",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Emprunt_Id_etudiant",
                table: "Emprunt",
                column: "Id_etudiant");

            migrationBuilder.CreateIndex(
                name: "IX_Emprunt_Id_Livre",
                table: "Emprunt",
                column: "Id_Livre");

            migrationBuilder.CreateIndex(
                name: "IX_Etudiant_FillierId_Fillier",
                table: "Etudiant",
                column: "FillierId_Fillier");

            migrationBuilder.CreateIndex(
                name: "IX_Etudiant_Id_Fillier",
                table: "Etudiant",
                column: "Id_Fillier");

            migrationBuilder.CreateIndex(
                name: "IX_Livre_Id_Categorie",
                table: "Livre",
                column: "Id_Categorie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Emprunt");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Etudiant");

            migrationBuilder.DropTable(
                name: "Livre");

            migrationBuilder.DropTable(
                name: "Fillier");

            migrationBuilder.DropTable(
                name: "Categorie");
        }
    }
}
