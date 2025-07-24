import React from "react";
import "./OrderCard.css";

const OrderCard = ({ order, showCustomer = false }) => {
  const {
    meal_name,
    customer_name,
    date,
    quantity = 1,
    total_price,
    status = "confirmed",
  } = order;

  return (
    <div className="order-card">
      <div className="order-card-header">
        <h3>{meal_name}</h3>
        <span className={`order-status ${status}`}>{status}</span>
      </div>

      <div className="order-card-body">
        {showCustomer && <p><strong>Customer:</strong> {customer_name}</p>}
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Total:</strong> ${total_price.toFixed(2)}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default OrderCard;
