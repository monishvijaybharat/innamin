public static class OrderStatus
{
    // How long the order has existed decides which stage it is in.
    public static string From(TimeSpan elapsed) => elapsed.TotalSeconds switch
    {
        < 30 => "received",
        < 120 => "preparing",
        < 240 => "out_for_delivery",
        _ => "delivered",
    };
}