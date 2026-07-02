import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TeamGrid Functional",
  description: "TeamGrid fully functional frontend demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
