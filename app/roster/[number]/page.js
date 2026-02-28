const players = [
  { name: "Brody Ludwig", number: 30, position: "PG" },
  { name: "Kaden Dorshner", number: 34, position: "SF" },
  { name: "Tripp Johnson", number: 23, position: "C" },
  { name: "Jimmy Peplinski", number: 33, position: "PF" },
  { name: "Lambeau Zillgies", number: 22, position: "SG" },
  { name: "Kellen Gaurd", number: 20, position: "SF" },
  { name: "Jax Grutza", number: 13, position: "PF" },
  { name: "Reed Gigantige", number: 1, position: "SG" },
  { name: "Mack Zuleger", number: 42, position: "PG" },
  { name: "Karson Betka", number: 50, position: "C" },
  { name: "Ian Weiting", number: 51, position: "PG" },
  { name: "Ryan Bendtschneider", number: 44, position: "PF" },
  { name: "Fritz Koeler", number: 31, position: "C" },
];

export default function PlayerPage({ params }) {
  const playerNumber = parseInt(params.number);

  const player = players.find(p => p.number === playerNumber);

  if (!player) {
    return <div style={{ padding: 20 }}>Player not found.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{player.name}</h1>
      <h2>#{player.number} • {player.position}</h2>
    </div>
  );
}
