using LibraryApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Ajouter DbContext SQLite
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=library.db"));

// Ajouter Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Library API", Version = "v1" });
});

var app = builder.Build();

// Middleware Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Library API V1");
    c.RoutePrefix = string.Empty; // Swagger à la racine
});

// Endpoints CRUD minimal
app.MapGet("/", () => "Library API is running!");

// Récupérer tous les livres
app.MapGet("/books", async (LibraryContext db) =>
    await db.Books.ToListAsync());

// Ajouter un livre
app.MapPost("/books", async (LibraryContext db, Book book) =>
{
    db.Books.Add(book);
    await db.SaveChangesAsync();
    return Results.Created($"/books/{book.Id}", book);
});

// Mettre à jour un livre
app.MapPut("/books/{id}", async (LibraryContext db, int id, Book updatedBook) =>
{
    var book = await db.Books.FindAsync(id);
    if (book == null) return Results.NotFound();

    book.Title = updatedBook.Title;
    book.Author = updatedBook.Author;
    book.Year = updatedBook.Year;

    await db.SaveChangesAsync();
    return Results.Ok(book);
});

// Supprimer un livre
app.MapDelete("/books/{id}", async (LibraryContext db, int id) =>
{
    var book = await db.Books.FindAsync(id);
    if (book == null) return Results.NotFound();

    db.Books.Remove(book);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();