import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../context/AuthContext'; 


function Home() {
  const { user } = useAuth();
  return (
   <div className="hero">
  <div className="glass-container">
    <div className="nav">
      <div className="brand">MEA<i className="fa-solid fa-utensils"/>Y</div>
      <div className='nav-right'>     <ul>
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/meals" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/meals" className="order-now">
            Order Now
          </NavLink>
        </li>
        <li>
        {user && user.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Admin Panel
              </NavLink>
            )}
            </li>
      </ul>
      <div className="profile-icon">
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <i className="fa-regular fa-circle-user"></i>
        </NavLink>
      </div>
      </div>
 
    </div>

    <div className="hero-text">
      <h1>MORE THAN FINGER<br />LICKING GOOD!</h1>
      <p>Get the best quality and tasty meals</p>
      <NavLink to="/meals" className="cta-btn">Order Food</NavLink>
    </div>
  </div>

  <footer className="footer">
    <div className="footer-left">
      <i className="fa-brands fa-instagram"></i>
      <i className="fa-brands fa-x-twitter"></i>
      <p>&copy; {new Date().getFullYear()} Mealy. All rights reserved.</p>
    </div>
    <div className="footer-right">
      <p>Contact Us <i className="fa-solid fa-phone"></i></p>
      <p>Private Policy</p>
    </div>
  </footer>
</div>

  );
}

export default Home;
