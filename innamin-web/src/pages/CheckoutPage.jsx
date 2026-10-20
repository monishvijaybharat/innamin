import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../CartContext";
import { postJson } from "../api";
import { money, toCents } from "../format";

const PHONE_CHARS = /^[\d\s().+-]+$/;
const STREET = /^\d+[A-Za-z]?\s+(?=.*[A-Za-z]{2}).{3,}$/;

// The areas we deliver to, and the ZIP codes that belong to each one.
const SERVICE_AREAS = {
  "College Park": ["20740", "20741", "20742"],
  Hyattsville: ["20781", "20782", "20783", "20784", "20785"],
  Greenbelt: ["20768", "20770", "20771"],
  "Riverdale Park": ["20737"],
  "Takoma Park": ["20912"],
};

function phoneDigits(phone) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits;
}

function validate(form) {
  const errors = {};
  if (form.customerName.trim().length < 2) errors.customerName = "Enter your name.";

  const digits = phoneDigits(form.phone);
  if (!PHONE_CHARS.test(form.phone) || !/^[2-9]\d{2}[2-9]\d{6}$/.test(digits))
    errors.phone = "Enter a valid 10-digit US phone number, like (301) 555-0142.";

  if (!STREET.test(form.street.trim()))
    errors.street = "Enter a street address that starts with a number, like 4500 Campus Dr.";
  const knownCity = Object.hasOwn(SERVICE_AREAS, form.city);
  if (!knownCity) errors.city = "Choose one of the cities we deliver to.";

  if (!/^\d{5}$/.test(form.zip)) {
    errors.zip = "Enter a 5-digit ZIP code.";
  } else if (knownCity && !SERVICE_AREAS[form.city].includes(form.zip)) {
    errors.zip = `${form.zip} is not a ZIP code in ${form.city}. Use ${SERVICE_AREAS[form.city].join(", ")}.`;
  }
  return errors;
}

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: "", phone: "", street: "", city: "", zip: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [problem, setProblem] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (cart.items.length === 0) {
    return (
      <div>
        <header className="page-hero">
          <div className="page-hero-inner">
            <h1>Checkout</h1>
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
  const belowMinimum = toCents(subtotal) < toCents(restaurant.minimumOrder);

  function field(name) {
    return {
      id: name,
      value: form[name],
      "aria-invalid": Boolean(errors[name]),
      onChange: (event) => {
        const { value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
      },
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setProblem("");

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const { ok, data } = await postJson("/orders", {
        restaurantId: restaurant.id,
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        address: `${form.street.trim()}, ${form.city.trim()}, MD ${form.zip}`,
        notes: form.notes,
        items: cart.items.map((item) => ({ menuItemId: item.id, quantity: item.quantity })),
      });

      if (ok) {
        navigate(`/orders/${data.id}`, { replace: true });
        clearCart();
        return;
      }

      if (data?.errors) {
        const flat = Object.fromEntries(
          Object.entries(data.errors).map(([name, messages]) => [name, messages[0]]),
        );
        setErrors(flat);
        if (flat.items || flat.restaurantId) setProblem(flat.items ?? flat.restaurantId);
      } else {
        setProblem("Something went wrong placing your order. Please try again.");
      }
    } catch {
      setProblem("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <header className="page-hero">
        <div className="page-hero-inner">
          <Link className="back-link" to="/cart">
            Back to cart
          </Link>
          <h1>Checkout</h1>
          <p className="page-hero-lead">Ordering from {restaurant.name}. You pay when it arrives.</p>
        </div>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Your details</legend>
            <div className="field">
              <label htmlFor="customerName">Name</label>
              <input {...field("customerName")} autoComplete="name" />
              {errors.customerName && <p role="alert">{errors.customerName}</p>}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input {...field("phone")} type="tel" autoComplete="tel" />
              {errors.phone && <p role="alert">{errors.phone}</p>}
            </div>
          </fieldset>

          <fieldset>
            <legend>Delivery address</legend>
            <div className="field">
              <label htmlFor="street">Street address</label>
              <input {...field("street")} autoComplete="address-line1" />
              {errors.street && <p role="alert">{errors.street}</p>}
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="city">City</label>
                <select {...field("city")} autoComplete="address-level2">
                  <option value="">Choose a city</option>
                  {Object.keys(SERVICE_AREAS).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors.city && <p role="alert">{errors.city}</p>}
              </div>
              <div className="field">
                <span className="label-like">State</span>
                <p className="static-value">MD</p>
              </div>
              <div className="field">
                <label htmlFor="zip">ZIP code</label>
                <input {...field("zip")} inputMode="numeric" maxLength={5} autoComplete="postal-code" />
              </div>
            </div>
            {errors.zip && <p role="alert">{errors.zip}</p>}
            {errors.address && <p role="alert">{errors.address}</p>}

            <div className="field">
              <label htmlFor="notes">Delivery notes (optional)</label>
              <textarea {...field("notes")} rows={3} maxLength={300} />
              {errors.notes && <p role="alert">{errors.notes}</p>}
            </div>
          </fieldset>

          {Object.keys(errors).length > 0 && (
            <p role="alert" className="form-error">
              Your order was not placed. Please fix the problems shown above.
            </p>
          )}
          {problem && (
            <p role="alert" className="form-error">
              {problem}
            </p>
          )}
          {belowMinimum && (
            <p role="alert" className="form-error">
              This order is below the {money(restaurant.minimumOrder)} minimum. Add more dishes in
              your cart.
            </p>
          )}

          <button className="submit" type="submit" disabled={submitting || belowMinimum}>
            {submitting ? "Placing order..." : `Place order, ${money(total)}`}
          </button>
        </form>

        <aside className="summary" aria-label="Order summary">
          <h2 className="summary-title">Your order</h2>
          <ul className="summary-items">
            {cart.items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.quantity} &times; {item.name}
                </span>
                <span>{money(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
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
          <p className="payment-note">
            Pay on delivery. This is a demo site, so no payment details are collected.
          </p>
        </aside>
      </div>
    </div>
  );
}