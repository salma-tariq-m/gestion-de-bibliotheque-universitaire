using LibraryApi.DTOs;
using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/etudiants")]
    public class EtudiantsController : ControllerBase
    {
        private readonly EtudiantService _service;

        public EtudiantsController(EtudiantService service)
        {
            _service = service;
        }

        // GET: api/etudiants
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var students = await _service.GetAllStudents();
            return Ok(students);
        }

        // POST: api/etudiants
        [HttpPost]
        public async Task<IActionResult> Post(EtudiantDto dto)
        {
            await _service.CreateStudent(dto);
            return Ok(new { message = "Étudiant ajouté !" });
        }

        // DELETE: api/etudiants/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteStudent(id);

            if (!success)
                return NotFound(new { message = "Étudiant non trouvé." });

            return Ok(new { message = "Étudiant supprimé avec succès !" });
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] EtudiantDto dto)
        {
            if (dto == null)
                return BadRequest("Données invalides");

            var etudiant = await _service.UpdateStudent(id, dto);

            if (etudiant == null)
                return NotFound(new { message = "Étudiant non trouvé" });

            return Ok(new { message = "Étudiant modifié avec succès" });
        }
    }
}