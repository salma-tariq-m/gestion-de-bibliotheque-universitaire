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

        // ===========================
        // Tous les emprunts
        // ===========================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var emprunts = await _service.GetAllEmpruntsAsync();
            return Ok(emprunts);
        }

        // ===========================
        // Créer un emprunt
        // ===========================
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEmpruntDto dto)
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

        // ===========================
        // Retourner un livre
        // ===========================
        [HttpPut("retourner/{id}")]
        public async Task<IActionResult> Retourner(
            int id,
            [FromBody] RetourEmpruntDto dto)
        {
            try
            {
                var emprunt = await _service.RetournerEmpruntAsync(
                    id,
                    dto.EtatAuRetour);

                return Ok(emprunt);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ===========================
        // Annuler un emprunt
        // ===========================
        [HttpDelete("annuler/{id}")]
        public async Task<IActionResult> Annuler(int id)
        {
            try
            {
                await _service.AnnulerEmpruntAsync(id);

                return Ok(new
                {
                    message = "Emprunt annulé avec succès."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ===========================
        // Liste des retards
        // ===========================
        [HttpGet("retards")]
        public async Task<IActionResult> GetRetards()
        {
            var result = await _service.GetRetardsAsync();
            return Ok(result);
        }
    }
}