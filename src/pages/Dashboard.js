import React, { useEffect, useState } from "react";

function Dashboard() {
  const [menu, setMenu] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/menu/today", {
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
  }, []);

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

  return (
    <div className="dashboard">
      <h2>Today's Menu</h2>
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
