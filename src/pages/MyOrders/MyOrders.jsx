import { useEffect, useState } from "react";
import API from "../../services/api";
import "./MyOrders.css";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    try {
      const res = await API.get(`/orders/user/${email}`);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="orders-page">

      <h2>My Orders</h2>

      {orders.length === 0 && <p>No Orders Found</p>}

      {orders.map(order => (
        <div key={order._id} className="order-card">

          {/* Use items instead of products */}
          <img src={order.items[0]?.image} alt="" />

          <div className="order-info">

            <h3>{order.items[0]?.name}</h3>

            <p>Order ID: {order._id}</p>

            <div className="order-meta">
              <span>₹ {order.totalAmount}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="order-actions">
              <button className="view-btn">
                View Details
              </button>

              {order.paymentStatus === "Pending" && (
                <button className="cancel-btn">
                  Cancel Order
                </button>
              )}
            </div>

          </div>

        </div>
      ))}

    </div>
  );
}