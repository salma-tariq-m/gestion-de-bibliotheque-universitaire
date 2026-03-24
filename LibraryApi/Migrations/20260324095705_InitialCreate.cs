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
                name: "FK_Etudiants_Fillier_FillierId_Fillier",
                table: "Etudiants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Fillier",
                table: "Fillier");

            migrationBuilder.RenameTable(
                name: "Fillier",
                newName: "Filliers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Filliers",
                table: "Filliers",
                column: "Id_Fillier");

            migrationBuilder.AddForeignKey(
                name: "FK_Etudiants_Filliers_FillierId_Fillier",
                table: "Etudiants",
                column: "FillierId_Fillier",
                principalTable: "Filliers",
                principalColumn: "Id_Fillier");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Etudiants_Filliers_FillierId_Fillier",
                table: "Etudiants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Filliers",
                table: "Filliers");

            migrationBuilder.RenameTable(
                name: "Filliers",
                newName: "Fillier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Fillier",
                table: "Fillier",
                column: "Id_Fillier");

            migrationBuilder.AddForeignKey(
                name: "FK_Etudiants_Fillier_FillierId_Fillier",
                table: "Etudiants",
                column: "FillierId_Fillier",
                principalTable: "Fillier",
                principalColumn: "Id_Fillier");
        }
    }
}
