using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UnifyUserAndRemoveExpert : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleComments_Experts_AuthorId",
                table: "ArticleComments");

            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Experts_AuthorId",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Experts_AuthorId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_QAAnswers_Experts_ExpertId",
                table: "QAAnswers");

            migrationBuilder.DropTable(
                name: "ExpertBadgeMappings");

            migrationBuilder.DropTable(
                name: "ExpertBadges");

            migrationBuilder.DropTable(
                name: "Experts");

            migrationBuilder.RenameColumn(
                name: "ExpertId",
                table: "QAAnswers",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_QAAnswers_ExpertId",
                table: "QAAnswers",
                newName: "IX_QAAnswers_AuthorId");

            migrationBuilder.AddColumn<int>(
                name: "HealthScore",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsOnline",
                table: "Users",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsVerified",
                table: "Users",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "UserBadges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    IconUrl = table.Column<string>(type: "longtext", nullable: true),
                    Description = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBadges", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserBadgeMappings",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BadgeId = table.Column<int>(type: "int", nullable: false),
                    IsEarned = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    EarnedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBadgeMappings", x => new { x.UserId, x.BadgeId });
                    table.ForeignKey(
                        name: "FK_UserBadgeMappings_UserBadges_BadgeId",
                        column: x => x.BadgeId,
                        principalTable: "UserBadges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBadgeMappings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_UserBadgeMappings_BadgeId",
                table: "UserBadgeMappings",
                column: "BadgeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleComments_Users_AuthorId",
                table: "ArticleComments",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Users_AuthorId",
                table: "Articles",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_AuthorId",
                table: "Posts",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QAAnswers_Users_AuthorId",
                table: "QAAnswers",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleComments_Users_AuthorId",
                table: "ArticleComments");

            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Users_AuthorId",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_AuthorId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_QAAnswers_Users_AuthorId",
                table: "QAAnswers");

            migrationBuilder.DropTable(
                name: "UserBadgeMappings");

            migrationBuilder.DropTable(
                name: "UserBadges");

            migrationBuilder.DropColumn(
                name: "HealthScore",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsOnline",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsVerified",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "QAAnswers",
                newName: "ExpertId");

            migrationBuilder.RenameIndex(
                name: "IX_QAAnswers_AuthorId",
                table: "QAAnswers",
                newName: "IX_QAAnswers_ExpertId");

            migrationBuilder.CreateTable(
                name: "ExpertBadges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    IconUrl = table.Column<string>(type: "longtext", nullable: true),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpertBadges", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Experts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    AvatarUrl = table.Column<string>(type: "longtext", nullable: true),
                    Bio = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    CoverImageUrl = table.Column<string>(type: "longtext", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    FullName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    HealthScore = table.Column<int>(type: "int", nullable: false),
                    HighestDegree = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    IsOnline = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsVerified = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Location = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    Organization = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    ResearchArea = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    Specialty = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Title = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experts", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ExpertBadgeMappings",
                columns: table => new
                {
                    ExpertId = table.Column<int>(type: "int", nullable: false),
                    BadgeId = table.Column<int>(type: "int", nullable: false),
                    EarnedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsEarned = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpertBadgeMappings", x => new { x.ExpertId, x.BadgeId });
                    table.ForeignKey(
                        name: "FK_ExpertBadgeMappings_ExpertBadges_BadgeId",
                        column: x => x.BadgeId,
                        principalTable: "ExpertBadges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExpertBadgeMappings_Experts_ExpertId",
                        column: x => x.ExpertId,
                        principalTable: "Experts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ExpertBadgeMappings_BadgeId",
                table: "ExpertBadgeMappings",
                column: "BadgeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleComments_Experts_AuthorId",
                table: "ArticleComments",
                column: "AuthorId",
                principalTable: "Experts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Experts_AuthorId",
                table: "Articles",
                column: "AuthorId",
                principalTable: "Experts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Experts_AuthorId",
                table: "Posts",
                column: "AuthorId",
                principalTable: "Experts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QAAnswers_Experts_ExpertId",
                table: "QAAnswers",
                column: "ExpertId",
                principalTable: "Experts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
