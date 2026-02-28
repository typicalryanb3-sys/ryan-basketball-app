import Link from "next/link";
export default function Roster() {
  const starters = [
    { name: "Brody Ludwig", number: 30, position: "PG" },
    { name: "Kaden Dorshner", number: 34, position: "SF" },
    { name: "Tripp Johnson", number: 23, position: "C" },
    { name: "Jimmy Peplinski", number: 33, position: "PF" },
    { name: "Lambeau Zillgies", number: 22, position: "SG" },
  ];

  const bench = [
    { name: "Kellen Gaurd", number: 20, position: "SF" },
    { name: "Jax Grutza", number: 13, position: "PF" },
    { name: "Reed Gigantige", number: 1, position: "SG" },
    { name: "Mack Zuleger", number: 42, position: "PG" },
    { name: "Karson Betka", number: 50, position: "C" },
    { name: "Ian Weiting", number: 51, position: "PG" },
    { name: "Ryan Bendtschneider", number: 44, position: "PF" },
    { name: "Fritz Koeler", number: 31, position: "C" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Player List</h1>

      <h2>🏀 Starting 5</h2>
      {starters.map((player) => (
  <div key={player.number} style={{ marginBottom: 8 }}>
    <Link href={`/roster/${player.number}`}>
      #{player.number} - {player.name} ({player.position})
    </Link>
  </div>
))}

      <h2 style={{ marginTop: 20 }}>Bench</h2>
    {bench.map((player) => (
  <div key={player.number} style={{ marginBottom: 8 }}>
    <Link href={`/roster/${player.number}`}>
      #{player.number} - {player.name} ({player.position})
    </Link>
  </div>
))}
    </div>
  );
}
