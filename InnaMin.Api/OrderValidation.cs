using System.Text.RegularExpressions;

public static class OrderValidation
{
    private static readonly Regex PhoneChars = new(@"^[\d\s().+-]+$");

    private static readonly Regex Address = new(
        @"^(?<street>\d+[A-Za-z]?\s+.*[A-Za-z]{2}.*),\s*(?<city>[A-Za-z][A-Za-z .'-]{1,39}),\s*MD\s+(?<zip>\d{5})$");

    // The areas we deliver to, and the ZIP codes that belong to each one.
    private static readonly Dictionary<string, string[]> ServiceAreas =
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["College Park"] = new[] { "20740", "20741", "20742" },
            ["Hyattsville"] = new[] { "20781", "20782", "20783", "20784", "20785" },
            ["Greenbelt"] = new[] { "20768", "20770", "20771" },
            ["Riverdale Park"] = new[] { "20737" },
            ["Takoma Park"] = new[] { "20912" },
        };

    // Returns an error message, or null when the phone number is fine.
    public static string? CheckPhone(string? phone)
    {
        if (string.IsNullOrWhiteSpace(phone) || !PhoneChars.IsMatch(phone))
            return "Enter a valid US phone number.";

        var digits = new string(phone.Where(char.IsDigit).ToArray());
        if (digits.Length == 11 && digits[0] == '1') digits = digits[1..];

        if (digits.Length != 10 || digits[0] < '2' || digits[3] < '2')
            return "Enter a valid 10-digit US phone number.";

        return null;
    }

    // Returns an error message, or null when the address is fine.
    public static string? CheckAddress(string? address)
    {
        if (string.IsNullOrWhiteSpace(address))
            return "Enter your delivery address.";

        var match = Address.Match(address.Trim());
        if (!match.Success)
            return "Enter the address as: street, city, MD ZIP.";

        var city = match.Groups["city"].Value;
        var zip = match.Groups["zip"].Value;

        if (!ServiceAreas.TryGetValue(city, out var zips))
            return "We only deliver to College Park, Hyattsville, Greenbelt, Riverdale Park and Takoma Park.";

        if (!zips.Contains(zip))
            return $"{zip} is not a ZIP code in {city}. Use {string.Join(", ", zips)}.";

        return null;
    }
}