import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (meal) => {
    if (!cartItems.find((item) => item.id === meal.id)) {
      setCartItems([...cartItems, meal]);
    }
  };

  const removeFromCart = (mealId) => {
    setCartItems(cartItems.filter((item) => item.id !== mealId));
  };

  const clearCart = () => setCartItems([]);

  const checkout = () => {

    console.log("Submitting order:", cartItems);
    clearCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
