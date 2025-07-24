import React from "react";

const OrdersPage = () => {
  // Mock orders data
  const orders = [
    { id: 101, customer: "Alice", total: 1200, status: "Completed" },
    { id: 102, customer: "Bob", total: 900, status: "Pending" },
    { id: 103, customer: "Eve", total: 1500, status: "Delivered" },
  ];

  return (
    <div>
      <h1 style={headerStyle}>🧾 Orders</h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total (Ksh)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle = {
  fontSize: "28px",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

export default OrdersPage;
