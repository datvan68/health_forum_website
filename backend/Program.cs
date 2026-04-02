using backend.Helpers;
using backend.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:8080", "https://localhost:8443");

builder.Services.AddProjectServices();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseMiddleware<RequestLoggingMiddleware>();

app.UseCors("frontend");
app.MapControllers();

app.Run();
