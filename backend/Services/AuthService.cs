using backend.DTOs;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest model);
    Task<bool> RegisterAsync(RegisterRequest model);
}

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly string _jwtKey = "SuperSecretKeyForHealthForumWebsite2026!";

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest model)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == model.Username || u.Email == model.Username);

        if (user != null && BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
        {
            return new LoginResponse
            {
                AccessToken = GenerateJwtToken(user),
                RefreshToken = Guid.NewGuid().ToString(), // Proper random refresh token
                User = MapToProfile(user)
            };
        }

        return null;
    }

    public async Task<bool> RegisterAsync(RegisterRequest model)
    {
        if (model.Password != model.ConfirmPassword) return false;
        
        // Already exists check
        if (await _context.Users.AnyAsync(u => u.Email == model.Email || u.Username == model.FullName)) 
            return false;

        var newUser = new User
        {
            Username = model.FullName, // Using FullName as Username for simplicity per existing logic
            Email = model.Email,
            FullName = model.FullName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        
        return true;
    }

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtKey);
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(24),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private UserProfile MapToProfile(User user)
    {
        return new UserProfile
        {
            Id = user.Id.ToString(),
            Username = user.Username,
            Email = user.Email,
            FullName = user.FullName,
            Title = user.Title ?? "",
            Bio = user.Bio ?? "",
            Location = user.Location ?? "",
            AvatarUrl = user.AvatarUrl ?? "",
            CoverImageUrl = user.CoverImageUrl ?? "",
            Specialty = user.Specialty ?? "",
            ResearchArea = user.ResearchArea ?? "",
            HighestDegree = user.HighestDegree ?? "",
            Organization = user.Organization ?? ""
        };
    }
}
