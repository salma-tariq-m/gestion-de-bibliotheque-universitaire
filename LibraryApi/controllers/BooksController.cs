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
        public async Task<IActionResult> Get() => Ok(await _service.GetAllBooks());

        [HttpPost]
        public async Task<IActionResult> Post(BookDto dto)
        {
            await _service.CreateBook(dto);
            return Ok(new { message = "Livre ajouté !" });
        }

        [HttpDelete("{id_livre:int}")]
        public async Task<IActionResult> DeleteBook(int id_livre)
        {
            Console.WriteLine($"le contrôleur : {id_livre}");
            var success = await _service.DeleteBook(id_livre);

            if (!success) 
                return NotFound(new { message = "Livre non trouvé." });
                
            return Ok(new { message = "Livre supprimé avec succès !" });
        }
    }
}