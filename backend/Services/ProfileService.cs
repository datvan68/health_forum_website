using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IProfileService
    {
        Task<ProfileResponse?> GetProfileByIdAsync(int id);
        Task<bool> UpdateProfileAsync(int id, ProfileUpdateRequest model);
    }

    public class ProfileService : IProfileService
    {
        private readonly AppDbContext _context;

        public ProfileService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProfileResponse?> GetProfileByIdAsync(int id)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id && u.DeletedAt == null);

            if (user != null)
            {
                return new ProfileResponse
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Title = user.Title ?? "",
                    Specialty = user.Specialty ?? "",
                    AvatarUrl = user.AvatarUrl,
                    CoverImageUrl = user.CoverImageUrl,
                    IsVerified = user.IsVerified,
                    Bio = user.Bio,
                    Location = user.Location,
                    HealthScore = user.HealthScore,
                    ResearchArea = user.ResearchArea,
                    HighestDegree = user.HighestDegree,
                    Organization = user.Organization,
                    Badges = new List<BadgeDto>()
                };
            }

            return null;
        }

        public async Task<bool> UpdateProfileAsync(int id, ProfileUpdateRequest model)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                user.FullName = model.FullName;
                user.Title = model.Title;
                user.Specialty = model.SiteTitle;
                user.Bio = model.Bio;
                user.Location = model.Location;
                user.ResearchArea = model.ResearchArea;
                user.HighestDegree = model.HighestDegree;
                user.Organization = model.Organization;
                user.UpdatedAt = DateTime.UtcNow;

                _context.Users.Update(user);
                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }
    }
}
