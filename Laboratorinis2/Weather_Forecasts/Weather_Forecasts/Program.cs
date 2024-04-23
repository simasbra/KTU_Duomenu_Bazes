using Weather_Forecasts;
using Weather_Forecasts.Repositories;

var builder = WebApplication.CreateBuilder(args);

Config.CreateSingletonInstance(builder.Configuration);

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWebApp",
        policyBuilder => policyBuilder
            .WithOrigins("https://localhost:7022", "http://localhost:5273", "https://localhost:44446")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

builder.Services.AddScoped<CityRepository>();

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Enable CORS policy
app.UseCors("AllowWebApp");

// Authorization middleware
app.UseAuthorization();

// Map controller routes
app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();