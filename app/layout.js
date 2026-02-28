"use client";

import Link from "next/link";
import { AdminProvider, useAdmin } from "../context/AdminContext";

function LayoutContent({ children }) {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AdminProvider>
          <LayoutContent>{children}</LayoutContent>
        </AdminProvider>
      </body>
    </html>
  );
}
