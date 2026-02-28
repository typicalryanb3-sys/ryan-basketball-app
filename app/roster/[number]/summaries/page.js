export default function PlayerSummariesPage({ params }) {
  const { number } = params;

  return (
    <div style={{ padding: 20 }}>
      <h1>Player Summaries</h1>
      <h2>Jersey #{number}</h2>

      <div style={{ marginTop: 20 }}>
        <h3>Latest Performance</h3>
        <p>Add player performance summary here.</p>

        <h3 style={{ marginTop: 20 }}>Injury Status</h3>
        <p>No injuries reported.</p>

        <h3 style={{ marginTop: 20 }}>Coach Notes</h3>
        <p>Add development notes here.</p>
      </div>
    </div>
  );
}
