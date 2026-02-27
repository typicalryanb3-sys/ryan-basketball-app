export default function Home() {
  return (
    <main style={{
      backgroundColor: "#0B3D91",
      color: "white",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: "#FFD700" }}>
        Ryan’s Basketball App
      </h1>

      <h2>Crivitz 7th Grade Boys Basketball</h2>

      <p>Welcome to the official team app.</p>

      <div style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#123EAB",
        borderRadius: "10px"
      }}>
        <h3 style={{ color: "#FFD700" }}>Next Game</h3>
        <p>Game schedule coming soon.</p>
      </div>

      <div style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#123EAB",
        borderRadius: "10px"
      }}>
        <h3 style={{ color: "#FFD700" }}>Team Record</h3>
        <p>0 - 0</p>
      </div>
    </main>
  );
}
