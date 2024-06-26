using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StazAplikacjaReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class changetypetodateonly6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                column: "BirthDate",
                value: new DateOnly(2003, 6, 12));

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2,
                column: "BirthDate",
                value: new DateOnly(45, 3, 6));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                column: "BirthDate",
                value: new DateOnly(1, 1, 1));

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2,
                column: "BirthDate",
                value: new DateOnly(1, 1, 1));
        }
    }
}
