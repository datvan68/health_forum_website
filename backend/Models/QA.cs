using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class QAQuestion
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;

    public string? Content { get; set; }

    public int? CategoryId { get; set; }
    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }

    public List<QAAnswer> Answers { get; set; } = new();
}

public class QAAnswer
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Content { get; set; } = string.Empty;

    public int QuestionId { get; set; }
    [ForeignKey("QuestionId")]
    public QAQuestion? Question { get; set; }

    public int AuthorId { get; set; }
    [ForeignKey("AuthorId")]
    public User? Author { get; set; }

    public bool IsVerified { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }
}
