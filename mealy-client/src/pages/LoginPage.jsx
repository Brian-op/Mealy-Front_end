import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/shared/Header";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Fake login logic for now
    localStorage.setItem("token", "fake-jwt-token");
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input type="email" placeholder="Email" required style={styles.input} />
          <input type="password" placeholder="Password" required style={styles.input} />
          <button type="submit" style={styles.button}>Log In</button>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "400px",
    margin: "2rem auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default LoginPage;
