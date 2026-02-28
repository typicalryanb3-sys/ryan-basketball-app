"use client";

import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

export default function SchedulePage() {
  const { isAdmin } = useAdmin();

  const [games, setGames] = useState([
    { opponent: "Team A", date: "Jan 10", location: "Home" },
    { opponent: "Team B", date: "Jan 15", location: "Away" },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Schedule</h1>

      {games.map((game, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          {editingIndex === index ? (
            <>
              <input
                value={game.opponent}
                onChange={(e) => {
                  const updated = [...games];
                  updated[index].opponent = e.target.value;
                  setGames(updated);
                }}
              />
              <input
                value={game.date}
                onChange={(e) => {
                  const updated = [...games];
                  updated[index].date = e.target.value;
                  setGames(updated);
                }}
              />
              <input
                value={game.location}
                onChange={(e) => {
                  const updated = [...games];
                  updated[index].location = e.target.value;
                  setGames(updated);
                }}
              />
              <button onClick={() => setEditingIndex(null)}>Save</button>
            </>
          ) : (
            <>
              <p>
                {game.date} – {game.opponent} ({game.location})
              </p>

              {isAdmin && (
                <button onClick={() => setEditingIndex(index)}>
                  Edit
                </button>
              )}
            </>
          )}
        </div>
      ))}

      {isAdmin && (
        <button
          onClick={() =>
            setGames([
              ...games,
              { opponent: "New Team", date: "TBD", location: "TBD" },
            ])
          }
        >
          Add Game
        </button>
      )}
    </div>
  );
}
