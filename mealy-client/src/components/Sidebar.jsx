import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-white bg-blue-500 px-4 py-2 rounded"
      : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded";

  return (
    <div className="w-64 h-screen bg-gray-100 p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Mealy Admin</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/dashboard" className={navLinkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/meals" className={navLinkStyle}>
          Meals
        </NavLink>
        <NavLink to="/orders" className={navLinkStyle}>
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
