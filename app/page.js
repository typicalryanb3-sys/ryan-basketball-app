"use client";

export default function HomePage() {
  return (
    <div
      style={{
        padding: 20,
        background: "#0b4dbb",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1>Ryan's Basketball App</h1>
      <h3>Crivitz 7th Grade Boys Basketball</h3>
      <p>Welcome to the official team app.</p>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          background: "#1a5fd0",
          borderRadius: 8,
        }}
      >
        <h4>Next Game</h4>
        <p>Game schedule coming soon.</p>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: 20,
          background: "#1a5fd0",
          borderRadius: 8,
        }}
      >
        <h4>Team Record</h4>
        <p>0-0</p>
      </div>
    </div>
  );
}
