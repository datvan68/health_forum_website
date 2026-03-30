namespace backend.ViewModels;

public class ExpertProfileViewModel
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
    public List<BadgeViewModel> Badges { get; set; } = new();
}

public class BadgeViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? IconUrl { get; set; }
    public bool IsEarned { get; set; }
}
