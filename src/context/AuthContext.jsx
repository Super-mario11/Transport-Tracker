// super-mario11/transport-tracker/.../src/context/AuthContext.jsx (Revised)
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Simulated Database (based on your auth.js file and project needs)
const SIMULATED_USERS = [
  { email: "user@example.com", password: "123456", role: "user" },
  { email: "driver@example.com", password: "driver123", role: "driver", vehicleId: 101 }, 
  { email: "admin@example.com", password: "admin123", role: "admin" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // <-- NEW STATE

  // Load session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false); // <-- Set to false once the check is done
  }, []);

  const login = (email, password) => {
    const foundUser = SIMULATED_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
        const userData = { email: foundUser.email, role: foundUser.role };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true, role: foundUser.role };
    }
    return { success: false, message: "Invalid credentials. Try user/admin/driver@example.com." };
  };
  
  const signup = (email, password) => {
    if (SIMULATED_USERS.find(u => u.email === email)) {
        return { success: false, message: "Email already exists." };
    }
    
    // Simulate adding a new default 'user' account
    const newUser = { email, password, role: "user" };
    SIMULATED_USERS.push(newUser); 
    
    // Auto-login after signup
    return login(email, password); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};