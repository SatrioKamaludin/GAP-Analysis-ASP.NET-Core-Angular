using AngularApp1.Server.Models;
using AngularApp1.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayersService _playerService;

        public PlayersController(IPlayersService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Player>> Get()
        {
            return await _playerService.GetPlayersList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> Get(int id)
        {
            var player = await _playerService.GetPlayerById(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        [HttpPost]
        public async Task<ActionResult<Player>> Post(Player player)
        {
            await _playerService.CreatePlayer(player);

            return CreatedAtAction("Post", new { id = player.Id }, player);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest("Not a valid player id");
            }

            await _playerService.UpdatePlayer(player);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid player id");

            var player = await _playerService.GetPlayerById(id);
            if (player == null)
            {
                return NotFound();
            }

            await _playerService.DeletePlayer(player);

            return NoContent();
        }
    }
}
