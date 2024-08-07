import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update user state
  const updateUser = (newUser) => {
    setUser(newUser);
    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = () => useContext(UserContext);
