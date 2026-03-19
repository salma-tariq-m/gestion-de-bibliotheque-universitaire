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

    // GET
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var data = await _service.GetAllEmprunts();
        return Ok(data);
    }

    // POST
    [HttpPost]
    public async Task<IActionResult> Post(CreateEmpruntDto dto)
    {
        var result = await _service.CreateEmprunt(dto);

        if (result != "Emprunt créé avec succès")
            return BadRequest(new { message = result });

        return Ok(new { message = result });
    }

    // PUT → retourner livre
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Retourner(int id)
    {
        var success = await _service.RetournerEmprunt(id);

        if (!success)
            return NotFound(new { message = "Emprunt non trouvé" });

        return Ok(new { message = "Livre retourné avec succès" });
    }

    // DELETE
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteEmprunt(id);

        if (!success)
            return NotFound(new { message = "Emprunt non trouvé" });

        return Ok(new { message = "Supprimé avec succès" });
    }
}
}