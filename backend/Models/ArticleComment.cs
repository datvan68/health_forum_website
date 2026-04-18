using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class ArticleComment
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(2000)]
    public string Content { get; set; } = string.Empty;

    public int LikesCount { get; set; } = 0;

    public int ArticleId { get; set; }
    [ForeignKey("ArticleId")]
    public Article? Article { get; set; }

    public int AuthorId { get; set; }
    [ForeignKey("AuthorId")]
    public User? Author { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
