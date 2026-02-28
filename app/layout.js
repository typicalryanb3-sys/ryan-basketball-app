"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function RootLayout({ children }) {
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminMode");
    if (storedAdmin === "true") {
      setAdminMode(true);
    }
  }, []);

  const handleAdminToggle = () => {
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
    <html lang="en">
      <body style={{ margin: 0 }}>
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
            onClick={handleAdminToggle}
            style={{
              marginLeft: "auto",
              background: adminMode ? "green" : "gray",
              color: "white",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            {adminMode ? "Exit Admin" : "Admin"}
          </button>
        </nav>

        {children}
      </body>
    </html>
  );
}
