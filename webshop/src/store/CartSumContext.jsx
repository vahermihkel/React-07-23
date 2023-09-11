import React, { createContext, useState } from 'react';

// Create a new context
export const CartSumContext = createContext();

// Create a custom provider component
export function CartSumContextProvider({ children }) {
  const [cartSum, setCartSum] = useState("initial value");

  return (
    <CartSumContext.Provider value={{ cartSum, setCartSum }}>
      {children}
    </CartSumContext.Provider>
  );
}