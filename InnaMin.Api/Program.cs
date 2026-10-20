using InnaMin.Api.Data;
using Microsoft.EntityFrameworkCore;
using InnaMin.Api.Models;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=innamin.db"));
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();
app.UseCors();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    DbSeeder.Seed(db);
}

app.MapGet("/areas", async (AppDbContext db) =>
    await db.Areas
        .OrderBy(a => a.Name)
        .Select(a => new { a.Id, a.Name, RestaurantCount = a.Restaurants.Count })
        .ToListAsync());

app.MapGet("/areas/{areaId:int}/restaurants", async (int areaId, string? cuisine, AppDbContext db) =>
{
    var area = await db.Areas
        .Where(a => a.Id == areaId)
        .Select(a => new { a.Id, a.Name })
        .FirstOrDefaultAsync();

    if (area is null)
        return Results.NotFound(new { message = $"No area with id {areaId}." });

    var query = db.Restaurants.Where(r => r.AreaId == areaId);

    if (!string.IsNullOrWhiteSpace(cuisine))
        query = query.Where(r => r.Cuisine == cuisine);

    var restaurants = await query
        .OrderByDescending(r => r.Rating)
        .Select(r => new
        {
            r.Id, r.Name, r.Cuisine, r.Description, r.Rating,
            r.DeliveryFee, r.MinimumOrder, r.DeliveryMinutes
        })
        .ToListAsync();

    return Results.Ok(new { area, restaurants });
});

app.MapGet("/restaurants/{id:int}", async (int id, AppDbContext db) =>
{
    var restaurant = await db.Restaurants
        .Where(r => r.Id == id)
        .Select(r => new
        {
            r.Id, r.Name, r.Cuisine, r.Description, r.Rating,
            r.DeliveryFee, r.MinimumOrder, r.DeliveryMinutes,
            AreaId = r.AreaId,
            Area = r.Area!.Name,
            MenuItems = r.MenuItems
                .OrderBy(m => m.Id)
                .Select(m => new { m.Id, m.Name, m.Description, m.Category, m.Price, m.IsVegetarian })
        })
        .FirstOrDefaultAsync();

    return restaurant is null
        ? Results.NotFound(new { message = $"No restaurant with id {id}." })
        : Results.Ok(restaurant);
});
app.MapPost("/orders", async (OrderRequest request, AppDbContext db) =>
{
    var errors = new Dictionary<string, string[]>();

    var name = request.CustomerName?.Trim() ?? "";
    var phone = request.Phone?.Trim() ?? "";
    var address = request.Address?.Trim() ?? "";
    var notes = request.Notes?.Trim();

    if (name.Length is < 2 or > 80)
        errors["customerName"] = ["Enter your name (2 to 80 characters)."];
        var phoneError = phone.Length > 20
        ? "Phone number is too long."
        : OrderValidation.CheckPhone(phone);
    if (phoneError is not null)
        errors["phone"] = [phoneError];

    var addressError = address.Length > 200
        ? "Address is too long."
        : OrderValidation.CheckAddress(address);
    if (addressError is not null)
        errors["address"] = [addressError];
    if (notes is { Length: > 300 })
        errors["notes"] = ["Delivery notes can be up to 300 characters."];

    var lines = (request.Items ?? new List<OrderLineRequest>())
        .GroupBy(i => i.MenuItemId)
        .Select(g => new { MenuItemId = g.Key, Quantity = g.Sum(i => i.Quantity) })
        .ToList();

    if (lines.Count == 0)
        errors["items"] = ["Your order has no items."];
    else if (lines.Any(l => l.Quantity is < 1 or > 20))
        errors["items"] = ["Each dish can be ordered 1 to 20 times."];

    var restaurant = await db.Restaurants.FirstOrDefaultAsync(r => r.Id == request.RestaurantId);
    if (restaurant is null)
        errors["restaurantId"] = ["That restaurant doesn't exist."];

    if (errors.Count > 0)
        return Results.ValidationProblem(errors);

    var restaurantId = restaurant!.Id;
    var menuItemIds = lines.Select(l => l.MenuItemId).ToList();
    var menuItems = await db.MenuItems
        .Where(m => m.RestaurantId == restaurantId && menuItemIds.Contains(m.Id))
        .ToListAsync();

    if (menuItems.Count != lines.Count)
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["items"] = ["Some dishes in your cart are no longer on this menu."]
        });
    }

    var orderItems = lines.Select(line =>
    {
        var menuItem = menuItems.First(m => m.Id == line.MenuItemId);
        return new OrderItem
        {
            MenuItemId = menuItem.Id,
            Name = menuItem.Name,
            UnitPrice = menuItem.Price,
            Quantity = line.Quantity,
        };
    }).ToList();

    var subtotal = orderItems.Sum(i => i.UnitPrice * i.Quantity);

    if (subtotal < restaurant.MinimumOrder)
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["items"] = ["Your order is below this restaurant's minimum order."]
        });
    }

    var order = new Order
    {
        RestaurantId = restaurant.Id,
        CustomerName = name,
        Phone = phone,
        Address = address,
        Notes = string.IsNullOrWhiteSpace(notes) ? null : notes,
        Subtotal = subtotal,
        DeliveryFee = restaurant.DeliveryFee,
        Total = subtotal + restaurant.DeliveryFee,
        PlacedAt = DateTimeOffset.UtcNow,
        Items = orderItems,
    };

    db.Orders.Add(order);
    await db.SaveChangesAsync();

    return Results.Created($"/orders/{order.Id}", new { order.Id });
});

app.MapGet("/orders/{id:guid}", async (Guid id, AppDbContext db) =>
{
    var order = await db.Orders
        .Where(o => o.Id == id)
        .Select(o => new
        {
            o.Id, o.PlacedAt, o.CustomerName, o.Phone, o.Address, o.Notes,
            o.Subtotal, o.DeliveryFee, o.Total,
            o.RestaurantId,
            Restaurant = o.Restaurant!.Name,
            Items = o.Items
                .OrderBy(i => i.Id)
                .Select(i => new { i.Name, i.UnitPrice, i.Quantity })
        })
        .FirstOrDefaultAsync();

    if (order is null)
        return Results.NotFound(new { message = "Order not found." });

    var elapsed = DateTimeOffset.UtcNow - order.PlacedAt;

    return Results.Ok(new
    {
        order.Id, order.PlacedAt, order.CustomerName, order.Phone, order.Address, order.Notes,
        order.Subtotal, order.DeliveryFee, order.Total,
        order.RestaurantId, order.Restaurant, order.Items,
        Status = OrderStatus.From(elapsed),
        ElapsedSeconds = (int)elapsed.TotalSeconds,
    });
});
app.Run();