using AngularApp1.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AngularApp1.Server.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        private readonly IPositionsService _positionService;

        public PositionsController(IPositionsService positionService)
        {
            _positionService = positionService;
        }

        [HttpGet]
        public async Task<IEnumerable<Position>> Get()
        {
            return await _positionService.GetPositionsList();
        }
    }
}
