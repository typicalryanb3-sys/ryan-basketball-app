
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  writeBatch
} from "firebase/firestore";
import { db } from "../firebase";
import { useAdmin } from "../context/AdminContext";

const initialPlayers = [
  { name: "Brody Ludwig", number: 30, position: "PG", group: "starter" },
  { name: "Kaden Dorshner", number: 34, position: "SF", group: "starter" },
  { name: "Tripp Johnson", number: 23, position: "C", group: "starter" },
  { name: "Jimmy Peplinski", number: 33, position: "PF", group: "starter" },
  { name: "Lambeau Zilliges", number: 22, position: "SG", group: "starter" },
  { name: "Kellen Gaurd", number: 20, position: "SF", group: "bench" },
  { name: "Jax Grutza", number: 13, position: "PF", group: "bench" },
  { name: "Reed Gigantige", number: 1, position: "SG", group: "bench" },
  { name: "Mack Zuleger", number: 42, position: "PG", group: "bench" },
  { name: "Karson Betka", number: 50, position: "C", group: "bench" },
  { name: "Ian Weiting", number: 51, position: "PG", group: "bench" },
  { name: "Ryan Bendtschneider", number: 44, position: "PF", group: "bench" },
  { name: "Fritz Koeler", number: 31, position: "C", group: "bench" }
];

const buttonStyle = {
  padding: "9px 14px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontWeight: "bold"
};

const inputStyle = {
  padding: 9,
  border: "1px solid #ccc",
  borderRadius: 5,
  fontSize: 15,
  width: "100%",
  boxSizing: "border-box"
};

