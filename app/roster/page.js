export default function Roster() {
  const players = [
    { name: "Player 1", number: 1, position: "PG" },
    { name: "Player 2", number: 2, position: "SG" },
    { name: "Player 3", number: 3, position: "SF" },
    { name: "Player 4", number: 4, position: "PF" },
    { name: "Player 5", number: 5, position: "C" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Team Roster</h1>

      {players.map((player) => (
        <div key={player.number} style={{ marginBottom: 10 }}>
          #{player.number} - {player.name} ({player.position})
        </div>
      ))}
    </div>
  );
}
