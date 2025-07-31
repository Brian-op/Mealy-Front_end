import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const user = {
    name: "Kassim",
    email: "admin@example.com"
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <nav className='navbar-p'>
        <ul>
          <li className='tooltip'>  <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <i class="fa-regular fa-house"></i>
          <span className="tooltiptext">Home</span>
        </NavLink></li>
        </ul>
      </nav>

      <h2 className="profile-heading">My Profile</h2>
      <div className="profile-card">
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
