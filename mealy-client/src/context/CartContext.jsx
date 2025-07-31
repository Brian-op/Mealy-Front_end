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
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === meal.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...meal, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (mealId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== mealId)
    );
  };

  const increaseQuantity = (mealId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === mealId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (mealId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === mealId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
