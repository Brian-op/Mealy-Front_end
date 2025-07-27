import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (email && password) {
      const role = email.includes('admin') ? 'admin' : 'user';
      login(email, role); 
      navigate('/home');
    }
  };

  return (
    <div className="auth-wrapper">
      <h2 className="auth-title-floating">SIGN UP</h2>
      <div className="auth-container">
        <div className="auth-card">
          <form onSubmit={handleSignup}>
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
            <button type="submit" className="auth-btn">Create Account</button>
          </form>
          <p className="auth-link">
            Already have an account? <Link to="/login">LOGIN</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
