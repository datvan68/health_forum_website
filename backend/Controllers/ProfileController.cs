using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProfile(int id)
    {
        var profile = await _profileService.GetProfileByIdAsync(id);
        if (profile == null)
            return NotFound(new { error = "Hồ sơ không tồn tại" });

        return Ok(profile);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfile(int id, [FromBody] ProfileUpdateRequest model)
    {
        var result = await _profileService.UpdateProfileAsync(id, model);
        if (!result)
            return BadRequest(new { error = "Không thể cập nhật hồ sơ" });

        return Ok(new { message = "Cập nhật hồ sơ thành công!" });
    }
}
