import { useCart } from '../context/CartContext';
import './Order.css';
import { NavLink } from 'react-router-dom';

function Order() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const total = cart.reduce(
    (sum, meal) => sum + meal.price * meal.quantity,
    0
  );

  return (
    <div className="order-page">
      {/* Top Navbar */}
      <nav className="order-navbar">
        <NavLink to="/home" className="nav-link">Home</NavLink>
        <NavLink to="/meals" className="nav-link">Menu</NavLink>
      </nav>

      <div className="order-wrapper">
        <h2 className="order-heading">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((meal) => (
              <div key={meal.id} className="cart-item">
                <img src={meal.image} alt={meal.name} />
                <div>
                  <p>{meal.name}</p>
                  <p>Price: Ksh {meal.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(meal.id)}>-</button>
                    <span>Qty: {meal.quantity}</span>
                    <button onClick={() => increaseQuantity(meal.id)}>+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(meal.id)}
                    className="remove-btn"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
            <h3>Total: Ksh {total}</h3>
            <button
              className="place-order-btn"
              onClick={() => {
                alert("🎉 Order placed successfully!");
                clearCart();
                setTimeout(() => {
                  window.location.href = "/meals";
                }, 1000);
              }}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
