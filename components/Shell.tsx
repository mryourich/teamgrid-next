import Link from "next/link";
import { ReactNode } from "react";

const nav = [
  { href: "/", label: "Command Center", icon: "⌂" },
  { href: "/projects", label: "Projekte", icon: "▣" },
  { href: "/tasks", label: "Aufgaben", icon: "✓" },
  { href: "/people", label: "People", icon: "◉" },
  { href: "/fleet", label: "Fuhrpark", icon: "◆" },
  { href: "/material", label: "Material", icon: "◫" },
  { href: "/documents", label: "Dokumente", icon: "▤" },
  { href: "/finance", label: "Finanzen", icon: "€" },
  { href: "/settings", label: "Einstellungen", icon: "⚙" }
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">TG</div>
          <div>
            <strong>TeamGrid</strong>
            <span>Company OS</span>
          </div>
        </div>

        <div className="sideLabel">Plattform</div>
        <nav className="nav">
          {nav.map((item) => (
            <Link href={item.href} key={item.href}>
              <span className="navIcon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sideFooter">
          <span>StackBlitz Demo</span>
          <small>Next.js ohne Datenbank</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="crumb">TeamGrid / StackBlitz Demo</div>
            <h1>TeamGrid Command Center</h1>
            <p>Zentrale Plattform für Unternehmen, Projekte und operative Abläufe.</p>
          </div>

          <div className="searchBox">
            <span>⌕</span>
            <input placeholder="Suche nach Projekt, Aufgabe, Person..." />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
