import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";
import "./auth.css";

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user, data.token); // assuming backend sends user + token
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Login</h2>
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" text="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
