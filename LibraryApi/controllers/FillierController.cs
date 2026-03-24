using LibraryApi.Models;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/fillier")] 
    public class FilliersController : ControllerBase
    {
        private readonly FillierService _service;

        public FilliersController(FillierService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Fillier>>> GetAll()
        {
            var filliers = await _service.GetAllFilliersAsync();

            if (filliers == null || filliers.Count == 0)
                return NotFound("Aucune fillière trouvée");

            return Ok(filliers);
        }
    }
}