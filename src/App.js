import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <header className="App-header">
                <h1>Mealy is live</h1>
                <p>Welcome to Mealy. Go to /signup or /login to get started.</p>
              </header>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
