"use client";

import { useState, useEffect } from "react";

export default function PlayerStatsPage({ params }) {
  const { number } = params;

  const [stats, setStats] = useState({
    ppg: "",
    rpg: "",
    apg: "",
  });

  // Load saved stats
  useEffect(() => {
    const saved = localStorage.getItem(`stats-${number}`);
    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, [number]);

  // Save stats
  const saveStats = () => {
    localStorage.setItem(`stats-${number}`, JSON.stringify(stats));
    alert("Stats saved!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Player Stats</h1>
      <h2>Jersey #{number}</h2>

      <div style={{ marginTop: 20 }}>
        <div>
          <label>PPG: </label>
          <input
            value={stats.ppg}
            onChange={(e) =>
              setStats({ ...stats, ppg: e.target.value })
            }
          />
        </div>

        <div>
          <label>RPG: </label>
          <input
            value={stats.rpg}
            onChange={(e) =>
              setStats({ ...stats, rpg: e.target.value })
            }
          />
        </div>

        <div>
          <label>APG: </label>
          <input
            value={stats.apg}
            onChange={(e) =>
              setStats({ ...stats, apg: e.target.value })
            }
          />
        </div>
      </div>

      <button onClick={saveStats} style={{ marginTop: 20 }}>
        Save Stats
      </button>
    </div>
  );
}
