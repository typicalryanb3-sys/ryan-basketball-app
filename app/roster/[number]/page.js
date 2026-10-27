
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const defaultPlayers = [
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
  { name: "Fritz Koeler", number: 31, position: "C" }
];

export default function PlayerPage({ params }) {
  const playerNumber = Number(params.number);

  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState({
    ppg: "",
    rpg: "",
    apg: ""
  });
  const [summary, setSummary] = useState("");
  const [injury, setInjury] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    const rosterRef = doc(db, "roster", "main");

    const unsubscribe = onSnapshot(
      rosterRef,
      (snapshot) => {
        const roster = snapshot.exists()
          ? snapshot.data().players || []
          : defaultPlayers;

        const matchingPlayer = roster.find(
          (p) => Number(p.number) === playerNumber
        );

        setPlayer(matchingPlayer || null);
        setLoading(false);
      },
      (err) => {
        console.error("Roster error:", err);
        setError("Could not load player information.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [playerNumber]);

  useEffect(() => {
    async function loadProfile() {
      if (!player) return;

      try {
        const number = String(player.number);

        const [statsSnap, summarySnap] = await Promise.all([
          getDoc(doc(db, "playerStats", number)),
          getDoc(doc(db, "playerSummaries", number))
        ]);

        const statsData = statsSnap.exists()
          ? statsSnap.data()
          : {};

        const summaryData = summarySnap.exists()
          ? summarySnap.data()
          : {};

        setStats({
          ppg: statsData.ppg ?? "",
          rpg: statsData.rpg ?? "",
          apg: statsData.apg ?? ""
        });

        setSummary(summaryData.summary || "");
        setInjury(summaryData.injury || "");
      } catch (err) {
        console.error("Player profile error:", err);
        setError("Could not load player stats or summaries.");
      }
    }

    loadProfile();
  }, [player?.number]);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading player...</div>;
  }

  if (error) {
    return <div style={{ padding: 20 }}>{error}</div>;
  }

  if (!player) {
    return (
      <div style={{ padding: 20 }}>
        <Link href="/roster">← Back to Roster</Link>
        <p>Player not found.</p>
      </div>
    );
  }

  return (
    <main style={{ padding: 20 }}>
      <Link href="/roster">← Back to Roster</Link>

      <h1>{player.name}</h1>
      <h2>
        #{player.number} • {player.position}
      </h2>

      <section style={{ marginTop: 20 }}>
        <h3>Stats</h3>
        <p>PPG: {stats.ppg === "" ? "N/A" : stats.ppg}</p>
        <p>RPG: {stats.rpg === "" ? "N/A" : stats.rpg}</p>
        <p>APG: {stats.apg === "" ? "N/A" : stats.apg}</p>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Latest Performance</h3>
        <p>{summary || "No performance summary yet."}</p>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Injury Status</h3>
        <p>{injury || "No injuries reported."}</p>
      </section>
    </main>
  );
}
