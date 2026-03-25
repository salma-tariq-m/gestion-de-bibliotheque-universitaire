using LibraryApi.DTOs;
using LibraryApi.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/emprunt")]
public class EmpruntController : ControllerBase
{
    private readonly EmpruntService _service;

    public EmpruntController(EmpruntService service)
    {
        _service = service;
    }

    // POST : créer un emprunt
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEmpruntDto dto)
    {
        var result = await _service.CreateEmpruntAsync(dto);
        if (result == null)
            return BadRequest("Étudiant ou Livre introuvable.");

        return Ok(result);
    }
}