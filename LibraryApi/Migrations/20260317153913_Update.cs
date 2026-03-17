using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Categorie_CategorieId_Categorie",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_CategorieId_Categorie",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CategorieId_Categorie",
                table: "Books");

            migrationBuilder.CreateIndex(
                name: "IX_Books_Id_Categorie",
                table: "Books",
                column: "Id_Categorie");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Categorie_Id_Categorie",
                table: "Books",
                column: "Id_Categorie",
                principalTable: "Categorie",
                principalColumn: "Id_Categorie",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Categorie_Id_Categorie",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_Id_Categorie",
                table: "Books");

            migrationBuilder.AddColumn<int>(
                name: "CategorieId_Categorie",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_CategorieId_Categorie",
                table: "Books",
                column: "CategorieId_Categorie");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Categorie_CategorieId_Categorie",
                table: "Books",
                column: "CategorieId_Categorie",
                principalTable: "Categorie",
                principalColumn: "Id_Categorie");
        }
    }
}
