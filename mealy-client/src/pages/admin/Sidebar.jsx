// src/components/admin/Sidebar.jsx
import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="admin-sidebar">
      <ul>
        <li
          onClick={() => setActiveTab("dashboard")}
          className={activeTab === "dashboard" ? "active" : ""}
        >
          Dashboard
        </li>
        <li
          onClick={() => setActiveTab("orders")}
          className={activeTab === "orders" ? "active" : ""}
        >
          Orders
        </li>
        <li
          onClick={() => setActiveTab("users")}
          className={activeTab === "users" ? "active" : ""}
        >
          Users
        </li>
        <li
          onClick={() => setActiveTab("meals")}
          className={activeTab === "meals" ? "active" : ""}
        >
          Meals
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
