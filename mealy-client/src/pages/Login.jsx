import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = (e) => {
  e.preventDefault();

  if (email && password) {
    const role = email.includes("admin") ? "admin" : "user";
    login(email, role); 
    navigate("/home");
  }
};


  return (
    <div className="auth-wrapper">
      <h2 className="auth-title-floating">LOGIN</h2>
      <div className="auth-container">
        <div className="auth-card">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn">Login</button>
          </form>
          <p className="auth-link">
            Don't have an account? <Link to="/signup">SIGN UP</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
