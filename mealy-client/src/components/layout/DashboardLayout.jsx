import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Mealy Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-bold" : "hover:text-yellow-200"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/meals"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-bold" : "hover:text-yellow-200"
            }
          >
            Meals
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-bold" : "hover:text-yellow-200"
            }
          >
            Orders
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
