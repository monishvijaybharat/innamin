import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { toCents } from "./format";

const STORAGE_KEY = "innamin-cart";
const emptyCart = { restaurant: null, items: [] };

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.items)) return saved;
  } catch {
    // unreadable or unavailable storage: start with an empty cart
  }
  return emptyCart;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable: the cart still works until the page closes
    }
  }, [cart]);

  function addItem(restaurant, menuItem) {
    setCart((prev) => {
      const base = prev.restaurant?.id === restaurant.id ? prev : emptyCart;
      const existing = base.items.find((item) => item.id === menuItem.id);

      const items = existing
        ? base.items.map((item) =>
            item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [
            ...base.items,
            { id: menuItem.id, name: menuItem.name, price: menuItem.price, quantity: 1 },
          ];

      return {
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          deliveryFee: restaurant.deliveryFee,
          minimumOrder: restaurant.minimumOrder,
        },
        items,
      };
    });
  }

  function changeQuantity(itemId, change) {
    setCart((prev) => {
      const items = prev.items
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0);
      return items.length === 0 ? emptyCart : { ...prev, items };
    });
  }

  function removeItem(itemId) {
    setCart((prev) => {
      const items = prev.items.filter((item) => item.id !== itemId);
      return items.length === 0 ? emptyCart : { ...prev, items };
    });
  }

  function clearCart() {
    setCart(emptyCart);
  }

  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
  const subtotalCents = cart.items.reduce(
    (sum, item) => sum + toCents(item.price) * item.quantity,
    0,
  );

  const value = {
    cart,
    itemCount,
    subtotal: subtotalCents / 100,
    addItem,
    changeQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}