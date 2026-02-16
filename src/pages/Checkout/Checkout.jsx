import { useState } from "react";
import { useCart } from "../../context/CartContext";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    phone: ""
  });

  const validate = () => {
    let newErrors = {};

    if (!form.email) newErrors.email = "Enter an email";
    if (!form.lastName) newErrors.lastName = "Enter a last name";
    if (!form.address) newErrors.address = "Enter an address";
    if (!form.city) newErrors.city = "Enter a city";
    if (!form.pincode) newErrors.pincode = "Enter a ZIP / postal code";
    if (!form.phone) newErrors.phone = "Enter a phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    const orderData = {
      customer: form,
      products: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image
      })),
      totalAmount: total,
      paymentMethod,
      paymentStatus: paymentMethod === "ONLINE" ? "Paid" : "Pending",
      orderStatus: "Placed"
    };

    await API.post("/orders", orderData);

    if (clearCart) clearCart();   // Fix error

    navigate("/order-success");
  };

  return (
    <div className="checkout-wrapper">

      {/* LEFT SIDE */}
      <div className="checkout-left">

        <h2>Contact</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={errors.email && "error-input"}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <h2>Delivery</h2>

        <div className="row">
          <input
            name="firstName"
            placeholder="First name (optional)"
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            className={errors.lastName && "error-input"}
          />
        </div>
        {errors.lastName && <p className="error-text">{errors.lastName}</p>}

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className={errors.address && "error-input"}
        />
        {errors.address && <p className="error-text">{errors.address}</p>}

        <div className="row">
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className={errors.city && "error-input"}
          />

          <input
            name="pincode"
            placeholder="PIN code"
            onChange={handleChange}
            className={errors.pincode && "error-input"}
          />
        </div>

        {errors.city && <p className="error-text">{errors.city}</p>}
        {errors.pincode && <p className="error-text">{errors.pincode}</p>}

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className={errors.phone && "error-input"}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <h2>Payment</h2>

        <div className="payment-box">
          <label>
            <input
              type="radio"
              checked={paymentMethod === "ONLINE"}
              onChange={() => setPaymentMethod("ONLINE")}
            />
            Razorpay Secure (UPI, Cards)
          </label>

          <label>
            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>
        </div>

        <button className="pay-btn" onClick={handlePlaceOrder}>
          Pay now
        </button>

      </div>

      {/* RIGHT SIDE SUMMARY */}
      <div className="checkout-right">

        {cart.map(item => (
          <div key={item._id} className="summary-item">
            <img src={item.image} alt="" />
            <div>
              <p>{item.name}</p>
              <small>Qty: {item.qty}</small>
            </div>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr />

        <div className="summary-total">
          <h3>Total</h3>
          <h3>₹{total}</h3>
        </div>

      </div>
    </div>
  );
}
