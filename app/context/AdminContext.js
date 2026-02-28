"use client";

import { createContext, useContext, useState } from "react";

const AdminContext = createContext({
  isAdmin: false,
  login: () => {},
  logout: () => {}
});
export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (password) => {
    if (password === "coach123") {
      setIsAdmin(true);
    } else {
      alert("Wrong password");
    }
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
