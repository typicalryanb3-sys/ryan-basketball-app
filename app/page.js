"use client";

import { useState } from "react";
import { useAdmin } from "./context/AdminContext";

export default function HomePage() {
  const { isAdmin } = useAdmin();

  const [latestGame, setLatestGame] = useState(
    "Add your full team game summary here."
  );
  const [teamPerformance, setTeamPerformance] = useState(
    "Add overall team performance notes here."
  );
  const [injuries, setInjuries] = useState(
    "Add team injury updates here."
  );
  const [announcements, setAnnouncements] = useState(
    "Add announcements here."
  );

  const [editingSection, setEditingSection] = useState(null);

  const renderSection = (title, value, setValue, key) => (
    <section style={{ marginTop: 30 }}>
      <h2 style={{ display: "flex", alignItems: "center" }}>
        {title}

     {isAdmin && editingSection !== key && (
          <button
            onClick={() => setEditingSection(key)}
            style={{ marginLeft: 15 }}
          >
            Edit
          </button>
        )}
      </h2>

      {editingSection === key ? (
        <>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
          <button
            onClick={() => setEditingSection(null)}
            style={{ marginTop: 10 }}
          >
            Save
          </button>
        </>
      ) : (
        <p>{value}</p>
      )}
    </section>
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Summaries & Updates</h1>

      {renderSection("🏀 Latest Game Recap", latestGame, setLatestGame, "latest")}
      {renderSection("📊 Team Performance", teamPerformance, setTeamPerformance, "performance")}
      {renderSection("🚑 Injury Updates", injuries, setInjuries, "injuries")}
      {renderSection("📢 Announcements", announcements, setAnnouncements, "announcements")}
    </div>
  );
}
