using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Migrations
{
    /// <inheritdoc />
    public partial class updateEtudiant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id_Etudiant",
                table: "Emprunts",
                newName: "Id_etudiant");

            migrationBuilder.AddColumn<int>(
                name: "CEF",
                table: "Etudiants",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CEF",
                table: "Etudiants");

            migrationBuilder.RenameColumn(
                name: "Id_etudiant",
                table: "Emprunts",
                newName: "Id_Etudiant");
        }
    }
}
