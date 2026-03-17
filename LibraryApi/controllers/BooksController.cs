using LibraryApi.DTOs;
using LibraryApi.Services;
using LibraryApi.Models; // Assure-toi d'importer tes modèles
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/books")] // Changement de 'livres' à 'books' pour être cohérent
    public class BooksController : ControllerBase
    {
        private readonly BookService _service;

        public BooksController(BookService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get() 
        {
            // Le service utilise maintenant .Include(b => b.Categorie)
            var books = await _service.GetAllBooks();
            return Ok(books);
        }

        [HttpPost]
        public async Task<IActionResult> Post(BookDto dto)
        {
            if (dto == null) return BadRequest();

            await _service.CreateBook(dto);
            return Ok(new { message = "Livre ajouté avec succès !" });
        }

        [HttpDelete("{id_livre:int}")]
        public async Task<IActionResult> DeleteBook(int id_livre)
        {
            // Debug console pour ton stage
            Console.WriteLine($"Tentative de suppression du livre ID : {id_livre}");
            
            var success = await _service.DeleteBook(id_livre);

            if (!success) 
                return NotFound(new { message = "Livre non trouvé dans la base de données." });
                
            return Ok(new { message = "Livre supprimé avec succès !" });
        }
    }
}