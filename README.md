# TeamGrid Functional Next.js Demo

Voll funktionale Frontend-Demo für TeamGrid.

## Funktionen

- Dashboard mit echten Berechnungen aus den Daten
- Projekte erstellen/löschen/status ändern
- Aufgaben erstellen, Kanban-Status ändern, löschen
- People/Personal erstellen/löschen
- Fuhrpark erstellen/löschen
- Material erstellen/status ändern/löschen
- Dokumente als Einträge erfassen/löschen
- Finanzen erstellen/löschen, Einnahmen/Ausgaben berechnen
- Globale Suche
- Einstellungen
- Export als JSON
- Import aus JSON
- Reset auf Demo-Daten
- Speicherung im Browser über localStorage

## Lokal starten

```bash
npm install
npm run dev
```

Dann öffnen:

```text
http://localhost:3000
```

## Vercel

Dieses Projekt ist Vercel-ready. Einfach zu GitHub hochladen und bei Vercel deployen.

## Wichtig

Diese Version speichert Daten im Browser des Benutzers. Für echte Teamarbeit, mehrere Benutzer, Rollen/Rechte und Dateien braucht die nächste Ausbaustufe eine Datenbank, z.B. Supabase/PostgreSQL.
