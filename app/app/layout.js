export const metadata = {
  title: "Ryan's Basketball App",
  description: "Crivitz 7th Grade Boys Basketball"
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
