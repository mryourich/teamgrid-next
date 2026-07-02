import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/Shell";

export const metadata: Metadata = {
  title: "TeamGrid Demo",
  description: "TeamGrid Next.js SaaS Demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
