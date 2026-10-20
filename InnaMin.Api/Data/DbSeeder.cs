using InnaMin.Api.Models;

namespace InnaMin.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Areas.Any()) return;

        db.Areas.AddRange(
            new Area
            {
                Name = "College Park",
                Restaurants =
                {
                    new Restaurant
                    {
                        Name = "Saffron & Salt", Cuisine = "Indian", Rating = 4.7,
                        Description = "North Indian curries and tandoor breads, cooked to order.",
                        DeliveryFee = 2.99m, MinimumOrder = 15m, DeliveryMinutes = 30,
                        MenuItems =
                        {
                            Item("Samosa Chaat", "Starters", 6.50m, true, "Crisp samosas with chickpeas, yogurt and tamarind chutney"),
                            Item("Butter Chicken", "Mains", 15.50m, false, "Tandoori chicken in a creamy tomato sauce"),
                            Item("Paneer Tikka Masala", "Mains", 14.50m, true, "Grilled paneer in a spiced tomato and onion gravy"),
                            Item("Lamb Rogan Josh", "Mains", 17.00m, false, "Slow-cooked lamb in a Kashmiri chilli sauce"),
                            Item("Garlic Naan", "Breads", 3.50m, true, "Tandoor-baked bread with garlic and butter"),
                            Item("Mango Lassi", "Drinks", 4.50m, true, "Sweet yogurt drink blended with mango"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Maple Street Tacos", Cuisine = "Mexican", Rating = 4.5,
                        Description = "Street-style tacos, burritos and fresh guacamole.",
                        DeliveryFee = 1.99m, MinimumOrder = 12m, DeliveryMinutes = 25,
                        MenuItems =
                        {
                            Item("Chips and Guacamole", "Starters", 6.00m, true, "Fresh guacamole with warm corn chips"),
                            Item("Carne Asada Tacos", "Mains", 12.50m, false, "Three tacos with grilled steak, onion and cilantro"),
                            Item("Baja Fish Tacos", "Mains", 13.00m, false, "Three crispy fish tacos with cabbage slaw and lime crema"),
                            Item("Black Bean Burrito", "Mains", 11.00m, true, "Black beans, rice, cheese and pico de gallo"),
                            Item("Elote", "Sides", 4.50m, true, "Grilled street corn with cotija cheese and chilli"),
                            Item("Horchata", "Drinks", 3.75m, true, "Chilled rice and cinnamon drink"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "The Slice Lab", Cuisine = "Pizza", Rating = 4.4,
                        Description = "Hand-stretched pizza baked in a hot stone oven.",
                        DeliveryFee = 2.49m, MinimumOrder = 15m, DeliveryMinutes = 35,
                        MenuItems =
                        {
                            Item("Garlic Knots", "Starters", 5.50m, true, "Six knots with garlic butter and marinara"),
                            Item("Margherita Pizza", "Mains", 14.00m, true, "Tomato, fresh mozzarella and basil"),
                            Item("Pepperoni Pizza", "Mains", 16.00m, false, "Mozzarella and crisp-edged pepperoni"),
                            Item("Veggie Supreme Pizza", "Mains", 16.50m, true, "Peppers, mushrooms, onion, olives and spinach"),
                            Item("Garden Salad", "Sides", 7.50m, true, "Mixed greens, cucumber, tomato and house vinaigrette"),
                            Item("Chocolate Chip Cookie", "Desserts", 3.50m, true, "Large, soft and baked fresh"),
                        }
                    },
                }
            },
            new Area
            {
                Name = "Hyattsville",
                Restaurants =
                {
                    new Restaurant
                    {
                        Name = "Lantern Noodle House", Cuisine = "Chinese", Rating = 4.6,
                        Description = "Hand-pulled noodles, dumplings and Sichuan classics.",
                        DeliveryFee = 2.99m, MinimumOrder = 15m, DeliveryMinutes = 30,
                        MenuItems =
                        {
                            Item("Pork Dumplings", "Starters", 8.00m, false, "Eight pan-fried dumplings with chilli soy dip"),
                            Item("Vegetable Spring Rolls", "Starters", 6.00m, true, "Four crispy rolls with sweet chilli sauce"),
                            Item("Dan Dan Noodles", "Mains", 13.50m, false, "Noodles in a spicy sesame sauce with minced pork"),
                            Item("Kung Pao Chicken", "Mains", 14.50m, false, "Chicken, peanuts and dried chillies in a tangy sauce"),
                            Item("Mapo Tofu with Mushrooms", "Mains", 13.00m, true, "Silken tofu in a numbing, spicy bean sauce"),
                            Item("Jasmine Tea", "Drinks", 2.75m, true, "Hot jasmine green tea"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Selam Table", Cuisine = "Ethiopian", Rating = 4.8,
                        Description = "Stews and platters served on soft injera bread.",
                        DeliveryFee = 3.49m, MinimumOrder = 20m, DeliveryMinutes = 40,
                        MenuItems =
                        {
                            Item("Sambusa", "Starters", 5.50m, true, "Two crisp pastries filled with spiced lentils"),
                            Item("Doro Wat", "Mains", 16.00m, false, "Chicken stew in berbere sauce with a boiled egg"),
                            Item("Yebeg Tibs", "Mains", 17.50m, false, "Sauteed lamb with onion, peppers and rosemary"),
                            Item("Veggie Combo Platter", "Mains", 15.50m, true, "Lentils, split peas, collards and cabbage on injera"),
                            Item("Extra Injera", "Sides", 2.50m, true, "Two pieces of soft sourdough flatbread"),
                            Item("Spiced Ethiopian Coffee", "Drinks", 3.50m, true, "Coffee brewed with cardamom and cinnamon"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Route 1 Burger Co.", Cuisine = "Burgers", Rating = 4.3,
                        Description = "Smashed burgers, crispy chicken and thick shakes.",
                        DeliveryFee = 1.99m, MinimumOrder = 10m, DeliveryMinutes = 25,
                        MenuItems =
                        {
                            Item("Classic Cheeseburger", "Mains", 10.50m, false, "Smashed beef patty, cheddar, pickles and house sauce"),
                            Item("Crispy Chicken Sandwich", "Mains", 11.00m, false, "Buttermilk fried chicken with slaw on a brioche bun"),
                            Item("Black Bean Veggie Burger", "Mains", 10.50m, true, "House-made patty with lettuce, tomato and chipotle mayo"),
                            Item("Seasoned Fries", "Sides", 4.50m, true, "Crispy fries with our spice blend"),
                            Item("Onion Rings", "Sides", 5.50m, true, "Beer-battered and fried until golden"),
                            Item("Vanilla Milkshake", "Drinks", 5.50m, true, "Thick shake made with real vanilla ice cream"),
                        }
                    },
                }
            },
            new Area
            {
                Name = "Greenbelt",
                Restaurants =
                {
                    new Restaurant
                    {
                        Name = "Cedar & Olive", Cuisine = "Mediterranean", Rating = 4.7,
                        Description = "Grilled meats, falafel and fresh salads.",
                        DeliveryFee = 2.99m, MinimumOrder = 15m, DeliveryMinutes = 30,
                        MenuItems =
                        {
                            Item("Hummus with Warm Pita", "Starters", 7.00m, true, "Creamy chickpea dip with olive oil and paprika"),
                            Item("Falafel Plate", "Mains", 13.50m, true, "Falafel, rice, salad, pickles and tahini"),
                            Item("Chicken Shawarma Plate", "Mains", 15.00m, false, "Spiced chicken, rice, salad and garlic sauce"),
                            Item("Lamb Kofta Plate", "Mains", 16.50m, false, "Grilled lamb skewers with rice and grilled tomato"),
                            Item("Greek Salad", "Sides", 8.50m, true, "Cucumber, tomato, olives and feta"),
                            Item("Baklava", "Desserts", 4.50m, true, "Layered pastry with pistachio and honey"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Seoul Bowl", Cuisine = "Korean", Rating = 4.5,
                        Description = "Rice bowls and Korean comfort food.",
                        DeliveryFee = 2.49m, MinimumOrder = 15m, DeliveryMinutes = 30,
                        MenuItems =
                        {
                            Item("Vegetable Pancake", "Starters", 8.00m, true, "Crispy pancake with scallions, carrot and zucchini"),
                            Item("Beef Bibimbap", "Mains", 15.00m, false, "Rice, seasoned vegetables, beef and a fried egg"),
                            Item("Tofu Bibimbap", "Mains", 13.50m, true, "Rice, seasoned vegetables and pan-seared tofu"),
                            Item("Bulgogi Rice Bowl", "Mains", 15.50m, false, "Sweet soy marinated beef over steamed rice"),
                            Item("Vegetable Japchae", "Sides", 9.00m, true, "Glass noodles stir-fried with vegetables and sesame"),
                            Item("Barley Tea", "Drinks", 2.75m, true, "Roasted barley tea, served cold"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Sunrise Bakehouse", Cuisine = "Cafe & Bakery", Rating = 4.6,
                        Description = "Fresh pastries, sandwiches and good coffee.",
                        DeliveryFee = 1.49m, MinimumOrder = 8m, DeliveryMinutes = 20,
                        MenuItems =
                        {
                            Item("Avocado Toast", "Mains", 9.50m, true, "Sourdough, smashed avocado, chilli flakes and lemon"),
                            Item("Egg and Cheddar Croissant", "Mains", 8.50m, true, "Soft scrambled egg and sharp cheddar"),
                            Item("Turkey Pesto Panini", "Mains", 11.00m, false, "Roast turkey, pesto, mozzarella and tomato"),
                            Item("Blueberry Muffin", "Desserts", 3.75m, true, "Baked each morning"),
                            Item("Cold Brew", "Drinks", 4.25m, true, "Slow-steeped for 18 hours"),
                            Item("Fresh Orange Juice", "Drinks", 4.50m, true, "Squeezed to order"),
                        }
                    },
                }
            },
            new Area
            {
                Name = "Riverdale Park",
                Restaurants =
                {
                    new Restaurant
                    {
                        Name = "Tide Sushi Bar", Cuisine = "Japanese", Rating = 4.5,
                        Description = "Sushi rolls, bowls and small plates.",
                        DeliveryFee = 3.49m, MinimumOrder = 20m, DeliveryMinutes = 35,
                        MenuItems =
                        {
                            Item("Edamame", "Starters", 5.00m, true, "Steamed soybeans with sea salt"),
                            Item("Salmon Avocado Roll", "Mains", 11.50m, false, "Eight pieces of salmon and avocado roll"),
                            Item("Spicy Tuna Roll", "Mains", 12.00m, false, "Eight pieces with tuna, cucumber and spicy mayo"),
                            Item("Veggie Roll", "Mains", 8.50m, true, "Eight pieces with cucumber, avocado and carrot"),
                            Item("Chicken Teriyaki Bowl", "Mains", 14.00m, false, "Grilled chicken, teriyaki glaze, rice and greens"),
                            Item("Miso Soup", "Sides", 3.50m, false, "Tofu, seaweed and scallions in dashi broth"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Basil & Lime", Cuisine = "Thai", Rating = 4.6,
                        Description = "Curries, noodles and street food from Thailand.",
                        DeliveryFee = 2.99m, MinimumOrder = 15m, DeliveryMinutes = 30,
                        MenuItems =
                        {
                            Item("Fresh Summer Rolls", "Starters", 7.00m, true, "Rice paper rolls with herbs, vegetables and peanut sauce"),
                            Item("Chicken Pad Thai", "Mains", 14.00m, false, "Rice noodles, egg, peanuts and tamarind sauce"),
                            Item("Vegetable Green Curry", "Mains", 13.50m, true, "Coconut green curry with bamboo shoots and basil"),
                            Item("Beef Drunken Noodles", "Mains", 15.00m, false, "Wide noodles with beef, chilli, garlic and holy basil"),
                            Item("Jasmine Rice", "Sides", 2.50m, true, "Steamed fragrant rice"),
                            Item("Thai Iced Tea", "Drinks", 4.50m, true, "Sweet spiced tea with milk over ice"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Hot Box Wings", Cuisine = "Wings", Rating = 4.2,
                        Description = "Wings, bites and sides for sharing.",
                        DeliveryFee = 1.99m, MinimumOrder = 12m, DeliveryMinutes = 25,
                        MenuItems =
                        {
                            Item("Mozzarella Sticks", "Starters", 6.50m, true, "Six sticks with marinara"),
                            Item("Buffalo Wings", "Mains", 13.00m, false, "Ten wings tossed in classic buffalo sauce"),
                            Item("Garlic Parmesan Wings", "Mains", 13.00m, false, "Ten wings tossed in garlic butter and parmesan"),
                            Item("BBQ Boneless Bites", "Mains", 11.50m, false, "Crispy chicken bites in smoky BBQ sauce"),
                            Item("Fries", "Sides", 4.00m, true, "Hot, crispy and salted"),
                            Item("Lemonade", "Drinks", 3.00m, true, "Fresh-squeezed lemonade"),
                        }
                    },
                }
            },
            new Area
            {
                Name = "Takoma Park",
                Restaurants =
                {
                    new Restaurant
                    {
                        Name = "Greenhouse Kitchen", Cuisine = "Vegan", Rating = 4.7,
                        Description = "Plant-based bowls, burgers and juices.",
                        DeliveryFee = 2.49m, MinimumOrder = 15m, DeliveryMinutes = 30,
                        MenuItems =
                        {
                            Item("Cauliflower Bites", "Starters", 8.00m, true, "Crispy cauliflower with buffalo or garlic glaze"),
                            Item("Buddha Bowl", "Mains", 13.50m, true, "Quinoa, roasted vegetables, chickpeas and tahini"),
                            Item("Lentil Walnut Burger", "Mains", 13.00m, true, "House-made patty on a toasted bun with all the toppings"),
                            Item("Jackfruit Tacos", "Mains", 12.50m, true, "Three tacos with BBQ jackfruit and slaw"),
                            Item("Sweet Potato Fries", "Sides", 5.50m, true, "Crispy fries with chipotle dip"),
                            Item("Cold-Pressed Green Juice", "Drinks", 6.50m, true, "Kale, apple, cucumber, lemon and ginger"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Casa Marisol", Cuisine = "Salvadoran", Rating = 4.6,
                        Description = "Pupusas and home-style Salvadoran plates.",
                        DeliveryFee = 2.49m, MinimumOrder = 12m, DeliveryMinutes = 30,
                        MenuItems =
                        {
                            Item("Pupusa Trio", "Mains", 13.00m, false, "Cheese, bean and pork pupusas with curtido and salsa"),
                            Item("Cheese and Loroco Pupusas", "Mains", 12.00m, true, "Three corn cakes with melted cheese and loroco flower"),
                            Item("Pollo Encebollado", "Mains", 15.00m, false, "Chicken simmered with onions, served with rice and beans"),
                            Item("Yuca Frita", "Sides", 6.00m, true, "Fried cassava with curtido and salsa"),
                            Item("Fried Plantains with Crema", "Sides", 5.50m, true, "Sweet plantains with cream and refried beans"),
                            Item("Fresh Tamarind Drink", "Drinks", 3.50m, true, "Sweet and tangy, served over ice"),
                        }
                    },
                    new Restaurant
                    {
                        Name = "Corner Brew & Bagel", Cuisine = "Deli & Bagels", Rating = 4.4,
                        Description = "Bagel sandwiches, soups and espresso drinks.",
                        DeliveryFee = 1.49m, MinimumOrder = 8m, DeliveryMinutes = 20,
                        MenuItems =
                        {
                            Item("Everything Bagel with Cream Cheese", "Mains", 4.50m, true, "Toasted and spread generously"),
                            Item("Bacon, Egg and Cheese Bagel", "Mains", 7.50m, false, "The breakfast classic"),
                            Item("Lox Bagel", "Mains", 11.00m, false, "Smoked salmon, cream cheese, capers and red onion"),
                            Item("Chicken Salad Sandwich", "Mains", 10.50m, false, "On toasted multigrain with lettuce and tomato"),
                            Item("Tomato Basil Soup", "Sides", 5.50m, true, "Creamy and made fresh daily"),
                            Item("Iced Latte", "Drinks", 4.75m, true, "Double espresso over milk and ice"),
                        }
                    },
                }
            }
        );

        db.SaveChanges();
    }

    private static MenuItem Item(string name, string category, decimal price, bool veg, string description) =>
        new() { Name = name, Category = category, Price = price, IsVegetarian = veg, Description = description };
}