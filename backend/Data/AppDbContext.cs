using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Expert> Experts => Set<Expert>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<QAQuestion> QAQuestions => Set<QAQuestion>();
    public DbSet<QAAnswer> QAAnswers => Set<QAAnswer>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<ExpertBadge> ExpertBadges => Set<ExpertBadge>();
    public DbSet<ExpertBadgeMapping> ExpertBadgeMappings => Set<ExpertBadgeMapping>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Indexing based on screen_spec requirements
        modelBuilder.Entity<Post>().HasIndex(p => p.VoteCount);
        modelBuilder.Entity<Post>().HasIndex(p => p.CreatedAt);

        // Many-to-Many for Expert and Badge
        modelBuilder.Entity<ExpertBadgeMapping>()
            .HasKey(ebm => new { ebm.ExpertId, ebm.BadgeId });

        modelBuilder.Entity<ExpertBadgeMapping>()
            .HasOne(ebm => ebm.Expert)
            .WithMany(e => e.BadgeMappings)
            .HasForeignKey(ebm => ebm.ExpertId);

        modelBuilder.Entity<ExpertBadgeMapping>()
            .HasOne(ebm => ebm.Badge)
            .WithMany()
            .HasForeignKey(ebm => ebm.BadgeId);
    }
}
