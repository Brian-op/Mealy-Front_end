import './Menu.css';
import { useCart } from '../context/CartContext';
import { NavLink } from 'react-router-dom';
import meal1 from '../assets/samosa.jpg';
import meal2 from '../assets/nyama choma.jpg';
import meal3 from '../assets/Biryani.jpg';
import meal4 from '../assets/chickencurry.jpg';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';



const mealsList = [
  { id: 1, name: 'Samosa Delight', image: meal1, price: 250 },
  { id: 2, name: 'Nyama Choma', image: meal2, price: 600 },
  { id: 3, name: 'Biryani', image: meal3, price: 300 },
  { id: 4, name: 'Chicken Curry', image: meal4, price: 500 },
];

function Menu() {
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const [search, setSearch] = useState("");

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredMeals = mealsList.filter((meal) =>
    meal.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="menu-page">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">MEA<i class="fa-solid fa-utensils"/>Y</h1>
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
          <li className='tooltip'> <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <i class="fa-solid fa-utensils"></i>
          <span className="tooltiptext">Menu</span>
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
            <div className='tooltip'>
              <li className='profile-btn'><NavLink to="/profile"><i class="fa-regular fa-circle-user"></i></NavLink></li>
              <span className="tooltiptext">Profile</span>
            </div>

        </ul>
      </nav>

      {/* Hero */}
      <div className="menu-hero">
        <h1>Get Your Favorite Meals Now</h1>
      </div>

      {/* Search Bar */}
      <div className='search-section'>
        <div className="search-container">
          <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="search"
          placeholder="Search Meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

       <NavLink to="/order" className="cart-btn-cart">
         Go to Cart 🛒 {cart.reduce((sum, item) => sum + item.quantity, 0)}
       </NavLink>

      </div>
      </div>
      


      {/* Meal Cards */}
      <div className="meal-grid">
        {filteredMeals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <img src={meal.image} alt={meal.name} />
            <div className="meal-details">
              <p className="meal-name">{meal.name}</p>
              <p className="meal-price">Ksh {meal.price}</p>
               <button onClick={() => addToCart(meal)} className="cart-btn">
                Add to Cart <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
