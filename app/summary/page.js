"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function GameSummaryPage() {
  const { isAdmin } = useAdmin();

  const [latestGame, setLatestGame] = useState("");
  const [teamPerformance, setTeamPerformance] = useState("");
  const [injuries, setInjuries] = useState("");
  const [announcements, setAnnouncements] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const docRef = doc(db, "gameSummary", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLatestGame(data.latestGame || "");
          setTeamPerformance(data.teamPerformance || "");
          setInjuries(data.injuries || "");
          setAnnouncements(data.announcements || "");
        }
      } catch (error) {
        console.error("Error loading summary:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  const saveAll = async () => {
    try {
      await setDoc(doc(db, "gameSummary", "main"), {
        latestGame,
        teamPerformance,
        injuries,
        announcements,
      });

      alert("Game Summary saved!");
    } catch (error) {
      console.error("Error saving summary:", error);
      alert("Failed to save summary.");
    }
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Summaries & Updates</h1>

      <section style={{ marginTop: 30 }}>
        <h2>Latest Game Recap</h2>
        {isAdmin ? (
          <textarea
            value={latestGame}
            onChange={(e) => setLatestGame(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            placeholder="Add your latest game recap here"
          />
        ) : (
          <p>{latestGame || "No game recap yet."}</p>
        )}
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Team Performance</h2>
        {isAdmin ? (
          <textarea
            value={teamPerformance}
            onChange={(e) => setTeamPerformance(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            placeholder="Add team performance notes here"
          />
        ) : (
          <p>{teamPerformance || "No team performance updates yet."}</p>
        )}
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Injury Updates</h2>
        {isAdmin ? (
          <textarea
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            placeholder="Add injury updates here"
          />
        ) : (
          <p>{injuries || "No injury updates yet."}</p>
        )}
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Announcements</h2>
        {isAdmin ? (
          <textarea
            value={announcements}
            onChange={(e) => setAnnouncements(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            placeholder="Add announcements here"
          />
        ) : (
          <p>{announcements || "No announcements yet."}</p>
        )}
      </section>

      {isAdmin && (
        <button onClick={saveAll} style={{ marginTop: 20 }}>
          Save Game Summary
        </button>
      )}
    </div>
  );
}
