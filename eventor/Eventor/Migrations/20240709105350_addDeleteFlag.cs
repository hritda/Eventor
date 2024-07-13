using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eventor.Migrations
{
    /// <inheritdoc />
    public partial class addDeleteFlag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
          name: "DeleteFlag",
          table: "Events",
          nullable: false,
          defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
            name: "DeleteFlag",
            table: "Events");
        }
    }
}
