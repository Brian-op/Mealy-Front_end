import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    
    const storedCart = localStorage.getItem("meally_cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("meally_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (meal) => {
    setCart((prev) => [...prev, meal]);
  };

  const removeFromCart = (mealId) => {
    setCart((prev) => prev.filter((item) => item.id !== mealId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
