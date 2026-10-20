namespace InnaMin.Api.Models;

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTimeOffset PlacedAt { get; set; }
    public string CustomerName { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Address { get; set; } = "";
    public string? Notes { get; set; }
    public decimal Subtotal { get; set; }
    public decimal DeliveryFee { get; set; }
    public decimal Total { get; set; }

    public int RestaurantId { get; set; }
    public Restaurant? Restaurant { get; set; }
    public List<OrderItem> Items { get; set; } = new();
}