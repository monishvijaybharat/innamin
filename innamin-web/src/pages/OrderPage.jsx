import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API_URL } from "../api";
import { money } from "../format";
import Scooter from "../Scooter";

const STAGES = [
  { key: "received", label: "Order received", text: "The restaurant has your order." },
  { key: "preparing", label: "Preparing", text: "The kitchen is cooking your food." },
  { key: "out_for_delivery", label: "Out for delivery", text: "Your driver is on the way." },
  { key: "delivered", label: "Delivered", text: "Enjoy your meal!" },
];

const POLL_MS = 5000;

// Loads the order, then asks the server again every few seconds until it is delivered.
function useOrder(orderId) {
  const [state, setState] = useState({ orderId: null, order: null, error: null });

  useEffect(() => {
    let cancelled = false;
    let timer;
    let haveOrder = false;

    async function load() {
      try {
        const response = await fetch(`${API_URL}/orders/${orderId}`);
        if (cancelled) return;
        if (response.status === 404) {
          setState({ orderId, order: null, error: "not-found" });
          return;
        }
        if (!response.ok) throw new Error(`The server answered with ${response.status}.`);

        const order = await response.json();
        if (cancelled) return;
        haveOrder = true;
        setState({ orderId, order, error: null });
        if (order.status !== "delivered") timer = setTimeout(load, POLL_MS);
      } catch (err) {
        if (cancelled) return;
        // Keep showing the last good order if one update fails, and try again.
        setState((prev) =>
          prev.orderId === orderId && prev.order
            ? prev
            : { orderId, order: null, error: err.message },
        );
        if (haveOrder) timer = setTimeout(load, POLL_MS);
      }
    }

    load();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [orderId]);

  const loading = state.orderId !== orderId;
  return { order: loading ? null : state.order, error: loading ? null : state.error, loading };
}

export default function OrderPage() {
  const { orderId } = useParams();
  const { order, loading, error } = useOrder(orderId);

  if (loading) return <p>Loading your order...</p>;
  if (error === "not-found") {
    return (
      <p>
        We couldn't find that order. <Link to="/">Back to home</Link>
      </p>
    );
  }
  if (error) return <p>Could not load your order: {error}</p>;

  const stageIndex = Math.max(
    0,
    STAGES.findIndex((stage) => stage.key === order.status),
  );
  const delivered = order.status === "delivered";
  const placed = new Date(order.placedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div>
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1>{STAGES[stageIndex].label}</h1>
          <p className="page-hero-lead">
            Thanks, {order.customerName}. {STAGES[stageIndex].text}
          </p>
        </div>
      </header>

            <section className="tracker-wrap" aria-label="Order progress">
        <div
          className="tracker-rail"
          data-status={order.status}
          style={{ "--stops": STAGES.length, "--progress": stageIndex / (STAGES.length - 1) }}
        >
          <Scooter className="tracker-scooter" />
          <ol className="tracker">
            {STAGES.map((stage, index) => {
              const state =
                index < stageIndex || delivered ? "done" : index === stageIndex ? "current" : "upcoming";
              return (
                <li key={stage.key} data-state={state} aria-current={index === stageIndex ? "step" : undefined}>
                  <span className="tracker-dot" aria-hidden="true" />
                  <span className="tracker-label">{stage.label}</span>
                  <span className="tracker-state">
                    {state === "done" ? (delivered && index === stageIndex ? "Complete" : "Done") : state === "current" ? "In progress" : "Waiting"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        {!delivered && <p className="tracker-note">This page updates by itself, so you can leave it open.</p>}
      </section>

      <div className="checkout-layout">
        <section aria-label="Delivery details">
          <h2 className="details-title">Delivery details</h2>
          <dl className="details">
            <dt>Delivering to</dt>
            <dd>{order.address}</dd>
            {order.notes && (
              <>
                <dt>Your note</dt>
                <dd>{order.notes}</dd>
              </>
            )}
            <dt>Restaurant</dt>
            <dd>{order.restaurant}</dd>
            <dt>Order number</dt>
            <dd>{order.id.slice(0, 8).toUpperCase()}</dd>
            <dt>Placed</dt>
            <dd>{placed}</dd>
          </dl>
          <p>
            <Link className="button-link" to="/">
              Order something else
            </Link>
          </p>
        </section>

        <aside className="summary" aria-label="Order summary">
          <h2 className="summary-title">Your order</h2>
          <ul className="summary-items">
            {order.items.map((item) => (
              <li key={item.name}>
                <span>
                  {item.quantity} &times; {item.name}
                </span>
                <span>{money(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{money(order.subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery fee</dt>
              <dd>{money(order.deliveryFee)}</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd>{money(order.total)}</dd>
            </div>
          </dl>
          <p className="payment-note">Pay on delivery.</p>
        </aside>
      </div>
    </div>
  );
}