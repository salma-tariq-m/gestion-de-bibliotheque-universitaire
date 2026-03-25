// using Microsoft.AspNetCore.Mvc;
// using LibraryApi.Services; // IMPORTANT : Ajoutez cette ligne pour lier le service
// using LibraryApi.Models;   // IMPORTANT : Pour le type DashboardDto (si nécessaire)

// namespace LibraryApi.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class DashboardController : ControllerBase
//     {
//         private readonly IDashboardService _service;

//         // Le constructeur reçoit maintenant l'interface IDashboardService sans erreur
//         public DashboardController(IDashboardService service)
//         {
//             _service = service;
//         }

//         [HttpGet("stats")]
//         public async Task<IActionResult> GetStats()
//         {
//             var stats = await _service.GetDashboardStats();
//             return Ok(stats);
//         }
//     }
// }