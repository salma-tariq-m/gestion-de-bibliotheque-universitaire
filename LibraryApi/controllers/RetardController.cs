using LibraryApi.DTOs;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/retards")]
    public class RetardController : ControllerBase
    {
        private readonly RetardService _service;

        public RetardController(RetardService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetRetards()
        {
            var data = await _service.GetRetards();
            return Ok(data);
        }
    }
}