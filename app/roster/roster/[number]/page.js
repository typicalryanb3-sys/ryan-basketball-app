export default function PlayerPage({ params }) {
  const players = {
    30: { name: "Brody Ludwig", position: "PG" },
    34: { name: "Kaden Dorshner", position: "SF" },
    23: { name: "Tripp Johnson", position: "C" },
    33: { name: "Jimmy Peplinski", position: "PF" },
    22: { name: "Lambeau Zillgies", position: "SG" },
    20: { name: "Kellen Gaurd", position: "SF" },
    13: { name: "Jax Grutza", position: "PF" },
    1: { name: "Reed Gigantige", position: "SG" },
    42: { name: "Mack Zuleger", position: "PG" },
    50: { name: "Karson Betka", position: "C" },
    51: { name: "Ian Weiting", position: "PG" },
    44: { name: "Ryan Bendtschneider", position: "PF" },
    31: { name: "Fritz Koeler", position: "C" },
  };

  const player = players[params.number];

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>
        #{params.number} - {player.name}
      </h1>
      <h2>Position: {player.position}</h2>

      <h3>Stats</h3>
      <p>Points: 0</p>
      <p>Rebounds: 0</p>
      <p>Assists: 0</p>
    </div>
  );
}
