using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest model)
    {
        var result = await _authService.LoginAsync(model);
        if (result == null)
            return Unauthorized(new { error = "Tên đăng nhập hoặc mật khẩu không chính xác" });

        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest model)
    {
        var result = await _authService.RegisterAsync(model);
        if (!result)
            return BadRequest(new { error = "Đăng ký thất bại. Email có thể đã tồn tại hoặc mật khẩu không khớp." });

        return Ok(new { message = "Đăng ký thành công!" });
    }
}
