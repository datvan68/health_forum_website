namespace backend.DTOs;

public sealed class ApiResponse<T>
{
    public bool Succeeded { get; init; }

    public string Message { get; init; } = string.Empty;

    public T? Data { get; init; }

    public static ApiResponse<T> Success(T data, string message = "Request succeeded.")
    {
        return new ApiResponse<T>
        {
            Succeeded = true,
            Message = message,
            Data = data
        };
    }
}
