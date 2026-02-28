import { AdminProvider } from "../context/AdminContext";
import LayoutClient from "./components/LayoutClient";

export const metadata = {
  title: "Crivitz 7th Grade Boys Basketball",
  description: "Team App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AdminProvider>
          <LayoutClient>{children}</LayoutClient>
        </AdminProvider>
      </body>
    </html>
  );
}
