import './Profile.css';
import { useNavigate } from 'react-router-dom';

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
