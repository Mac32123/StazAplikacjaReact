using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StazAplikacjaReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class test5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "otherCategory",
                table: "Contacts",
                newName: "OtherCategory");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Contacts",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OtherCategory",
                table: "Contacts",
                newName: "otherCategory");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);
        }
    }
}
