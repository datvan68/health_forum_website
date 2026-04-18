using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<QAQuestion> QAQuestions => Set<QAQuestion>();
    public DbSet<QAAnswer> QAAnswers => Set<QAAnswer>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<UserBadge> UserBadges => Set<UserBadge>();
    public DbSet<UserBadgeMapping> UserBadgeMappings => Set<UserBadgeMapping>();
    public DbSet<Article> Articles => Set<Article>();
    public DbSet<ArticleComment> ArticleComments => Set<ArticleComment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Unique constraints for User
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();

        // Indexing based on screen_spec requirements
        modelBuilder.Entity<Post>().HasIndex(p => p.VoteCount);
        modelBuilder.Entity<Post>().HasIndex(p => p.CreatedAt);

        // Many-to-Many for User and Badge
        modelBuilder.Entity<UserBadgeMapping>()
            .HasKey(ubm => new { ubm.UserId, ubm.BadgeId });

        modelBuilder.Entity<UserBadgeMapping>()
            .HasOne(ubm => ubm.User)
            .WithMany(u => u.BadgeMappings)
            .HasForeignKey(ubm => ubm.UserId);

        modelBuilder.Entity<UserBadgeMapping>()
            .HasOne(ubm => ubm.Badge)
            .WithMany()
            .HasForeignKey(ubm => ubm.BadgeId);

        // Article & User relation
        modelBuilder.Entity<Article>()
            .HasOne(a => a.Author)
            .WithMany()
            .HasForeignKey(a => a.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Article & Comments relation
        modelBuilder.Entity<ArticleComment>()
            .HasOne(c => c.Article)
            .WithMany(a => a.Comments)
            .HasForeignKey(c => c.ArticleId)
            .OnDelete(DeleteBehavior.Cascade);

        // ArticleComment & User relation
        modelBuilder.Entity<ArticleComment>()
            .HasOne(c => c.Author)
            .WithMany()
            .HasForeignKey(c => c.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique Slug
        modelBuilder.Entity<Article>()
            .HasIndex(a => a.Slug)
            .IsUnique();
    }
}
