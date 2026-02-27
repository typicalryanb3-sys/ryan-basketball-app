export const metadata = {
  title: "Crivitz 7th Grade Boys Basketball",
  description: "Team App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
