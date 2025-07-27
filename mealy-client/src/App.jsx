import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signlogin from "./pages/Signlogin";
import "./index.css"
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Order from "./pages/Order"
import Admin from './pages/Admin';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';




function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Signlogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/meals" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={ <ProtectedAdminRoute> <Admin /> </ProtectedAdminRoute> }/>
      </Routes>

      </>
);
}


export default App;