using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class UserBadge
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? IconUrl { get; set; }

    [MaxLength(500)]
    public string? Description { get; set; }
}

public class UserBadgeMapping
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int BadgeId { get; set; }
    public UserBadge Badge { get; set; } = null!;

    public bool IsEarned { get; set; } = false;
    public DateTime? EarnedAt { get; set; }
}
