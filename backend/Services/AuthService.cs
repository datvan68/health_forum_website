using backend.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginViewModel model);
    Task<bool> RegisterAsync(RegisterViewModel model);
}

public class MockUserEntry
{
    public UserProfile Profile { get; set; } = new();
    public string PasswordHash { get; set; } = string.Empty;
}

public class AuthService : IAuthService
{
    private static readonly List<MockUserEntry> _mockUsers = new()
    {
        new MockUserEntry 
        { 
            Profile = new UserProfile { Id = "1", Username = "admin", Email = "admin@clinic.com" },
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
        }
    };

    private readonly string _jwtKey = "SuperSecretKeyForHealthForumWebsite2026!";

    public async Task<LoginResponse?> LoginAsync(LoginViewModel model)
    {
        var userEntry = _mockUsers.FirstOrDefault(u => 
            (u.Profile.Username == model.Username || u.Profile.Email == model.Username));

        if (userEntry != null && BCrypt.Net.BCrypt.Verify(model.Password, userEntry.PasswordHash))
        {
            return new LoginResponse
            {
                AccessToken = GenerateJwtToken(userEntry.Profile),
                RefreshToken = "mock.refresh.token.for.now",
                User = userEntry.Profile
            };
        }

        return null;
    }

    public async Task<bool> RegisterAsync(RegisterViewModel model)
    {
        if (model.Password != model.ConfirmPassword) return false;
        if (_mockUsers.Any(u => u.Profile.Email == model.Email)) return false;

        var newUser = new UserProfile
        {
            Id = Guid.NewGuid().ToString(),
            Username = model.FullName,
            Email = model.Email
        };

        _mockUsers.Add(new MockUserEntry
        {
            Profile = newUser,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password)
        });
        
        return true;
    }

    private string GenerateJwtToken(UserProfile user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtKey);
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(24),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
