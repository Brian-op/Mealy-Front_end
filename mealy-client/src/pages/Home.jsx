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
        <li className='tooltip'>
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <i class="fa-regular fa-house"></i>
            <span className="tooltiptext">Home</span>
          </NavLink>
        </li>
        <li className='tooltip'>
          <NavLink to="/meals" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <i class="fa-solid fa-utensils"></i>
            <span className="tooltiptext">Menu</span>
          </NavLink>
        </li>
        <li className='tooltip'>
          <NavLink to="/meals" className="order-now">
            <i class="fa-solid fa-bell-concierge"></i>
            <span className="tooltiptext">Order Now</span>
          </NavLink>
        </li>
        <li className='tooltip'>
        {user && user.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Admin Panel
                <span className="tooltiptext">Admin Panel</span>
              </NavLink>
            )}
            </li>
      </ul>
      <div className='tooltip'>
      <div className="profile-icon">
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <i className="fa-regular fa-circle-user"></i>
          <span className="tooltiptext">Profile</span>
        </NavLink>
        </div>
      </div>
      </div>
 
    </div>

    <div className="hero-text">
      <h1>MORE THAN FINGER<br />LICKING GOOD!</h1>
      <p>Get the best quality and tasty meals</p>
      <div className='tooltip'>
      <NavLink to="/meals" className="cta-btn">Order Food</NavLink>
      <span className="tooltiptext">Order Food in Menu</span>
      </div>
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
