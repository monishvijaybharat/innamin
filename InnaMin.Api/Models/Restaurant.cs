namespace InnaMin.Api.Models;

public class Restaurant
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Cuisine { get; set; } = "";
    public string Description { get; set; } = "";
    public double Rating { get; set; }
    public decimal DeliveryFee { get; set; }
    public decimal MinimumOrder { get; set; }
    public int DeliveryMinutes { get; set; }

    public int AreaId { get; set; }
    public Area? Area { get; set; }
    public List<MenuItem> MenuItems { get; set; } = new();
}