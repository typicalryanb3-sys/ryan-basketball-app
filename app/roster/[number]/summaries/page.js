"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function PlayerSummariesPage({ params }) {
  const { number } = params;
  const { isAdmin } = useAdmin();

  const [summary, setSummary] = useState("");
  const [injury, setInjury] = useState("");
  const [coachNotes, setCoachNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const docRef = doc(db, "playerSummaries", number);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setSummary(data.summary || "");
          setInjury(data.injury || "");
          setCoachNotes(data.coachNotes || "");
        }
      } catch (error) {
        console.error("Error loading player summary:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, [number]);

  const saveAll = async () => {
    try {
      await setDoc(doc(db, "playerSummaries", number), {
        summary,
        injury,
        coachNotes,
      });
      alert("Player summary saved!");
    } catch (error) {
      console.error("Error saving player summary:", error);
      alert("Failed to save player summary.");
    }
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

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
