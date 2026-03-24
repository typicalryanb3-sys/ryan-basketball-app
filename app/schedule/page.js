"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function SchedulePage() {
  const { isAdmin } = useAdmin();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSchedule() {
      try {
        const docRef = doc(db, "schedule", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setGames(data.games || []);
        } else {
          setGames([
            { opponent: "Team A", date: "Jan 10", location: "Home" },
            { opponent: "Team B", date: "Jan 15", location: "Away" }
          ]);
        }
      } catch (error) {
        console.error("Error loading schedule:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSchedule();
  }, []);

  const updateGame = (index, field, value) => {
    const updated = [...games];
    updated[index][field] = value;
    setGames(updated);
  };

  const addGame = () => {
    setGames([
      ...games,
      { opponent: "", date: "", location: "" }
    ]);
  };

  const saveSchedule = async () => {
    try {
      await setDoc(doc(db, "schedule", "main"), {
        games
      });
      alert("Schedule saved!");
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert("Failed to save schedule.");
    }
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Schedule</h1>

      {games.map((game, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          {isAdmin ? (
            <>
              <div style={{ marginBottom: 8 }}>
                <label>Opponent: </label>
                <input
                  value={game.opponent}
                  onChange={(e) => updateGame(index, "opponent", e.target.value)}
                />
              </div>

              <div style={{ marginBottom: 8 }}>
                <label>Date: </label>
                <input
                  value={game.date}
                  onChange={(e) => updateGame(index, "date", e.target.value)}
                />
              </div>

              <div style={{ marginBottom: 8 }}>
                <label>Location: </label>
                <input
                  value={game.location}
                  onChange={(e) => updateGame(index, "location", e.target.value)}
                />
              </div>
            </>
          ) : (
            <p>
              {game.opponent} - {game.date} - {game.location}
            </p>
          )}
        </div>
      ))}

      {isAdmin && (
        <>
          <button onClick={addGame} style={{ marginRight: 10 }}>
            Add Game
          </button>

          <button onClick={saveSchedule}>
            Save Schedule
          </button>
        </>
      )}
    </div>
  );
}
