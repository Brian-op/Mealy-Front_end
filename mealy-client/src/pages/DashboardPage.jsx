import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#333",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ color: "#fff" }}>Mealy 🍽️</h2>
        <nav style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>🏠 Dashboard</Link>
          <Link to="/meals" style={{ color: "#fff", textDecoration: "none" }}>🍛 Meals</Link>
          <Link to="/orders" style={{ color: "#fff", textDecoration: "none" }}>🧾 Orders</Link>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "30px",
              background: "#e63946",
              color: "#fff",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "30px", background: "#f8f9fa" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
