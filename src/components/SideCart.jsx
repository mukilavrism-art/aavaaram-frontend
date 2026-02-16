import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./SideCart.css";

export default function SideCart() {
  const { cart, open, setOpen, increase, decrease, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="side-cart-overlay" onClick={() => setOpen(false)}>
      <div className="side-cart" onClick={(e) => e.stopPropagation()}>
        <div className="side-cart-header">
          <h3>Cart ({cart.length})</h3>
          <button onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="side-cart-body">
          {cart.length === 0 && <p className="empty">Cart is empty</p>}

          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.img} />
              <div className="cart-info">
                <p>{item.name}</p>
                <span>Rs. {item.price}</span>
                <div>
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span> {item.qty} </span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
                <small onClick={() => removeItem(item.id)}>Remove</small>
              </div>
            </div>
          ))}
        </div>

        <div className="side-cart-footer">
          <div className="total">Total: Rs. {total}</div>
          <button
            className="view-cart-btn"
            onClick={() => {
              setOpen(false);
              navigate("/cart");
            }}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}
