using backend.Data;
using backend.Models;
using backend.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ProfileService
{
    private readonly AppDbContext _context;

    public ProfileService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ExpertProfileViewModel?> GetProfileByIdAsync(int id)
    {
        var expert = await _context.Experts
            .Include(e => e.BadgeMappings)
                .ThenInclude(ebm => ebm.Badge)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (expert == null) return null;

        return new ExpertProfileViewModel
        {
            Id = expert.Id,
            FullName = expert.FullName,
            Title = expert.Title,
            Specialty = expert.Specialty,
            AvatarUrl = expert.AvatarUrl,
            CoverImageUrl = expert.CoverImageUrl,
            IsVerified = expert.IsVerified,
            Bio = expert.Bio,
            Location = expert.Location,
            HealthScore = expert.HealthScore,
            Badges = expert.BadgeMappings.Select(ebm => new BadgeViewModel
            {
                Id = ebm.BadgeId,
                Name = ebm.Badge.Name,
                IconUrl = ebm.Badge.IconUrl,
                IsEarned = ebm.IsEarned
            }).ToList()
        };
    }
}
