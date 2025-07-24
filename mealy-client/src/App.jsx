import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import MealsPage from "./pages/MealsPage";
import OrdersPage from "./pages/OrdersPage";

import DashboardLayout from "./components/layout/DashboardLayout";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes with layout */}
      {isAuthenticated ? (
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      ) : (
        <>
          <Route path="/dashboard" element={<Navigate to="/login" />} />
          <Route path="/meals" element={<Navigate to="/login" />} />
          <Route path="/orders" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
