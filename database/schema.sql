-- ============================================
-- Health Forum Database Schema
-- Tạo bởi EF Core Migrations (tham khảo)
-- ============================================

CREATE DATABASE IF NOT EXISTS HealthForumDb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE HealthForumDb;

-- Bảng Users — Tài khoản người dùng
CREATE TABLE IF NOT EXISTS Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL,
    PasswordHash LONGTEXT NOT NULL,
    FullName VARCHAR(100) NOT NULL,
    Title VARCHAR(100) NULL,
    Specialty VARCHAR(100) NULL,
    Bio VARCHAR(500) NULL,
    AvatarUrl LONGTEXT NULL,
    CoverImageUrl LONGTEXT NULL,
    Location VARCHAR(100) NULL,
    Organization VARCHAR(200) NULL,
    HighestDegree VARCHAR(100) NULL,
    ResearchArea VARCHAR(200) NULL,
    HealthScore INT NOT NULL DEFAULT 0,
    IsVerified TINYINT(1) NOT NULL DEFAULT 0,
    IsOnline TINYINT(1) NOT NULL DEFAULT 0,
    CreatedAt DATETIME(6) NOT NULL,
    UpdatedAt DATETIME(6) NULL,
    DeletedAt DATETIME(6) NULL,
    UNIQUE INDEX IX_Users_Email (Email),
    UNIQUE INDEX IX_Users_Username (Username)
) CHARACTER SET utf8mb4;

-- Bảng Categories — Danh mục
CREATE TABLE IF NOT EXISTS Categories (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Label VARCHAR(50) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    ImageUrl LONGTEXT NULL,
    CreatedAt DATETIME(6) NOT NULL,
    UpdatedAt DATETIME(6) NULL,
    DeletedAt DATETIME(6) NULL
) CHARACTER SET utf8mb4;

-- Bảng Articles — Bài viết
CREATE TABLE IF NOT EXISTS Articles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Slug VARCHAR(200) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Snippet VARCHAR(1000) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    ContentSummary LONGTEXT NOT NULL,
    FeaturedImage VARCHAR(500) NULL,
    MethodologyTitle VARCHAR(255) NULL,
    MethodologyPointsJson JSON NULL,
    MethodologyConclusion LONGTEXT NULL,
    RelatedTopicsJson JSON NULL,
    AuthorId INT NOT NULL,
    ViewsCount INT NOT NULL DEFAULT 0,
    LikesCount INT NOT NULL DEFAULT 0,
    SavesCount INT NOT NULL DEFAULT 0,
    CommentsCount INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME(6) NOT NULL,
    UpdatedAt DATETIME(6) NULL,
    UNIQUE INDEX IX_Articles_Slug (Slug),
    INDEX IX_Articles_AuthorId (AuthorId),
    CONSTRAINT FK_Articles_Users_AuthorId
        FOREIGN KEY (AuthorId) REFERENCES Users(Id) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

-- Bảng ArticleComments — Bình luận bài viết
CREATE TABLE IF NOT EXISTS ArticleComments (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Content VARCHAR(2000) NOT NULL,
    ArticleId INT NOT NULL,
    AuthorId INT NOT NULL,
    LikesCount INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME(6) NOT NULL,
    INDEX IX_ArticleComments_ArticleId (ArticleId),
    INDEX IX_ArticleComments_AuthorId (AuthorId),
    CONSTRAINT FK_ArticleComments_Articles_ArticleId
        FOREIGN KEY (ArticleId) REFERENCES Articles(Id) ON DELETE CASCADE,
    CONSTRAINT FK_ArticleComments_Users_AuthorId
        FOREIGN KEY (AuthorId) REFERENCES Users(Id) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;
