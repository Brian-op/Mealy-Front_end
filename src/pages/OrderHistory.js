import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/orders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((r) => {
        if (r.ok) return r.json();
        throw new Error("Failed to fetch order history");
      })
      .then((data) => setOrders(data))
      .catch((err) => setMessage(err.message));
  }, [navigate]);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {message && <p>{message}</p>}

      {orders.length === 0 ? (
        <p>You have not made any orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.meal?.name} - {new Date(order.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;
