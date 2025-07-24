import React from "react";

const MealsPage = () => {
  // Mock data for now — will be replaced with backend fetch
  const meals = [
    { id: 1, name: "Grilled Chicken", price: 500 },
    { id: 2, name: "Veggie Pasta", price: 400 },
    { id: 3, name: "Beef Burger", price: 650 },
  ];

  return (
    <div>
      <h1 style={headerStyle}>🍽️ Meals</h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (Ksh)</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.id}>
              <td>{meal.name}</td>
              <td>{meal.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle = {
  fontSize: "28px",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

export default MealsPage;
