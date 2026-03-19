using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _service;

        public DashboardController(DashboardService service)
        {
            _service = service;
        }

        // [HttpGet]
        // public IActionResult GetDashboard()
        // {
        //     var data = _service.GetDashboardData();
        //     return Ok(data);
        // }
    }
}