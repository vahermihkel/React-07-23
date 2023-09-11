import React, { createContext, useState } from 'react';

// Create a new context
export const AuthContext = createContext();

// Create a custom provider component
export function AuthContextProvider({ children }) { // Õiges arenduses, tuleb kontrollida tokeni valiidsust
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("token") !== null);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}