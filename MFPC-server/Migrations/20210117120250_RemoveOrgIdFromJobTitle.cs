using Microsoft.EntityFrameworkCore.Migrations;

namespace MFPC_server.Migrations
{
    public partial class RemoveOrgIdFromJobTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganisationId",
                table: "JobTitle");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganisationId",
                table: "JobTitle",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
