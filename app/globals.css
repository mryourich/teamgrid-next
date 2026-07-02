:root {
  --bg: #f4f7fb;
  --panel: #ffffff;
  --text: #162033;
  --muted: #667085;
  --line: #e5e7eb;
  --primary: #2563eb;
  --dark: #0f172a;
  --shadow: 0 16px 45px rgba(15, 23, 42, 0.08);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  min-height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

a { color: inherit; }

.shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
}

.sidebar {
  background: var(--dark);
  color: white;
  padding: 20px;
  position: sticky;
  top: 0;
  height: 100vh;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 26px;
}

.brandMark {
  width: 46px;
  height: 46px;
  border-radius: 17px;
  display: grid;
  place-items: center;
  font-weight: 950;
  letter-spacing: -0.08em;
  background: linear-gradient(135deg, #2563eb, #22c55e);
}

.brand strong { display: block; font-size: 18px; }
.brand span, .sideFooter small { display: block; color: #94a3b8; font-size: 12px; }

.sideLabel {
  color: #64748b;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 12px 10px;
}

.nav { display: grid; gap: 7px; }

.nav a {
  text-decoration: none;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 11px 12px;
  border-radius: 14px;
  transition: 0.16s ease;
}

.nav a:hover { background: rgba(255,255,255,.1); color: white; }

.sideFooter {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,.12);
  display: grid;
  gap: 4px;
}

.main { padding: 28px; min-width: 0; }

.topbar {
  background: linear-gradient(135deg, #ffffff, #eef5ff);
  border: 1px solid var(--line);
  border-radius: 30px;
  padding: 24px;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 20px;
}

.crumb {
  color: var(--muted);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.topbar h1 {
  margin: 4px 0;
  font-size: clamp(26px, 4vw, 38px);
  letter-spacing: -0.06em;
}

.topbar p { margin: 0; color: var(--muted); }

.searchBox {
  min-width: min(360px, 100%);
  background: white;
  border: 1px solid var(--line);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}

.searchBox input {
  height: 44px;
  border: 0;
  outline: 0;
  width: 100%;
  font: inherit;
}

.hero {
  border: 1px solid var(--line);
  border-radius: 34px;
  padding: 30px;
  box-shadow: var(--shadow);
  background: radial-gradient(circle at top right, rgba(37,99,235,.18), transparent 32%), linear-gradient(135deg, #fff, #f8fbff);
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  margin-bottom: 18px;
}

.eyebrow {
  display: inline-flex;
  padding: 7px 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 950;
}

.hero h2 {
  font-size: clamp(34px, 5vw, 58px);
  letter-spacing: -0.08em;
  margin: 12px 0 8px;
  line-height: .95;
}

.hero p { color: var(--muted); max-width: 760px; line-height: 1.6; }

.heroActions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }

.btn {
  border: 0;
  border-radius: 14px;
  min-height: 44px;
  padding: 0 15px;
  font-weight: 900;
  text-decoration: none;
  background: var(--primary);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn.secondary {
  background: white;
  color: var(--text);
  border: 1px solid var(--line);
}

.healthRing {
  width: 150px;
  height: 150px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: conic-gradient(var(--primary) 84%, #e5e7eb 0);
  position: relative;
  display: grid;
  place-items: center;
}

.healthRing::before {
  content: "";
  position: absolute;
  inset: 14px;
  background: white;
  border-radius: 50%;
}

.healthRing strong, .healthRing small {
  position: relative;
  z-index: 1;
  display: block;
  text-align: center;
}

.healthRing strong { font-size: 34px; letter-spacing: -0.05em; }
.healthRing small { margin-top: -28px; color: var(--muted); font-weight: 900; }

.statGrid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.statCard {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 7px;
  box-shadow: 0 8px 24px rgba(15,23,42,.05);
}

.statCard span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.statCard strong { font-size: 34px; letter-spacing: -0.05em; }
.statCard small { color: var(--muted); font-weight: 700; }
.statCard.warning { background: #fff7ed; border-color: #fed7aa; }
.statCard.danger { background: #fef2f2; border-color: #fecaca; }
.statCard.success { background: #ecfdf5; border-color: #bbf7d0; }

.grid2 {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
}

.grid3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 26px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(15,23,42,.05);
  margin-bottom: 16px;
}

.panelHead {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.panelHead h2 { margin: 0; letter-spacing: -0.04em; }
.panelHead span { color: var(--muted); font-size: 13px; font-weight: 900; }

.workList { display: grid; gap: 10px; }

.workItem, .dataRow {
  background: #f8fafc;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 14px;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 12px;
  align-items: center;
}

.workItem { grid-template-columns: 1fr auto; }
.workItem small, .dataRow small { color: var(--muted); display: block; margin-top: 4px; }

.badge {
  border-radius: 999px;
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 900;
  background: #e0f2fe;
  color: #075985;
}

.badge.high, .badge.danger {
  background: #fee2e2;
  color: #991b1b;
}

.badge.success {
  background: #dcfce7;
  color: #166534;
}

.progress {
  height: 9px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
  min-width: 120px;
}

.progress span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #2563eb, #22c55e);
}

.kanban {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.kanbanCol {
  background: #f8fafc;
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 14px;
}

.kanbanCol h2 { margin: 4px 4px 14px; }

.taskCard {
  background: white;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 14px;
  margin-bottom: 10px;
  display: grid;
  gap: 8px;
}

.taskCard small { color: var(--muted); }

.formCard { display: grid; gap: 10px; }

.input, .select, .textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 12px;
  font: inherit;
  background: white;
}

.textarea { min-height: 100px; }

.moduleHead {
  margin-bottom: 16px;
}

.moduleHead h2 {
  margin: 0;
  font-size: 32px;
  letter-spacing: -0.05em;
}

.moduleHead p {
  margin: 6px 0 0;
  color: var(--muted);
}

@media (max-width: 1180px) {
  .shell { grid-template-columns: 1fr; }
  .sidebar { position: relative; height: auto; }
  .statGrid, .grid2, .grid3, .kanban { grid-template-columns: 1fr 1fr; }
  .topbar, .hero { flex-direction: column; align-items: flex-start; }
  .searchBox { width: 100%; }
}

@media (max-width: 760px) {
  .main { padding: 16px; }
  .statGrid, .grid2, .grid3, .kanban { grid-template-columns: 1fr; }
  .workItem, .dataRow { grid-template-columns: 1fr; }
  .heroActions, .heroActions .btn { width: 100%; }
}
