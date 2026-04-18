using backend.Models;
using backend.Repositories;
using backend.DTOs;

namespace backend.Services;

public interface IPostService
{
    Task<PaginatedResponse<PostDto>> GetPostsAsync(int page, int pageSize, string sort, string? category = null);
}

public sealed class PostService : IPostService
{
    private readonly IPostRepository _repository;

    public PostService(IPostRepository repository)
    {
        _repository = repository;
    }

    public async Task<PaginatedResponse<PostDto>> GetPostsAsync(int page, int pageSize, string sort, string? category = null)
    {
        var (items, total) = sort == "popular" 
            ? await _repository.GetPopularAsync(page, pageSize, category)
            : await _repository.GetLatestAsync(page, pageSize, category);

        var dtos = items.Select(p => new PostDto(
            p.Id, p.Title, p.Content, p.VoteCount, p.CommentCount, p.IsVerified,
            p.Author?.FullName ?? "Unknown", p.Author?.Title ?? "", p.Author?.Specialty ?? "",
            p.Author?.AvatarUrl, p.CreatedAt
        ));

        var totalPages = (int)Math.Ceiling(total / (double)pageSize);

        return new PaginatedResponse<PostDto>(
            dtos,
            new MetaData(page, pageSize, total, totalPages)
        );
    }
}
