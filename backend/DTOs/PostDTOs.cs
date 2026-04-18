namespace backend.DTOs;

public record PostDto(
    int Id,
    string Title,
    string Content,
    int VoteCount,
    int CommentCount,
    bool IsVerified,
    string AuthorName,
    string AuthorTitle,
    string AuthorSpecialty,
    string? AuthorAvatarUrl,
    DateTime CreatedAt
);

public record PaginatedResponse<T>(
    IEnumerable<T> Data,
    MetaData Meta
);

public record MetaData(
    int Page,
    int PageSize,
    int Total,
    int TotalPages
);
