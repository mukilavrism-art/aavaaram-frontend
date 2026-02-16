import { useCart } from "../../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    cart,
    increase,
    decrease,
    removeItem,
    total,
  } = useCart();

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <button onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        {/* LEFT - ITEMS */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>Rs. {item.price}</p>

                <div className="qty-controls">
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
              </div>

              <div className="cart-actions">
                <p className="row-total">
                  Rs. {item.price * item.qty}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs. {total}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
