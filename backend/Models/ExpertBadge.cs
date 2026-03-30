using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class ExpertBadge
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

public class ExpertBadgeMapping
{
    public int ExpertId { get; set; }
    public Expert Expert { get; set; } = null!;

    public int BadgeId { get; set; }
    public ExpertBadge Badge { get; set; } = null!;

    public bool IsEarned { get; set; } = false;
    public DateTime? EarnedAt { get; set; }
}
