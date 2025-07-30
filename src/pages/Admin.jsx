import './Admin.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Mock data
const mockOrders = [
  { id: 1, userId: 1, total: 1150, status: 'pending' },
  { id: 2, userId: 1, total: 600, status: 'approved' },
  { id: 3, userId: 2, total: 800, status: 'pending' },
];

const mockUsers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const mockMeals = [
  { id: 1, name: "Samosa Delight", price: 250 },
  { id: 2, name: "Nyama Choma", price: 600 },
  { id: 3, name: "Biryani", price: 300 },
];

function Admin() {
  const { user } = useAuth();
  const [meals, setMeals] = useState(mockMeals);
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: "", price: "", image: "" });

  const totalOrders = mockOrders.length;
  const totalUsers = mockUsers.length;
  const totalSales = mockOrders.reduce((sum, order) => sum + order.total, 0);

  const handleApprove = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'approved' } : order
      )
    );
  };

  const handleCancel = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      )
    );
  };

  const handleDelete = (id) => {
    alert(`Deleting meal with ID: ${id}`);
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Editing meal with ID: ${id}`);
  };

  const handleAdd = () => {
    setShowForm((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = meals.length + 1;
    setMeals([...meals, { id: newId, ...newMeal }]);
    setNewMeal({ name: "", price: "", image: "" });
    setShowForm(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <h2 className="admin-heading">Admin Panel - Dashboard</h2>
            <div className="admin-stats">
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>{totalOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Total Sales</h3>
                <p>Ksh {totalSales}</p>
              </div>
            </div>
          </>
        );
      case "meals":
        return (
          <>
            <h2 className="admin-heading">Manage Meals</h2>
            <button onClick={handleAdd} className="add-btn">+ Add New Meal</button>
            {showForm && (
              <form onSubmit={handleSubmit} className="add-meal-form">
                <input
                  type="text"
                  placeholder="Meal name"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newMeal.price}
                  onChange={(e) => setNewMeal({ ...newMeal, price: parseInt(e.target.value) })}
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newMeal.image}
                  onChange={(e) => setNewMeal({ ...newMeal, image: e.target.value })}
                  required
                />
                <button type="submit" className="submit-btn">Save Meal</button>
              </form>
            )}

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
      </>
    );
  case "orders":
    return (
      <>
        <h2 className="admin-heading">All Orders</h2>
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const user = mockUsers.find((u) => u.id === order.userId);
              return (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{user?.name || "Unknown"}</td>
                  <td>Ksh {order.total}</td>
                  <td className={`status ${order.status}`}>{order.status}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(order.id)}
                      disabled={order.status === "approved"}
                      className="approve-btn"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleCancel(order.id)}
                      disabled={order.status === "cancelled"}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  case "users":
    return (
      <>
        <h2 className="admin-heading">All Users</h2>
        {mockUsers.map((user) => {
          const userOrders = mockOrders.filter((order) => order.userId === user.id);
          return (
            <div key={user.id} className="user-section">
              <h3>{user.name} — {userOrders.length} Orders</h3>
              <table className="user-order-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>Ksh {order.total}</td>
                      <td>{order.status}</td>
                      <td>
                        <button onClick={() => handleApprove(order.id)}>Approve</button>
                        <button onClick={() => handleCancel(order.id)}>Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </>
    );
  default:
    return null;
}
  };

  return (
    <div className="admin-page">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="brand">MEA<i className="fa-solid fa-utensils" />Y</div>
        <div className="nav-right">
          <ul>
            <li>
              <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/meals" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Menu</NavLink>
            </li>
            <li>
              {user && user.role === "admin" && (
                <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin Panel</NavLink>
              )}
            </li>
            <li className="profile-btn">
              <NavLink to="/profile"><i className="fa-regular fa-circle-user"></i></NavLink>
            </li>
          </ul>
        </div>
      </nav>

  {/* Sidebar + Content layout */}
  <div className="admin-panel-wrapper">
    <aside className="admin-sidebar">
      <ul>
        <li onClick={() => setActiveTab("dashboard")} className={activeTab === "dashboard" ? "active" : ""}>Dashboard</li>
        <li onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "active" : ""}>Orders</li>
        <li onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>Users</li>
        <li onClick={() => setActiveTab("meals")} className={activeTab === "meals" ? "active" : ""}>Meals</li>
      </ul>
    </aside>

    <main className="admin-content">
      {renderContent()}
    </main>
  </div>
</div>
  );
}

export default Admin;