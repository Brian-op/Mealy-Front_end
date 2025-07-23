import React, { useState } from "react";
import BASE_URL from "../config";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful ");
      } else {
        setMessage(data.error || "Signup failed ");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong ");
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} /><br />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
