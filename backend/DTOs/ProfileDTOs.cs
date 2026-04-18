namespace backend.DTOs;

public class ProfileResponse
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Specialty { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public bool IsVerified { get; set; }
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public int HealthScore { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? ResearchArea { get; set; }
    public string? HighestDegree { get; set; }
    public string? Organization { get; set; }
    public List<BadgeDto> Badges { get; set; } = new();
}

public class ProfileUpdateRequest
{
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string SiteTitle { get; set; } = string.Empty; // Maps to Specialty in db context if needed
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public string? ResearchArea { get; set; }
    public string? HighestDegree { get; set; }
    public string? Organization { get; set; }
}

public class BadgeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? IconUrl { get; set; }
    public bool IsEarned { get; set; }
}
