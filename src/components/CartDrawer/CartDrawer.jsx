import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";

export default function CartDrawer() {
  const {
    cart,
    increase,
    decrease,
    removeItem,
    total,
    isOpen,
    closeCart,
  } = useCart();

  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={closeCart}>
      <div
        className="drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h3>Cart ({cart.length})</h3>
          <button onClick={closeCart}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty">Cart is empty</p>
        ) : (
          <>
            <div className="drawer-items">
              {cart.map((item) => (
                <div key={item._id} className="drawer-item">
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h4>{item.name}</h4>
                    <p>₹ {item.price}</p>

                    <div className="qty">
                      <button onClick={() => decrease(item._id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increase(item._id)}>+</button>
                    </div>
                  </div>

                  <button
                    className="remove"
                    onClick={() => removeItem(item._id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <h4>Total: ₹ {total}</h4>

              <button
                onClick={() => {
                  closeCart();
                  navigate("/cart");
                }}
              >
                View Cart
              </button>

              <button
                className="checkout"
                onClick={() => {
                  closeCart();
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
