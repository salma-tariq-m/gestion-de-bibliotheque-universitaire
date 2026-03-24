using LibraryApi.DTOs;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/livres")]
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
            var books = await _service.GetAllBooks();
            return Ok(books);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BookDto dto)
        {
            if (dto == null) return BadRequest("Données invalides");

            await _service.CreateBook(dto);
            return Ok(new { message = "Livre ajouté avec succès !" });
        }
        [HttpPut("{id_livre:int}")]
        public async Task<IActionResult> UpdateBook(int id_livre, [FromBody] BookDto dto)
        {
            if (dto == null) return BadRequest("Données invalides");

            var success = await _service.UpdateBook(id_livre, dto);
            if (!success) return NotFound(new { message = "Livre non trouvé" });

            return Ok(new { message = "Livre modifié avec succès" });
        }

        [HttpDelete("{id_livre:int}")]
        public async Task<IActionResult> DeleteBook(int id_livre)
        {
            var success = await _service.DeleteBook(id_livre);
            if (!success) return NotFound(new { message = "Livre non trouvé" });

            return Ok(new { message = "Livre supprimé avec succès" });
        }
    }
}