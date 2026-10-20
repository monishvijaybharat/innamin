import { Link, Route, Routes } from "react-router";
import { useCart } from "./CartContext";
import HomePage from "./pages/HomePage";
import AreaPage from "./pages/AreaPage";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 16" aria-hidden="true">
      <line x1="6" y1="8" x2="34" y2="8" stroke="currentColor" strokeWidth="3" />
      <circle cx="6" cy="8" r="5" fill="#ffc72c" stroke="currentColor" strokeWidth="3" />
      <circle cx="34" cy="8" r="5" fill="#ba0c2f" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export default function App() {
  const { itemCount } = useCart();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand" aria-label="InnaMin home">
            <BrandMark />
            InnaMin
          </Link>
          <Link to="/cart" className="cart-link" aria-label={`Cart, ${itemCount} items`}>
            Cart
            <span key={itemCount} className="cart-count" data-empty={itemCount === 0}>
              {itemCount}
            </span>
          </Link>
        </div>
      </header>

      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/areas/:areaId" element={<AreaPage />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders/:orderId" element={<OrderPage />} />
          <Route
            path="*"
            element={
              <p>
                Page not found. <Link to="/">Back to home</Link>
              </p>
            }
          />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p className="footer-brand">InnaMin</p>
          <p>
            A practice project. The restaurants, menus and orders are fictional, and no food is
            delivered.
          </p>
        </div>
      </footer>
    </>
  );
}