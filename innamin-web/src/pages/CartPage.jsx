import { Link } from "react-router";
import { useCart } from "../CartContext";
import { money, toCents } from "../format";

export default function CartPage() {
  const { cart, subtotal, changeQuantity, removeItem, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div>
        <header className="page-hero">
          <div className="page-hero-inner">
            <h1>Your cart</h1>
            <p className="page-hero-lead">Your cart is empty. Pick a town to find something to eat.</p>
            <p className="hero-action">
              <Link className="button-link" to="/">
                Choose a town
              </Link>
            </p>
          </div>
        </header>
      </div>
    );
  }

  const { restaurant } = cart;
  const total = (toCents(subtotal) + toCents(restaurant.deliveryFee)) / 100;
  const shortBy = (toCents(restaurant.minimumOrder) - toCents(subtotal)) / 100;

  return (
    <div>
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1>Your cart</h1>
          <p className="page-hero-lead">
            From <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </p>
        </div>
      </header>

      <div className="checkout-layout">
        <section aria-label="Items in your cart">
          <ul className="cart-lines">
            {cart.items.map((item) => (
              <li key={item.id} className="cart-line">
                <div className="cart-line-info">
                  <h2>{item.name}</h2>
                  <p>{money(item.price)} each</p>
                  <button
                    className="link-button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
                <div className="stepper">
                  <button onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>
                    &minus;
                  </button>
                  <span aria-label={`${item.quantity} in cart`}>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>
                    +
                  </button>
                </div>
                <p className="cart-line-total">{money(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="summary" aria-label="Order summary">
          <h2 className="summary-title">Order summary</h2>
          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery fee</dt>
              <dd>{money(restaurant.deliveryFee)}</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>

          {shortBy > 0 ? (
            <p className="notice">
              Add {money(shortBy)} more to reach the {money(restaurant.minimumOrder)} minimum order.
            </p>
          ) : (
            <Link className="button-link button-block" to="/checkout">
              Go to checkout
            </Link>
          )}
          <button className="link-button" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}