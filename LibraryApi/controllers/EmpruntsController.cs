using LibraryApi.DTOs;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/emprunt")]
    public class EmpruntController : ControllerBase
    {
        private readonly EmpruntService _service;

        public EmpruntController(EmpruntService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var emprunts = await _service.GetAllEmpruntsAsync();
            return Ok(emprunts);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmpruntDto dto)
        {
            try
            {
                var emprunt = await _service.CreateEmpruntAsync(dto);
                return Ok(emprunt);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("retourner/{id}")]
        public async Task<IActionResult> Retourner(int id)
        {
            try
            {
                var emprunt = await _service.RetournerEmpruntAsync(id);
                return Ok(emprunt);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("annuler/{id}")]
        public async Task<IActionResult> Annuler(int id)
        {
            try
            {
                await _service.AnnulerEmpruntAsync(id);
                return Ok(new { message = "Emprunt annulé" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}