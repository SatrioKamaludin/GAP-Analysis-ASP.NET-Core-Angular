using AngularApp1.Server.Models;

namespace AngularApp1.Server.Services
{
    public interface IPositionsService
    {
        Task<IEnumerable<Position>> GetPositionsList();
    }
}
