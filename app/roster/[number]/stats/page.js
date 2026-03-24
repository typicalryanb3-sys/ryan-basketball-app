"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";

export default function PlayerStatsPage({ params }) {
  const { number } = params;
  const { isAdmin } = useAdmin();

  const [stats, setStats] = useState({
    ppg: "",
    rpg: "",
    apg: "",
  });

  useEffect(() => {
    const savedStats = localStorage.getItem(`player-stats-${number}`);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [number]);

  useEffect(() => {
    localStorage.setItem(`player-stats-${number}`, JSON.stringify(stats));
  }, [stats, number]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Player Stats</h1>
      <h2>Jersey #{number}</h2>

      <div style={{ marginTop: 20 }}>
        {isAdmin ? (
          <>
            <div style={{ marginBottom: 10 }}>
              <label>PPG: </label>
              <input
                value={stats.ppg}
                onChange={(e) =>
                  setStats({ ...stats, ppg: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>RPG: </label>
              <input
                value={stats.rpg}
                onChange={(e) =>
                  setStats({ ...stats, rpg: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>APG: </label>
              <input
                value={stats.apg}
                onChange={(e) =>
                  setStats({ ...stats, apg: e.target.value })
                }
              />
            </div>
          </>
        ) : (
          <>
            <p>PPG: {stats.ppg || "N/A"}</p>
            <p>RPG: {stats.rpg || "N/A"}</p>
            <p>APG: {stats.apg || "N/A"}</p>
          </>
        )}
      </div>
    </div>
  );
}
