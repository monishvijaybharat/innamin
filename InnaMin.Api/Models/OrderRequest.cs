namespace InnaMin.Api.Models;

public record OrderLineRequest(int MenuItemId, int Quantity);

public record OrderRequest(
    int RestaurantId,
    string? CustomerName,
    string? Phone,
    string? Address,
    string? Notes,
    List<OrderLineRequest>? Items);