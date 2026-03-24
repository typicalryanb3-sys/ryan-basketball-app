"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";

export default function PlayerSummariesPage({ params }) {
  const { number } = params;
  const { isAdmin } = useAdmin();

  const [summary, setSummary] = useState("");
  const [injury, setInjury] = useState("");
  const [coachNotes, setCoachNotes] = useState("");

  useEffect(() => {
    const savedSummary = localStorage.getItem(`player-summary-${number}`);
    const savedInjury = localStorage.getItem(`player-injury-${number}`);
    const savedCoachNotes = localStorage.getItem(`player-coachNotes-${number}`);

    if (savedSummary) setSummary(savedSummary);
    if (savedInjury) setInjury(savedInjury);
    if (savedCoachNotes) setCoachNotes(savedCoachNotes);
  }, [number]);

  const saveAll = () => {
    localStorage.setItem(`player-summary-${number}`, summary);
    localStorage.setItem(`player-injury-${number}`, injury);
    localStorage.setItem(`player-coachNotes-${number}`, coachNotes);
    alert("Player summary saved!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Player Summaries</h1>
      <h2>Jersey #{number}</h2>

      <section style={{ marginTop: 20 }}>
        <h3>Latest Performance</h3>
        {isAdmin ? (
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            placeholder="Add player performance summary here"
          />
        ) : (
          <p>{summary || "No performance summary yet."}</p>
        )}
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Injury Status</h3>
        {isAdmin ? (
          <textarea
            value={injury}
            onChange={(e) => setInjury(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
            placeholder="Add injury update here"
          />
        ) : (
          <p>{injury || "No injuries reported."}</p>
        )}
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Coach Notes</h3>
        {isAdmin ? (
          <textarea
            value={coachNotes}
            onChange={(e) => setCoachNotes(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            placeholder="Add coach notes here"
          />
        ) : (
          <p>{coachNotes || "No coach notes yet."}</p>
        )}
      </section>

      {isAdmin && (
        <button onClick={saveAll} style={{ marginTop: 20 }}>
          Save Player Summary
        </button>
      )}
    </div>
  );
}
