using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StazAplikacjaReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class changetypetodateonly1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "BirthDate", "Email", "Name", "OtherCategory", "Password", "PhoneNumber", "Surname" },
                values: new object[,]
                {
                    { 1, "12.06.2003", "s189033@student.pg.edu.pl", "Maciej", null, "SeCrEt*!", "662066180", "Lica" },
                    { 2, "06.03.45 p.n.e.", "loremipsum@example.com", "Lorem", null, "SeCrEt2*!", "000000000", "Ipsum" }
                });
        }
    }
}
