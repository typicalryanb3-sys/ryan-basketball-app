"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";

const players = [
  { name: "Brody Ludwig", number: 30, position: "PG" },
  { name: "Kaden Dorshner", number: 34, position: "SF" },
  { name: "Tripp Johnson", number: 23, position: "C" },
  { name: "Jimmy Peplinski", number: 33, position: "PF" },
  { name: "Lambeau Zilliges", number: 22, position: "SG" },
  { name: "Kellen Gaurd", number: 20, position: "SF" },
  { name: "Jax Grutza", number: 13, position: "PF" },
  { name: "Reed Gigantige", number: 1, position: "SG" },
  { name: "Mack Zuleger", number: 42, position: "PG" },
  { name: "Karson Betka", number: 50, position: "C" },
  { name: "Ian Weiting", number: 51, position: "PG" },
  { name: "Ryan Bendtschneider", number: 44, position: "PF" },
  { name: "Fritz Koeler", number: 31, position: "C" },
];

export default function PlayerPage({ params }) {
  const { isAdmin } = useAdmin();
  const playerNumber = parseInt(params.number);
  const player = players.find((p) => p.number === playerNumber);

  const [stats, setStats] = useState({
    ppg: "",
    rpg: "",
    apg: "",
  });

  useEffect(() => {
    if (!player) return;

    const savedStats = localStorage.getItem(`player-stats-${player.number}`);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [player]);

  useEffect(() => {
    if (!player) return;
    localStorage.setItem(`player-stats-${player.number}`, JSON.stringify(stats));
  }, [stats, player]);

  if (!player) {
    return <div style={{ padding: 20 }}>Player not found.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Link href="/roster">← Back to Roster</Link>

      <h1>{player.name}</h1>
      <h2>
        #{player.number} • {player.position}
      </h2>

      <div style={{ marginTop: 20 }}>
        <h3>Stats</h3>

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
