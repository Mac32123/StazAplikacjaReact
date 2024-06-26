using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StazAplikacjaReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedSubcategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SluzbowySubCategoryId",
                table: "Contacts",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                column: "SluzbowySubCategoryId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2,
                column: "SluzbowySubCategoryId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_SluzbowySubCategoryId",
                table: "Contacts",
                column: "SluzbowySubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_SluzbowySubCategories_SluzbowySubCategoryId",
                table: "Contacts",
                column: "SluzbowySubCategoryId",
                principalTable: "SluzbowySubCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_SluzbowySubCategories_SluzbowySubCategoryId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_SluzbowySubCategoryId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "SluzbowySubCategoryId",
                table: "Contacts");
        }
    }
}
