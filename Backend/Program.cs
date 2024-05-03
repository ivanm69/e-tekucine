
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTekucineSwaggerGen();
builder.Services.AddTekucineCORS();


// Dodavanje baze podataka
builder.Services.AddDbContext<TekucineContext>(o => {
    o.UseSqlServer(builder.Configuration.GetConnectionString("TekucineContext"));
});

// SECURITY

// https://www.youtube.com/watch?v=mgeuh8k3I4g&ab_channel=NickChapsas
builder.Services.AddAuthentication(x => {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("moj tajni kljuc koji je najbolji kljuc na svijetu i najljepsi")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = false
    };
});

builder.Services.AddAuthorization();


// END SECURITY




var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI(o =>
{
    o.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
    o.EnableTryItOutByDefault();
});
//}

app.UseHttpsRedirection();

// SECURITY
app.UseAuthentication();
app.UseAuthorization();
// ENDSECURITY

app.MapControllers();

app.UseCors("CorsPolicy");

// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");
// završio za potrebe produkcije

app.Run();
