import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post('/login', {
        email,
        password,
      });

      const { token, role } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Optional: attach token globally if needed (already done in api.js now)
      // attachToken(token);

      // Login via AuthContext
      login(email, role || 'user'); // fallback to 'user' if role isn't provided

      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
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

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <p className="auth-link">
            Don't have an account? <Link to="/signup">SIGN UP</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
