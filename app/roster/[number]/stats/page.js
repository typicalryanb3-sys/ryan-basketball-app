"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function PlayerStatsPage({ params }) {
  const { number } = params;
  const { isAdmin } = useAdmin();

  const [stats, setStats] = useState({
    ppg: "",
    rpg: "",
    apg: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const docRef = doc(db, "playerStats", number);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStats({
            ppg: data.ppg || "",
            rpg: data.rpg || "",
            apg: data.apg || "",
          });
        }
      } catch (error) {
        console.error("Error loading player stats:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [number]);

  const saveStats = async () => {
    try {
      await setDoc(doc(db, "playerStats", number), stats);
      alert("Stats saved!");
    } catch (error) {
      console.error("Error saving stats:", error);
      alert("Failed to save stats.");
    }
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

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

            <button onClick={saveStats} style={{ marginTop: 20 }}>
              Save Stats
            </button>
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
