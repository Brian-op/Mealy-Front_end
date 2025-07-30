import './Admin.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const mockMeals = [
  { id: 1, name: "Samosa Delight", price: 250 },
  { id: 2, name: "Nyama Choma", price: 600 },
  { id: 3, name: "Biryani", price: 300 },
];

function Admin() {
    const { user } = useAuth();

  const [meals, setMeals] = useState(mockMeals);

  const handleDelete = (id) => {
    alert(`Deleting meal with ID: ${id}`);
    
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Editing meal with ID: ${id}`);
  };

  const handleAdd = () => {
    alert("Adding new meal");
    
  };

  return (
    <div className="admin-page">
        <nav className="navbar">
  <div className="brand">MEA<i className="fa-solid fa-utensils" />Y</div>

  <div className="nav-right">
    <ul>
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
        {user && user.role === "admin" && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Admin Panel
          </NavLink>
        )}
      </li>

      <li className="profile-btn">
        <NavLink to="/profile">
          <i className="fa-regular fa-circle-user"></i>
        </NavLink>
      </li>
    </ul>
  </div>
</nav>

      <h2 className="admin-heading">Admin Panel - Manage Meals</h2>

      <button onClick={handleAdd} className="add-btn">+ Add New Meal</button>

      <div className="admin-table">
        {meals.map((meal) => (
          <div key={meal.id} className="admin-row">
            <p>{meal.name}</p>
            <p>Ksh {meal.price}</p>
            <div className="admin-actions">
              <button className="edit-btn" onClick={() => handleEdit(meal.id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(meal.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
