using Microsoft.EntityFrameworkCore.Migrations;

namespace MFPC_server.Migrations
{
    public partial class AlterUserJobTitleForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_JobTitle_JobTitleId",
                table: "User");

            migrationBuilder.AddForeignKey(
                name: "FK_User_JobTitle_JobTitleId",
                table: "User",
                column: "JobTitleId",
                principalTable: "JobTitle",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_JobTitle_JobTitleId",
                table: "User");

            migrationBuilder.AddForeignKey(
                name: "FK_User_JobTitle_JobTitleId",
                table: "User",
                column: "JobTitleId",
                principalTable: "JobTitle",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}