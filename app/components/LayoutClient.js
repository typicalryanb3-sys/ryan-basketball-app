"use client";

import Link from "next/link";
import { useAdmin } from "../../context/AdminContext";

export default function LayoutClient({ children }) {
  const { adminMode, toggleAdmin } = useAdmin();

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
          onClick={toggleAdmin}
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
    </>
  );
}
