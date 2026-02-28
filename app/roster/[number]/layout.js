import Link from "next/link";

export default function PlayerLayout({ children, params }) {
  const { number } = params;

  return (
    <div>
      <nav style={{
        padding: 10,
        borderBottom: "1px solid gray",
        marginBottom: 20
      }}>
        <Link href={`/roster/${number}/stats`} style={{ marginRight: 20 }}>
          Stats
        </Link>
        <Link href={`/roster/${number}/summaries`}>
          Summaries
        </Link>
      </nav>

      {children}
    </div>
  );
}
