"use client";

import { useState } from "react";

export default function GameSummaryPage() {
  const [adminMode, setAdminMode] = useState(false);
  const [latestGame, setLatestGame] = useState("Add your full team game summary here.");
  const [injuries, setInjuries] = useState("Add team injury updates here.");

  const handleAdminLogin = () => {
    const password = prompt("Enter admin password:");
    if (password === "Harley123") {
      setAdminMode(true);
    } else {
      alert("Incorrect password.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Summaries & Updates</h1>

      {!adminMode && (
        <button onClick={handleAdminLogin} style={{ marginBottom: 20 }}>
          Enter Admin Mode
        </button>
      )}

      {adminMode && (
        <p style={{ color: "green", marginBottom: 20 }}>
          Admin Mode Active
        </p>
      )}

      <section style={{ marginTop: 20 }}>
        <h2>🏀 Latest Game Recap</h2>

        {adminMode ? (
          <textarea
            value={latestGame}
            onChange={(e) => setLatestGame(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        ) : (
          <p>{latestGame}</p>
        )}
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>🚑 Injury Updates</h2>

        {adminMode ? (
          <textarea
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
          />
        ) : (
          <p>{injuries}</p>
        )}
      </section>
    </div>
  );
}
