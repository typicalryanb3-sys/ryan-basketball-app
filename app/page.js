
"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useAdmin } from "./context/AdminContext";

const defaults = {
  title: "Ryan's Basketball App",
  teamName: "Crivitz 7th Grade Boys Basketball",
  welcome: "Welcome to the official team app.",
  nextGameTitle: "Next Game",
  nextGame: "Game schedule coming soon.",
  recordTitle: "Team Record",
  wins: "0",
  losses: "0",
};

export default function HomePage() {
  const { isAdmin } = useAdmin();

  const [data, setData] = useState(defaults);
  const [draft, setDraft] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const ref = doc(db, "homePage", "main");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const updated = snapshot.exists()
          ? { ...defaults, ...snapshot.data() }
          : defaults;

        setData(updated);
        setLoading(false);
      },
      (err) => {
        console.error("Homepage loading error:", err);
        setError("Unable to load homepage updates.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      setEditing(false);
    }
  }, [isAdmin]);

  function startEditing() {
    setDraft({ ...data });
    setError("");
    setEditing(true);
  }

  function change(field, value) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function saveChanges() {
    setSaving(true);
    setError("");

    try {
      await setDoc(doc(db, "homePage", "main"), draft);
      setEditing(false);
    } catch (err) {
      console.error("Homepage save error:", err);
      setError("Could not save. Check Firebase permissions.");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    marginTop: 6,
    marginBottom: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    color: "#111",
    background: "white",
    fontSize: 16,
  };

  const buttonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  };

  const cardStyle = {
    marginTop: 20,
    padding: 20,
    background: "#1a5fce",
    borderRadius: 8,
  };

  function field(label, key, multiline = false) {
    return (
      <label style={{ display: "block", fontWeight: "bold" }}>
        {label}
        {multiline ? (
          <textarea
            style={{ ...inputStyle, minHeight: 85 }}
            value={draft[key]}
            onChange={(e) => change(key, e.target.value)}
          />
        ) : (
          <input
            style={inputStyle}
            value={draft[key]}
            onChange={(e) => change(key, e.target.value)}
          />
        )}
      </label>
    );
  }

  return (
    <main
      style={{
        padding: 20,
        background: "#0d4dbb",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <p>Loading homepage...</p>
      ) : (
        <>
          {isAdmin && !editing && (
            <button
              onClick={startEditing}
              style={{
                ...buttonStyle,
                background: "#ffd54f",
                color: "#111",
                marginBottom: 20,
              }}
            >
              ✏️ Edit Homepage
            </button>
          )}

          {editing && isAdmin ? (
            <section style={{ maxWidth: 750 }}>
              <h2>Edit Homepage</h2>

              {field("Website Title", "title")}
              {field("Team Name", "teamName")}
              {field("Welcome Message", "welcome", true)}
              {field("Next Game Heading", "nextGameTitle")}
              {field("Next Game Information", "nextGame", true)}
              {field("Team Record Heading", "recordTitle")}
              {field("Wins", "wins")}
              {field("Losses", "losses")}

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={saveChanges}
                  disabled={saving}
                  style={{
                    ...buttonStyle,
                    background: "#ffd54f",
                    color: "#111",
                  }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setEditing(false)}
                  disabled={saving}
                  style={{
                    ...buttonStyle,
                    background: "#ddd",
                    color: "#111",
                  }}
                >
                  Cancel
                </button>
              </div>
            </section>
          ) : (
            <>
              <h1>{data.title}</h1>
              <h3>{data.teamName}</h3>
              <p>{data.welcome}</p>

              <section style={cardStyle}>
                <h4>{data.nextGameTitle}</h4>
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {data.nextGame}
                </p>
              </section>

              <section style={cardStyle}>
                <h4>{data.recordTitle}</h4>
                <p>
                  {data.wins}-{data.losses}
                </p>
              </section>
            </>
          )}
        </>
      )}

      {error && (
        <p style={{ color: "#ffe082", marginTop: 15 }}>
          {error}
        </p>
      )}
    </main>
  );
}
