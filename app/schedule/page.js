"use client";
// update

import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";

export default function SchedulePage() {
  const { isAdmin } = useAdmin();

  const [games, setGames] = useState([]);

  // Load saved schedule
  useEffect(() => {
    const saved = localStorage.getItem("games");
    if (saved) {
      setGames(JSON.parse(saved));
    } else {
      setGames([
        { opponent: "Team A", date: "Jan 10", location: "Home" },
        { opponent: "Team B", date: "Jan 15", location: "Away" }
      ]);
    }
  }, []);

  // Save schedule
  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const updateGame = (index, field, value) => {
    const updated = [...games];
    updated[index][field] = value;
    setGames(updated);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Schedule</h1>

      {games.map((game, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          {isAdmin ? (
            <>
              <input
                value={game.opponent}
                onChange={(e) =>
                  updateGame(index, "opponent", e.target.value)
                }
              />
              <input
                value={game.date}
                onChange={(e) =>
                  updateGame(index, "date", e.target.value)
                }
              />
              <input
                value={game.location}
                onChange={(e) =>
                  updateGame(index, "location", e.target.value)
                }
              />
            </>
          ) : (
            <p>
              {game.opponent} - {game.date} ({game.location})
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
