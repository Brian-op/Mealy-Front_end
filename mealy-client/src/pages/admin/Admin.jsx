import './Admin.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api'; // Axios instance

function Admin() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: "", price: "", image: "" });

  useEffect(() => {
    API.get('/meals')
      .then(res => setMeals(res.data))
      .catch(err => console.error("Failed to fetch meals", err));
  }, []);

  useEffect(() => {
    API.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to fetch orders", err));
  }, []);

  useEffect(() => {
    API.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  const handleApprove = (orderId) => {
    API.patch(`/orders/${orderId}`, { status: 'approved' })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: 'approved' } : order
          )
        );
      })
      .catch(err => console.error("Failed to approve order", err));
  };

  const handleCancel = (orderId) => {
    API.patch(`/orders/${orderId}`, { status: 'cancelled' })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: 'cancelled' } : order
          )
        );
      })
      .catch(err => console.error("Failed to cancel order", err));
  };

  const handleDelete = (id) => {
    API.delete(`/meals/${id}`)
      .then(() => setMeals(meals.filter(meal => meal.id !== id)))
      .catch(err => console.error("Failed to delete meal", err));
  };

  const handleEdit = (id) => {
    alert(`Editing meal with ID: ${id}`);
  };

  const handleAdd = () => {
    setShowForm((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/meals', newMeal)
      .then(res => {
        setMeals([...meals, res.data]);
        setNewMeal({ name: "", price: "", image: "" });
        setShowForm(false);
      })
      .catch(err => console.error("Failed to add meal", err));
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
                  const user = users.find((u) => u.id === order.user_id);
                  return (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{user?.name || "Unknown"}</td>
                      <td>Ksh {order.total}</td>
                      <td className={`status ${order.status}`}>{order.status}</td>
                      <td>
                        <button onClick={() => handleApprove(order.id)} disabled={order.status === "approved"} className="approve-btn">Approve</button>
                        <button onClick={() => handleCancel(order.id)} disabled={order.status === "cancelled"} className="cancel-btn">Cancel</button>
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
            {users.map((user) => {
              const userOrders = orders.filter((order) => order.user_id === user.id);
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
      <nav className="navbar">
        <div className="brand">MEA<i className="fa-solid fa-utensils" />Y</div>
        <div className="nav-right">
          <ul>
            <li className='tooltip'>
              <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i class="fa-regular fa-house"></i></NavLink>
               <span className="tooltiptext">Home</span>
            </li>
            <li className='tooltip'>
              <NavLink to="/meals" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}><i class="fa-solid fa-utensils"></i></NavLink>
               <span className="tooltiptext">Menu</span>
            </li>
            <li className='tooltip'>
              {user && user.role === "admin" && (
                <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin Panel</NavLink>
              )}
              <span className="tooltiptext">Admin Panel</span>
            </li>
            <div className='tooltip'>
            <li className="profile-btn">
              <NavLink to="/profile"><i className="fa-regular fa-circle-user"></i></NavLink>
              <span className="tooltiptext">Profile</span>
            </li>
            </div>
          </ul>
        </div>
      </nav>

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
