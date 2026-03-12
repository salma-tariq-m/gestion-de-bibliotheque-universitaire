using Microsoft.AspNetCore.Mvc;
using LibraryApi.DTOs;
using LibraryApi.Services;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _service;
        public AuthController(UserService service)
        {
            _service = service;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
        var user = await _service.LoginAsync(dto.Email, dto.Password);
            if (user == null)
                return Unauthorized(new { message = "Email ou mot de passe incorrect" });

            return Ok(new { message = "Connexion réussie", email = user.Email, role = user.Role });
        }
    }
}