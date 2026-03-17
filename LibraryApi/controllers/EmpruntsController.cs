using LibraryApi.DTOs;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/emprunts")]
    public class EmpruntsController : ControllerBase
    {
        private readonly EmpruntService _service;

        public EmpruntsController(EmpruntService service)
        {
            _service = service;
        }

        // GET: api/emprunts
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var emprunts = await _service.GetAllEmprunts();
            return Ok(emprunts);
        }

        // POST: api/emprunts
        [HttpPost]
        public async Task<IActionResult> Post(EmpruntDto dto)
        {
            try
            {
                var emprunt = await _service.CreateEmprunt(dto);
                return Ok(new { message = "Emprunt ajouté !", emprunt });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/emprunts/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteEmprunt(id);

            if (!success)
                return NotFound(new { message = "Emprunt non trouvé." });

            return Ok(new { message = "Emprunt supprimé / livre retourné !" });
        }
    }
}