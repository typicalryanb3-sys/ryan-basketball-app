export default function PlayerPage({ params }) {
  const { number } = params;

  return (
    <div style={{ padding: 20 }}>
      <h1>Player Profile</h1>
      <h2>Jersey #{number}</h2>

      <p>This is where player details will go.</p>
    </div>
  );
}
