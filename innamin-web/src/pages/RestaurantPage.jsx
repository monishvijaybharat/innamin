import { useState } from "react";
import { Link, useParams } from "react-router";
import { useApi } from "../useApi";
import { useCart } from "../CartContext";
import { money } from "../format";
import CuisineArt from "../CuisineArt";

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const { data: restaurant, loading, error } = useApi(`/restaurants/${restaurantId}`);
  const { cart, addItem } = useCart();
  const [vegOnly, setVegOnly] = useState(false);

  if (loading) return <p>Loading menu...</p>;
  if (error === "not-found") {
    return (
      <p>
        We couldn't find that restaurant. <Link to="/">Back to home</Link>
      </p>
    );
  }
  if (error) return <p>Could not load the menu: {error}</p>;

  const items = vegOnly
    ? restaurant.menuItems.filter((m) => m.isVegetarian)
    : restaurant.menuItems;
  const categories = [...new Set(items.map((m) => m.category))];

  const inCart =
    cart.restaurant?.id === restaurant.id
      ? Object.fromEntries(cart.items.map((i) => [i.id, i.quantity]))
      : {};

  function handleAdd(menuItem) {
    const otherRestaurant = cart.restaurant && cart.restaurant.id !== restaurant.id;
    if (
      otherRestaurant &&
      !window.confirm(
        `Your cart has items from ${cart.restaurant.name}. Start a new cart with ${restaurant.name}?`,
      )
    ) {
      return;
    }
    addItem(restaurant, menuItem);
  }

  return (
    <div>
      <header className="page-hero">
        <div className="page-hero-inner">
          <Link className="back-link" to={`/areas/${restaurant.areaId}`}>
            Back to {restaurant.area}
          </Link>
          <div className="restaurant-head">
            <CuisineArt cuisine={restaurant.cuisine} className="head-art" />
            <h1>{restaurant.name}</h1>
            <span className="rating rating-large">
              <span className="sr-only">Rated </span>
              {restaurant.rating.toFixed(1)}
              <span className="sr-only"> out of 5</span>
            </span>
          </div>
          <p className="page-hero-lead">
            {restaurant.cuisine}. {restaurant.description}
          </p>
          <dl className="facts facts-hero">
            <div>
              <dt>Delivery</dt>
              <dd>{restaurant.deliveryMinutes} min</dd>
            </div>
            <div>
              <dt>Fee</dt>
              <dd>{money(restaurant.deliveryFee)}</dd>
            </div>
            <div>
              <dt>Minimum order</dt>
              <dd>{money(restaurant.minimumOrder)}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="menu-layout">
        <aside className="menu-nav" aria-label="Menu sections">
          <p className="menu-nav-title">Menu</p>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <a href={`#${slug(category)}`}>{category}</a>
              </li>
            ))}
          </ul>
          <label className="veg-toggle">
            <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
            Vegetarian only
          </label>
        </aside>

        <div className="menu-body">
          {items.length === 0 && <p>No vegetarian dishes on this menu.</p>}

          {categories.map((category) => (
            <section key={category} id={slug(category)} className="menu-section">
              <h2>{category}</h2>
              <ul className="dishes">
                {items
                  .filter((m) => m.category === category)
                  .map((m) => (
                    <li key={m.id} className="dish">
                      <div className="dish-info">
                        <h3>
                          {m.name}
                          {m.isVegetarian && (
                            <span className="veg-mark" role="img" aria-label="Vegetarian" />
                          )}
                        </h3>
                        <p>{m.description}</p>
                      </div>
                      <div className="dish-buy">
                        <p className="dish-price">{money(m.price)}</p>
                        <div className="dish-actions">
                          <button onClick={() => handleAdd(m)}>Add to cart</button>
                          {inCart[m.id] > 0 && (
                            <span key={inCart[m.id]} className="in-cart">
                              {inCart[m.id]} in cart
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}