import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Signlogin from "./pages/Signlogin";
import Layout from "./components/Layout";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Signlogin />} />
          {/* Add more routes here like <Route path="login" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
