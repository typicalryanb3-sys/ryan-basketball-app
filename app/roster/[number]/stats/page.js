export default function PlayerStatsPage({ params }) {
  const { number } = params;

  return (
    <div style={{ padding: 20 }}>
      <h1>Player Stats</h1>
      <h2>Jersey #{number}</h2>

      <div style={{ marginTop: 20 }}>
        <p>PPG: 0.0</p>
        <p>RPG: 0.0</p>
        <p>APG: 0.0</p>
      </div>

      <p style={{ marginTop: 20 }}>
        Edit these stats manually for each player.
      </p>
    </div>
  );
}
