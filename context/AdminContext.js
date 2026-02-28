"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminMode");
    if (storedAdmin === "true") {
      setAdminMode(true);
    }
  }, []);

  const toggleAdmin = () => {
    if (!adminMode) {
      const password = prompt("Enter admin password:");
      if (password === "Harley123") {
        setAdminMode(true);
        localStorage.setItem("adminMode", "true");
      } else {
        alert("Incorrect password.");
      }
    } else {
      setAdminMode(false);
      localStorage.removeItem("adminMode");
    }
  };

  return (
    <AdminContext.Provider value={{ adminMode, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
