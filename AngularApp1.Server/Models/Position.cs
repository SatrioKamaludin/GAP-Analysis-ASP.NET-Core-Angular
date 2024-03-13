using System;
using System.Collections.Generic;

namespace AngularApp1.Server.Models;

public partial class Position
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? DisplayOrder { get; set; }

    public virtual ICollection<Player> Players { get; set; } = new List<Player>();
}
