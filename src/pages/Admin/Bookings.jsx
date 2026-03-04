import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Bookings.css";

export default function Bookings() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    API.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Fetch error:", err));
  };

  const getStatusClass = (status) => {
    if (status === "Paid") return "status paid";
    if (status === "Pending") return "status pending";
    if (status === "Cancelled") return "status cancelled";
    return "status";
  };

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h2>Bookings</h2>
        <button className="export-btn">Export Excel</button>
      </div>

      <div className="table-container">
        <table className="admin-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Products</th>
              <th>Address</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Cancel Reason</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id}>

                {/* ORDER ID */}
                <td>{order._id.slice(-6)}</td>

                {/* CUSTOMER */}
                <td>
                  {order.customer?.firstName}{" "}
                  {order.customer?.lastName}
                </td>

                {/* EMAIL */}
                <td>{order.customer?.email}</td>

                {/* PRODUCTS */}
                <td>
                  {order.items?.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index}>
                        {item.name} x {item.quantity}
                      </div>
                    ))
                  ) : (
                    "No Products"
                  )}
                </td>

                {/* ADDRESS */}
                <td>
                  {order.customer?.address},{" "}
                  {order.customer?.city}
                </td>

                {/* PAYMENT METHOD */}
                <td>{order.paymentMethod}</td>

                {/* STATUS */}
                <td>
                  <span className={getStatusClass(order.paymentStatus)}>
                    {order.paymentStatus}
                  </span>
                </td>

                {/* CANCEL REASON */}
                <td style={{ color: "#c82333", fontSize: "13px" }}>
                  {order.paymentStatus === "Cancelled"
                    ? order.cancelReason || "No reason given"
                    : "-"}
                </td>

                {/* TOTAL */}
                <td>₹{order.totalAmount}</td>

                {/* DATE */}
                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}