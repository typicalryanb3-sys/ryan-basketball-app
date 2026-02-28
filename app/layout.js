import Link from "next/link";
export const metadata = {
  title: "Crivitz 7th Grade Boys Basketball",
  description: "Team App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
<nav style={{
  padding: 15,
  borderBottom: "2px solid black",
  marginBottom: 20
}}>
  <Link href="/" style={{ marginRight: 20 }}>Home</Link>
  <Link href="/roster" style={{ marginRight: 20 }}>Roster</Link>
  <Link href="/summary" style={{ marginRight: 20 }}>Game Summary</Link>
  <Link href="/schedule">Game Schedule</Link>
</nav>

        {children}
      </body>
    </html>
  );
}
