using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emprunt_Etudiant_Id_etudiant",
                table: "Emprunt");

            migrationBuilder.DropTable(
                name: "Etudiant");

            migrationBuilder.DropTable(
                name: "Fillier");

            migrationBuilder.DropIndex(
                name: "IX_Emprunt_Id_etudiant",
                table: "Emprunt");

            migrationBuilder.DropColumn(
                name: "Id_etudiant",
                table: "Emprunt");

            migrationBuilder.AddColumn<string>(
                name: "TypeUser",
                table: "User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Titre",
                table: "Livre",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Auteur",
                table: "Livre",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ISBN",
                table: "Livre",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Statut",
                table: "Emprunt",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "EtatAuRetour",
                table: "Emprunt",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EtatAvantEmprunt",
                table: "Emprunt",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EtudiantCEF",
                table: "Emprunt",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "LivreId_Livre",
                table: "Emprunt",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Observation",
                table: "Emprunt",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NomCategorie",
                table: "Categorie",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Categorie",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Emprunt_LivreId_Livre",
                table: "Emprunt",
                column: "LivreId_Livre");

            migrationBuilder.AddForeignKey(
                name: "FK_Emprunt_Livre_LivreId_Livre",
                table: "Emprunt",
                column: "LivreId_Livre",
                principalTable: "Livre",
                principalColumn: "Id_Livre");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emprunt_Livre_LivreId_Livre",
                table: "Emprunt");

            migrationBuilder.DropIndex(
                name: "IX_Emprunt_LivreId_Livre",
                table: "Emprunt");

            migrationBuilder.DropColumn(
                name: "TypeUser",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ISBN",
                table: "Livre");

            migrationBuilder.DropColumn(
                name: "EtatAuRetour",
                table: "Emprunt");

            migrationBuilder.DropColumn(
                name: "EtatAvantEmprunt",
                table: "Emprunt");

            migrationBuilder.DropColumn(
                name: "EtudiantCEF",
                table: "Emprunt");

            migrationBuilder.DropColumn(
                name: "LivreId_Livre",
                table: "Emprunt");

            migrationBuilder.DropColumn(
                name: "Observation",
                table: "Emprunt");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Categorie");

            migrationBuilder.AlterColumn<string>(
                name: "Titre",
                table: "Livre",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Auteur",
                table: "Livre",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AlterColumn<string>(
                name: "Statut",
                table: "Emprunt",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<int>(
                name: "Id_etudiant",
                table: "Emprunt",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "NomCategorie",
                table: "Categorie",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

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
                name: "Etudiant",
                columns: table => new
                {
                    Id_etudiant = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FillierId_Fillier = table.Column<int>(type: "int", nullable: true),
                    Cef = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Id_Fillier = table.Column<int>(type: "int", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_Emprunt_Id_etudiant",
                table: "Emprunt",
                column: "Id_etudiant");

            migrationBuilder.CreateIndex(
                name: "IX_Etudiant_FillierId_Fillier",
                table: "Etudiant",
                column: "FillierId_Fillier");

            migrationBuilder.CreateIndex(
                name: "IX_Etudiant_Id_Fillier",
                table: "Etudiant",
                column: "Id_Fillier");

            migrationBuilder.AddForeignKey(
                name: "FK_Emprunt_Etudiant_Id_etudiant",
                table: "Emprunt",
                column: "Id_etudiant",
                principalTable: "Etudiant",
                principalColumn: "Id_etudiant",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
