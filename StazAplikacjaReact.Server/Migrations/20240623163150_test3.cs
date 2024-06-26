using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StazAplikacjaReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class test3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "BirthDate", "Email", "Name", "Password", "PhoneNumber", "Surname", "otherCategory" },
                values: new object[,]
                {
                    { 1, "12.06.2003", "s189033@student.pg.edu.pl", "Maciej", "SeCrEt*!", "662066180", "Lica", null },
                    { 2, "06.03.45 p.n.e.", "loremipsum@example.com", "Lorem", "SeCrEt2*!", "000000000", "Ipsum", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
