import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Bookings.css";

export default function Bookings() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const getStatusClass = (status) => {
    if (status === "Placed") return "status placed";
    if (status === "Confirmed") return "status confirmed";
    return "status pending";
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
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>

                <td>
                  {order.customer?.firstName}{" "}
                  {order.customer?.lastName}
                </td>

                <td>{order.customer?.email}</td>

                <td>
                  {order.products?.map(p => (
                    <div key={p.productId}>
                      {p.name} x {p.qty}
                    </div>
                  ))}
                </td>

                <td>
                  {order.customer?.address},{" "}
                  {order.customer?.city}
                </td>

                <td>{order.paymentMethod}</td>

                <td>
                  <span className={getStatusClass(order.orderStatus)}>
                    {order.orderStatus}
                  </span>
                </td>

                <td>₹{order.totalAmount}</td>

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
