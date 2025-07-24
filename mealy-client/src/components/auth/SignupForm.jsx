import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";
import "./auth.css"; 

const SignupForm = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      login(data.user, data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Sign Up</h2>
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <FormInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

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

        {/* Optional: Role selector (customer/admin) */}
        <label htmlFor="role">Sign up as:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Caterer</option>
        </select>

        <Button type="submit" text="Sign Up" />
      </form>
    </div>
  );
};

export default SignupForm;
