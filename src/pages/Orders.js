// src/pages/Orders.js
import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/orders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch orders");
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {error && <p>{error}</p>}
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Meal: {order.meal_name} - Date: {order.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
