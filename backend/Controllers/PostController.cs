using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("v1/posts")]
public sealed class PostController : ControllerBase
{
    private readonly IPostService _service;

    public PostController(IPostService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 20, [FromQuery] string sort = "newest", [FromQuery] string? category = null)
    {
        var response = await _service.GetPostsAsync(page, pageSize, sort, category);
        return Ok(response);
    }
}
