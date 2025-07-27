import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../index.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        {!user && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Signup
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/meals"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Order
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Profile
            </NavLink>

            {/* Optional Admin Panel */}
            {user && user.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Admin Panel
              </NavLink>
            )}

            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
