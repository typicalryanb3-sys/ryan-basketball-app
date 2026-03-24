"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";

export default function GameSummaryPage() {
  const { isAdmin } = useAdmin();

  const [latestGame, setLatestGame] = useState("");
  const [teamPerformance, setTeamPerformance] = useState("");
  const [injuries, setInjuries] = useState("");
  const [announcements, setAnnouncements] = useState("");

  useEffect(() => {
    const savedLatestGame = localStorage.getItem("summary-latestGame");
    const savedTeamPerformance = localStorage.getItem("summary-teamPerformance");
    const savedInjuries = localStorage.getItem("summary-injuries");
    const savedAnnouncements = localStorage.getItem("summary-announcements");

    if (savedLatestGame) setLatestGame(savedLatestGame);
    if (savedTeamPerformance) setTeamPerformance(savedTeamPerformance);
    if (savedInjuries) setInjuries(savedInjuries);
    if (savedAnnouncements) setAnnouncements(savedAnnouncements);
  }, []);

  const saveAll = () => {
    localStorage.setItem("summary-latestGame", latestGame);
    localStorage.setItem("summary-teamPerformance", teamPerformance);
    localStorage.setItem("summary-injuries", injuries);
    localStorage.setItem("summary-announcements", announcements);
    alert("Game Summary saved!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Summaries & Updates</h1>

      <section style={{ marginTop: 30 }}>
        <h2>🏀 Latest Game Recap</h2>
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
        <h2>📊 Team Performance</h2>
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
        <h2>🚑 Injury Updates</h2>
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
        <h2>📢 Announcements</h2>
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
