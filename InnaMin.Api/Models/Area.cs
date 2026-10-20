namespace InnaMin.Api.Models;

public class Area
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<Restaurant> Restaurants { get; set; } = new();
}