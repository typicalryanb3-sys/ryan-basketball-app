"use client";

import Link from "next/link";
import { useAdmin } from "../context/AdminContext";

export default function LayoutClient({ children }) {
  const { isAdmin, login, logout } = useAdmin();

  const handleAdminClick = () => {
    if (isAdmin) {
      logout();
    } else {
      const password = prompt("Enter admin password");
      if (password !== null) {
        login(password);
      }
    }
  };

  return (
    <>
      <nav
        style={{
          padding: 15,
          borderBottom: "2px solid black",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ marginRight: 20 }}>
          Home
        </Link>

        <Link href="/roster" style={{ marginRight: 20 }}>
          Roster
        </Link>

        <Link href="/summary" style={{ marginRight: 20 }}>
          Game Summary
        </Link>

        <Link href="/schedule" style={{ marginRight: 20 }}>
          Game Schedule
        </Link>

        <button
          onClick={handleAdminClick}
          style={{
            marginLeft: "auto",
            background: isAdmin ? "green" : "gray",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          {isAdmin ? "Exit Admin" : "Admin"}
        </button>
      </nav>

      {children}
    </>
  );
}
