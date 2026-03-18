using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/categories")] // tu peux mettre pluriel si tu veux
    public class CategorieController : ControllerBase
    {
        private readonly CategorieService _service;

        public CategorieController(CategorieService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = await _service.GetAllCategories();
            return Ok(categories);
        }
    }
}