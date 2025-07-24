import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header
      style={{
        padding: "1rem",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>🍽️ Mealy</h1>

      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/meals" style={linkStyle}>Meals</Link>
            <Link to="/orders" style={linkStyle}>Orders</Link>
            <button onClick={handleLogout} style={{ ...linkStyle, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const linkStyle = {
  marginRight: "1rem",
  textDecoration: "none",
  color: "#fff",
};

export default Header;