export default function Roster() {
  const { isAdmin } = useAdmin();

  const [players, setPlayers] = useState(initialPlayers);
  const [draft, setDraft] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return onSnapshot(
      doc(db, "roster", "main"),
      (snapshot) => {
        const saved = snapshot.data()?.players;
        setPlayers(Array.isArray(saved) ? saved : initialPlayers);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Could not load the roster.");
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!isAdmin) setEditing(false);
  }, [isAdmin]);

  function startEditing() {
    setDraft(
      players.map((player, index) => ({
        ...player,
        _key: `existing-${index}`,
        _originalNumber: Number(player.number)
      }))
    );
    setError("");
    setEditing(true);
  }

  function updatePlayer(key, field, value) {
    setDraft((previous) =>
      previous.map((player) =>
        player._key === key
          ? { ...player, [field]: value }
          : player
      )
    );
  }

  function addPlayer() {
    setDraft((previous) => [
      ...previous,
      {
        _key: `new-${Date.now()}-${Math.random()}`,
        _originalNumber: null,
        name: "",
        number: "",
        position: "PG",
        group: "bench"
      }
    ]);
  }

  function removePlayer(key) {
    if (!window.confirm("Remove this player from the roster?")) return;

    setDraft((previous) =>
      previous.filter((player) => player._key !== key)
    );
  }

  async function saveRoster() {
    setError("");

    const cleaned = draft.map((player) => ({
      name: String(player.name).trim(),
      number:
        String(player.number).trim() === ""
          ? NaN
          : Number(player.number),
      position: String(player.position).trim().toUpperCase(),
      group: player.group,
      originalNumber: player._originalNumber
    }));

    if (
      cleaned.some(
        (player) =>
          !player.name ||
          !Number.isInteger(player.number) ||
          player.number < 0 ||
          player.number > 99 ||
          !player.position ||
          !["starter", "bench"].includes(player.group)
      )
    ) {
      setError("Enter a name, jersey number (0–99), and position.");
      return;
    }

    const numbers = cleaned.map((player) => player.number);

    if (new Set(numbers).size !== numbers.length) {
      setError("Two players cannot have the same jersey number.");
      return;
    }

    if (
      cleaned.filter((player) => player.group === "starter").length > 5
    ) {
      setError("Only five players can be in the Starting 5.");
      return;
    }

    setSaving(true);

    try {
      const changes = cleaned.filter(
        (player) =>
          player.originalNumber !== null &&
          player.originalNumber !== player.number
      );

      // Read every original document before writing anything.
      // This supports jersey-number swaps.
      const originalNumbers = new Set(
        players.map((player) => String(player.number))
      );

      const oldData = {};

      for (const number of originalNumbers) {
        const [stats, summaries] = await Promise.all([
          getDoc(doc(db, "playerStats", number)),
          getDoc(doc(db, "playerSummaries", number))
        ]);

        oldData[number] = {
          stats: stats.exists() ? stats.data() : null,
          summaries: summaries.exists() ? summaries.data() : null
        };
      }

      const batch = writeBatch(db);

      // Save backup copies of all existing profile records.
      for (const number of originalNumbers) {
        const record = oldData[number];

        if (record.stats || record.summaries) {
          batch.set(
            doc(db, "rosterBackups", number),
            {
              stats: record.stats,
              summaries: record.summaries,
              backedUpAt: new Date().toISOString()
            }
          );
        }
      }

      // Move profile records for changed jersey numbers.
      // Existing numbers that are reassigned must not retain old data.
      const changedNumbers = new Set(
        changes.map((player) => String(player.number))
      );

      for (const player of changes) {
        const source = oldData[String(player.originalNumber)];

        if (source?.stats) {
          batch.set(
            doc(db, "playerStats", String(player.number)),
            source.stats
          );
        } else {
          batch.delete(doc(db, "playerStats", String(player.number)));
        }

        if (source?.summaries) {
          batch.set(
            doc(db, "playerSummaries", String(player.number)),
            source.summaries
          );
        } else {
          batch.delete(
            doc(db, "playerSummaries", String(player.number))
          );
        }
      }

      // Clear old numbers only if no player uses them anymore.
      const finalNumbers = new Set(
        cleaned.map((player) => String(player.number))
      );

      for (const player of changes) {
        const oldNumber = String(player.originalNumber);

        if (
          !finalNumbers.has(oldNumber) &&
          !changedNumbers.has(oldNumber)
        ) {
          batch.delete(doc(db, "playerStats", oldNumber));
          batch.delete(doc(db, "playerSummaries", oldNumber));
        }
      }

      batch.set(doc(db, "roster", "main"), {
        players: cleaned.map(
          ({ name, number, position, group }) => ({
            name,
            number,
            position,
            group
          })
        )
      });

      await batch.commit();

      setEditing(false);
      alert("Roster saved successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not save the roster.");
    } finally {
      setSaving(false);
    }
  }

  function renderPlayers(group) {
    return players
      .filter((player) => player.group === group)
      .map((player) => (
        <div key={player.number} style={{ marginBottom: 10 }}>
          <Link href={`/roster/${player.number}`}>
            #{player.number} - {player.name} ({player.position})
          </Link>
        </div>
      ));
  }

  if (loading) {
    return <main style={{ padding: 20 }}>Loading roster...</main>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Player List</h1>

      {isAdmin && !editing && (
        <button
          onClick={startEditing}
          style={{
            ...buttonStyle,
            background: "#ffd54f",
            marginBottom: 20
          }}
        >
          ✏️ Edit Roster
        </button>
      )}

      {editing && isAdmin ? (
        <>
          <h2>Edit Players</h2>

          {draft.map((player) => (
            <div
              key={player._key}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                borderRadius: 8,
                marginBottom: 12,
                maxWidth: 800
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: 10
                }}
              >
                <label>
                  Name
                  <input
                    style={inputStyle}
                    value={player.name}
                    onChange={(e) =>
                      updatePlayer(
                        player._key,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Jersey #
                  <input
                    style={inputStyle}
                    type="number"
                    min="0"
                    max="99"
                    value={player.number}
                    onChange={(e) =>
                      updatePlayer(
                        player._key,
                        "number",
                        e.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Position
                  <input
                    style={inputStyle}
                    value={player.position}
                    onChange={(e) =>
                      updatePlayer(
                        player._key,
                        "position",
                        e.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Group
                  <select
                    style={inputStyle}
                    value={player.group}
                    onChange={(e) =>
                      updatePlayer(
                        player._key,
                        "group",
                        e.target.value
                      )
                    }
                  >
                    <option value="starter">Starting 5</option>
                    <option value="bench">Bench</option>
                  </select>
                </label>
              </div>

              <button
                onClick={() => removePlayer(player._key)}
                style={{
                  ...buttonStyle,
                  background: "#dc3545",
                  color: "white",
                  marginTop: 12
                }}
              >
                Remove Player
              </button>
            </div>
          ))}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={addPlayer}
              style={{ ...buttonStyle, background: "#ddd" }}
            >
              + Add Player
            </button>

            <button
              onClick={saveRoster}
              disabled={saving}
              style={{ ...buttonStyle, background: "#ffd54f" }}
            >
              {saving ? "Saving..." : "Save Roster"}
            </button>

            <button
              onClick={() => setEditing(false)}
              disabled={saving}
              style={{ ...buttonStyle, background: "#ddd" }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>🏀 Starting 5</h2>
          {renderPlayers("starter")}

          <h2 style={{ marginTop: 20 }}>Bench</h2>
          {renderPlayers("bench")}
        </>
      )}

      {error && (
        <p style={{ color: "#b00020", marginTop: 15 }}>
          {error}
        </p>
      )}
    </main>
  );
}
