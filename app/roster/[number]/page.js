"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const players = [
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
  const playerNumber = parseInt(params.number);
  const player = players.find((p) => p.number === playerNumber);

  const [stats, setStats] = useState({
    ppg: "",
    rpg: "",
    apg: ""
  });

  const [summary, setSummary] = useState("");
  const [injury, setInjury] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayerData() {
      if (!player) return;

      try {
        const statsRef = doc(db, "playerStats", String(player.number));
        const statsSnap = await getDoc(statsRef);

        if (statsSnap.exists()) {
          const statsData = statsSnap.data();
          setStats({
            ppg: statsData.ppg || "",
            rpg: statsData.rpg || "",
            apg: statsData.apg || ""
          });
        }

        const summaryRef = doc(db, "playerSummaries", String(player.number));
        const summarySnap = await getDoc(summaryRef);

        if (summarySnap.exists()) {
          const summaryData = summarySnap.data();
          setSummary(summaryData.summary || "");
          setInjury(summaryData.injury || "");
        }
      } catch (error) {
        console.error("Error loading player data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPlayerData();
  }, [player]);

  if (!player) {
    return <div style={{ padding: 20 }}>Player not found.</div>;
  }

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Link href="/roster">← Back to Roster</Link>

      <h1>{player.name}</h1>
      <h2>
        #{player.number} • {player.position}
      </h2>

      <div style={{ marginTop: 20 }}>
        <h3>Stats</h3>
        <p>PPG: {stats.ppg || "N/A"}</p>
        <p>RPG: {stats.rpg || "N/A"}</p>
        <p>APG: {stats.apg || "N/A"}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Latest Performance</h3>
        <p>{summary || "No performance summary yet."}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Injury Status</h3>
        <p>{injury || "No injuries reported."}</p>
      </div>
    </div>
  );
}
