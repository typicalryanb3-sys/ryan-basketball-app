"use client";

import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

export default function GameSummaryPage() {
  const { adminMode } = useAdmin();

  const [latestGame, setLatestGame] = useState(
    "Add your full team game summary here."
  );
  const [editingLatest, setEditingLatest] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Summaries & Updates</h1>

      <section style={{ marginTop: 30 }}>
        <h2 style={{ display: "flex", alignItems: "center" }}>
          🏀 Latest Game Recap

          {adminMode && !editingLatest && (
            <button
              onClick={() => setEditingLatest(true)}
              style={{ marginLeft: 15 }}
            >
              Edit
            </button>
          )}
        </h2>

        {editingLatest ? (
          <>
            <textarea
              value={latestGame}
              onChange={(e) => setLatestGame(e.target.value)}
              rows={4}
              style={{ width: "100%" }}
            />
            <button
              onClick={() => setEditingLatest(false)}
              style={{ marginTop: 10 }}
            >
              Save
            </button>
          </>
        ) : (
          <p>{latestGame}</p>
        )}
      </section>
    </div>
  );
}
