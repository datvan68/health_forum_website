using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Title { get; set; }

    [MaxLength(500)]
    public string? Bio { get; set; }

    [MaxLength(100)]
    public string? Location { get; set; }

    public string? AvatarUrl { get; set; }
    public string? CoverImageUrl { get; set; }

    [MaxLength(100)]
    public string? Specialty { get; set; }

    [MaxLength(200)]
    public string? ResearchArea { get; set; }

    [MaxLength(100)]
    public string? HighestDegree { get; set; }

    [MaxLength(200)]
    public string? Organization { get; set; }

    public int HealthScore { get; set; } = 0;
    public bool IsVerified { get; set; } = false;
    public bool IsOnline { get; set; } = false;

    public List<UserBadgeMapping> BadgeMappings { get; set; } = new();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
