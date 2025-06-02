import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const updateDishCount = (dishId, count) => {
    setCart(prevCart => ({
      ...prevCart,
      [dishId]: count
    }));
  };

  const getDishCount = (dishId) => {
    return cart[dishId] || 0;
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider value={{ cart, updateDishCount, getDishCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 