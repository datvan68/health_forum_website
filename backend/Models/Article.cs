using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Article
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Slug { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Snippet { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? FeaturedImage { get; set; }

    public int AuthorId { get; set; }
    [ForeignKey("AuthorId")]
    public User? Author { get; set; }

    public int ViewsCount { get; set; } = 0;
    public int LikesCount { get; set; } = 0;
    public int SavesCount { get; set; } = 0;
    public int CommentsCount { get; set; } = 0;

    public string ContentSummary { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? MethodologyTitle { get; set; }
    public string? MethodologyConclusion { get; set; }

    [Column(TypeName = "json")]
    public string? MethodologyPointsJson { get; set; } 

    [Column(TypeName = "json")]
    public string? RelatedTopicsJson { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public ICollection<ArticleComment> Comments { get; set; } = new List<ArticleComment>();
}
