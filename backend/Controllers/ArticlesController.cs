using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Text.Json;
using System.Text.Json.Nodes;
using backend.Data;
using backend.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ArticlesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetArticles([FromQuery] int? authorId)
    {
        var query = _context.Articles.AsQueryable();

        if (authorId.HasValue)
        {
            query = query.Where(a => a.AuthorId == authorId.Value);
        }

        var articles = await query
            .Include(a => a.Author)
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new
            {
                id = a.Slug,
                slug = a.Slug,
                title = a.Title,
                category = a.Category,
                date = a.CreatedAt.ToString("dd MMM, yyyy"),
                snippet = a.Snippet,
                featuredImage = a.FeaturedImage,
                author = a.Author != null ? new
                {
                    name = a.Author.FullName,
                    avatar = a.Author.AvatarUrl,
                    role = a.Author.Title,
                    bio = a.Author.Bio
                } : null,
                stats = new
                {
                    views = a.ViewsCount,
                    likes = a.LikesCount,
                    comments = a.CommentsCount,
                    saves = a.SavesCount
                }
            })
            .ToListAsync();

        return Ok(articles);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetArticleDetail(string slug)
    {
        var article = await _context.Articles
            .Include(a => a.Author)
            .Include(a => a.Comments)
                .ThenInclude(c => c.Author)
            .FirstOrDefaultAsync(a => a.Slug == slug);

        if (article == null)
            return NotFound(new { error = "Article not found" });

        var articleDto = new
        {
            article = new
            {
                id = article.Slug,
                slug = article.Slug,
                title = article.Title,
                lastUpdated = article.UpdatedAt?.ToString("dd MMM, yyyy") ?? article.CreatedAt.ToString("dd MMM, yyyy"),
                views = article.ViewsCount,
                saves = article.SavesCount,
                category = article.Category,
                featuredImage = article.FeaturedImage,
                author = article.Author != null ? new
                {
                    name = article.Author.FullName,
                    role = article.Author.Title,
                    bio = article.Author.Bio,
                    avatar = article.Author.AvatarUrl
                } : null,
                content = new
                {
                    summary = article.ContentSummary,
                    methodology = new
                    {
                        title = article.MethodologyTitle,
                        conclusion = article.MethodologyConclusion,
                        points = string.IsNullOrEmpty(article.MethodologyPointsJson) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(article.MethodologyPointsJson)
                    }
                },
                relatedTopics = string.IsNullOrEmpty(article.RelatedTopicsJson) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(article.RelatedTopicsJson),
                relatedArticles = new List<object>(), // For MVP, keeping this empty array as relational fetching gets complex
                stats = new
                {
                    likes = article.LikesCount,
                    comments = article.CommentsCount
                }
            },
            comments = article.Comments
                .OrderByDescending(c => c.CreatedAt)
                .Take(5)
                .Select(c => new
                {
                    id = c.Id,
                    content = c.Content,
                    time = c.CreatedAt.ToString("dd MMM, yyyy"),
                    likes = c.LikesCount,
                    author = c.Author != null ? new
                    {
                        name = c.Author.FullName,
                        avatar = c.Author.AvatarUrl,
                        title = c.Author.Title,
                        roleBadge = "CHUYÊN GIA"
                    } : null
                })
        };

        return Ok(articleDto);
    }

    [HttpPost("{slug}/comments")]
    public async Task<IActionResult> PostComment(string slug, [FromBody] JsonObject payload)
    {
        try
        {
            var content = payload["content"]?.ToString();
            if (string.IsNullOrEmpty(content)) return BadRequest("Nội dung bình luận không được để trống");

            var article = await _context.Articles.FirstOrDefaultAsync(a => a.Slug == slug);
            if (article == null) return NotFound(new { error = "Không tìm thấy bài viết" });

            // Get author from request (logged-in user)
            var authorIdStr = payload["authorId"]?.ToString();
            User? author = null;

            if (!string.IsNullOrEmpty(authorIdStr) && int.TryParse(authorIdStr, out int authorId))
            {
                author = await _context.Users.FindAsync(authorId);
            }

            // Fallback if no valid user provided
            if (author == null)
            {
                author = await _context.Users.FirstOrDefaultAsync();
            }

            if (author == null) return BadRequest(new { error = "Không tìm thấy người dùng" });

            var comment = new ArticleComment
            {
                ArticleId = article.Id,
                AuthorId = author.Id,
                Content = content,
                LikesCount = 0,
                CreatedAt = DateTime.UtcNow
            };

            _context.ArticleComments.Add(comment);
            
            // Update counts
            article.CommentsCount += 1;
            
            await _context.SaveChangesAsync();

            // Return formatted comment for frontend
            var response = new
            {
                id = comment.Id,
                content = comment.Content,
                time = comment.CreatedAt.ToString("dd MMM, yyyy"),
                likes = comment.LikesCount,
                author = new
                {
                    name = author.FullName,
                    avatar = author.AvatarUrl,
                    title = author.Title,
                    roleBadge = "THÀNH VIÊN"
                }
            };

            return CreatedAtAction(nameof(GetArticleDetail), new { slug = article.Slug }, response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpDelete("slug/{slug}")]
    public async Task<IActionResult> DeleteArticleBySlug(string slug)
    {
        var article = await _context.Articles.FirstOrDefaultAsync(a => a.Slug == slug);
        if (article == null) return NotFound();

        _context.Articles.Remove(article);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{slug}")]
    public async Task<IActionResult> UpdateArticle(string slug, [FromBody] Article update)
    {
        var article = await _context.Articles.FirstOrDefaultAsync(a => a.Slug == slug);
        if (article == null) return NotFound();

        // Update fields
        article.Title = update.Title;
        article.Category = update.Category;
        article.Snippet = update.Snippet;
        article.FeaturedImage = update.FeaturedImage;
        article.ContentSummary = update.ContentSummary;
        article.MethodologyTitle = update.MethodologyTitle;
        article.MethodologyConclusion = update.MethodologyConclusion;
        article.MethodologyPointsJson = update.MethodologyPointsJson;
        article.RelatedTopicsJson = update.RelatedTopicsJson;
        article.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Article updated successfully", slug = article.Slug });
    }

    [HttpPost]
    public async Task<IActionResult> CreateArticle([FromBody] Article article)
    {
        try 
        {
            if (article == null) return BadRequest("Invalid payload");
            
            // Rate limiting: Limit users to 5 articles per day
            var recentArticlesCount = await _context.Articles
                .Where(a => a.AuthorId == article.AuthorId && a.CreatedAt >= DateTime.UtcNow.AddDays(-1))
                .CountAsync();

            if (recentArticlesCount >= 5)
            {
                return BadRequest("Bạn đã đạt giới hạn đăng 5 bài viết trong 24 giờ. Vui lòng quay lại sau.");
            }

            // Verify User existence
            var user = await _context.Users.FindAsync(article.AuthorId);
            if (user == null)
            {
                var fallbackUser = await _context.Users.FirstOrDefaultAsync();
                if (fallbackUser != null)
                {
                    article.AuthorId = fallbackUser.Id;
                }
                else
                {
                    return BadRequest(new { error = "Hệ thống chưa có người dùng nào để gán bản quyền bài viết!" });
                }
            }

            article.CreatedAt = DateTime.UtcNow;
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetArticleDetail), new { slug = article.Slug }, new { message = "Article Created Successfully", id = article.Id, slug = article.Slug });
        }
        catch (Exception ex)
        {
            // Dump error to client to debug failed to fetch / 500 error
            return StatusCode(500, new { error = ex.Message, details = ex.ToString() });
        }
    }

    [HttpPost("seed")]
    public async Task<IActionResult> SeedMockData()
    {
        if (await _context.Articles.AnyAsync())
        {
            return BadRequest(new { error = "Database already contains articles. Migration skipped." });
        }

        // 1. Ensure an author exists as fallback author
        var author = await _context.Users.FirstOrDefaultAsync();
        if (author == null)
        {
            author = new User 
            { 
                Username = "drelias",
                Email = "drelias@example.com",
                PasswordHash = "hashed_dummy",
                FullName = "Dr. Elias Aris", 
                Title = "TRƯỞNG KHOA NỘI TIẾT",
                Bio = "Chuyên gia nội tiết với hơn 15 năm kinh nghiệm",
                AvatarUrl = "https://randomuser.me/api/portraits/men/32.jpg"
            };
            _context.Users.Add(author);
            await _context.SaveChangesAsync();
        }

        var currentDir = Directory.GetCurrentDirectory();
        var mockFilePath = Path.GetFullPath(Path.Combine(currentDir, "..", "frontend", "mock-data", "articles.json"));
        
        if (!System.IO.File.Exists(mockFilePath))
            return NotFound(new { error = "Mock file not found" });

        var jsonString = await System.IO.File.ReadAllTextAsync(mockFilePath);
        var jsonNode = JsonSerializer.Deserialize<JsonObject>(jsonString);
        
        if (jsonNode == null) return BadRequest("Invalid JSON");

        // Insert full article model
        if (jsonNode.TryGetPropertyValue("article", out var articleDetailObj))
        {
            var contentObj = articleDetailObj?["content"];
            var methObj = contentObj?["methodology"];
            
            var a = new Article
            {
                Slug = articleDetailObj?["id"]?.ToString() ?? "metabolic-flexibility",
                Title = articleDetailObj?["title"]?.ToString() ?? "Sample Title",
                Category = articleDetailObj?["category"]?.ToString() ?? "Nghiên cứu",
                Snippet = "Nghiên cứu hiện tại cho thấy khả năng cơ thể chuyển đổi giữa các nguồn nhiên liệu...",
                FeaturedImage = articleDetailObj?["featuredImage"]?.ToString(),
                AuthorId = author.Id,
                ViewsCount = 1248,
                SavesCount = 84,
                LikesCount = 1248,
                CommentsCount = 84,
                ContentSummary = contentObj?["summary"]?.ToString() ?? "",
                MethodologyTitle = methObj?["title"]?.ToString() ?? "",
                MethodologyConclusion = methObj?["conclusion"]?.ToString() ?? "",
                MethodologyPointsJson = methObj?["points"]?.ToJsonString() ?? "[]",
                RelatedTopicsJson = articleDetailObj?["relatedTopics"]?.ToJsonString() ?? "[]"
            };
            
            _context.Articles.Add(a);
            await _context.SaveChangesAsync();

            // Insert mock comment
            if (jsonNode.TryGetPropertyValue("comments", out var commentsArray))
            {
                foreach(var comment in commentsArray!.AsArray())
                {
                    var ac = new ArticleComment
                    {
                        ArticleId = a.Id,
                        AuthorId = author.Id, // fallback
                        Content = comment?["content"]?.ToString() ?? "Great article!",
                        LikesCount = 12,
                        CreatedAt = DateTime.UtcNow.AddHours(-2)
                    };
                    _context.ArticleComments.Add(ac);
                }
                await _context.SaveChangesAsync();
            }
        }

        return Ok(new { message = "Mock data seeded to MySQL database successfully!" });
    }
}
