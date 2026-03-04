import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./BookingHistory.css";

export default function BookingHistory() {

  const [orders, setOrders] = useState([]);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return;

    const storedUser = JSON.parse(rawUser);

    API.get(`/orders/user/${storedUser.email}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const openCancelModal = (id) => {
    setCancelOrderId(id);
  };

  const submitCancel = async () => {
    if (!cancelReason.trim()) {
      alert("Please enter cancel reason");
      return;
    }

    try {
      const res = await API.put(`/orders/cancel/${cancelOrderId}`, {
        reason: cancelReason
      });

      setOrders(prev =>
        prev.map(order =>
          order._id === cancelOrderId
            ? res.data
            : order
        )
      );

      setCancelOrderId(null);
      setCancelReason("");
    } catch (err) {
      console.error(err);
      alert("Cancel failed");
    }
  };

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No Orders Found</p>}

      {orders.map(order => {
        const firstItem = order.items?.[0];

        return (
          <div className="order-card" key={order._id}>

            <img src={firstItem?.image} alt={firstItem?.name} />

            <div className="order-info">

              <h4>{firstItem?.name}</h4>
              <p className="price">₹{firstItem?.price}</p>

              <div className="order-meta">
                <span>Order ID: {order._id.slice(-6)}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span className={`status ${order.paymentStatus?.toLowerCase()}`}>
                  {order.paymentStatus}
                </span>
              </div>

              <div className="order-actions">

                <button
                  className="view-btn"
                  onClick={() => navigate(`/product/${firstItem?.productId}`)}
                >
                  View Details
                </button>

                {order.paymentStatus !== "Cancelled" && (
                  <button
                    className="cancel-btn"
                    onClick={() => openCancelModal(order._id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>

            </div>
          </div>
        );
      })}

      {cancelOrderId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Cancel Order</h3>

            <textarea
              placeholder="Enter cancel reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={submitCancel}>Submit</button>
              <button onClick={() => setCancelOrderId(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}