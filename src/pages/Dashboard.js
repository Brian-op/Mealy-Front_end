import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [menu, setMenu] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/menu", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((r) => {
        if (r.ok) return r.json();
        throw new Error("Failed to fetch menu");
      })
      .then((data) => setMenu(data))
      .catch((err) => setMessage(err.message));
  }, [navigate]);

  const handleOrder = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ meal_id: selectedMeal })
    })
      .then((r) => {
        if (r.ok) return r.json();
        throw new Error("Order failed");
      })
      .then(() => setMessage("Order placed successfully"))
      .catch((err) => setMessage(err.message));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header>
        <h2>Today's Menu</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {message && <p>{message}</p>}

      {menu.length === 0 ? (
        <p>No menu available for today.</p>
      ) : (
        <form onSubmit={handleOrder}>
          {menu.map((meal) => (
            <div key={meal.id}>
              <input
                type="radio"
                name="meal"
                value={meal.id}
                checked={selectedMeal === meal.id.toString()}
                onChange={(e) => setSelectedMeal(e.target.value)}
              />
              <label>{meal.name}</label>
            </div>
          ))}
          <button type="submit" disabled={!selectedMeal}>
            Submit Order
          </button>
        </form>
      )}
    </div>
  );
}

export default Dashboard;
