"use client";

import React, { useEffect, useMemo, useState } from "react";

type View = "dashboard" | "projects" | "tasks" | "people" | "fleet" | "material" | "documents" | "finance" | "settings";
type Status = "active" | "paused" | "done" | "open" | "progress" | "ordered" | "delivered" | "paid";

type Project = { id: number; name: string; type: string; location: string; progress: number; budget: number; status: Status; description: string };
type Person = { id: number; name: string; company: string; role: string; phone: string; email: string; status: Status };
type Task = { id: number; title: string; projectId: number | null; personId: number | null; status: Status; priority: "low" | "normal" | "high"; due: string; description: string };
type Vehicle = { id: number; plate: string; name: string; driver: string; service: string; status: Status; note: string };
type Material = { id: number; name: string; amount: number; unit: string; supplier: string; projectId: number | null; status: Status; note: string };
type DocumentItem = { id: number; name: string; type: string; projectId: number | null; date: string; note: string };
type FinanceItem = { id: number; title: string; type: "income" | "expense"; amount: number; projectId: number | null; status: Status; due: string; note: string };

type Store = {
  settings: { companyName: string; ownerName: string };
  projects: Project[];
  people: Person[];
  tasks: Task[];
  vehicles: Vehicle[];
  material: Material[];
  documents: DocumentItem[];
  finance: FinanceItem[];
};

const nav: { key: View; label: string; icon: string }[] = [
  { key: "dashboard", label: "Command Center", icon: "⌂" },
  { key: "projects", label: "Projekte", icon: "▣" },
  { key: "tasks", label: "Aufgaben", icon: "✓" },
  { key: "people", label: "People", icon: "◉" },
  { key: "fleet", label: "Fuhrpark", icon: "◆" },
  { key: "material", label: "Material", icon: "◫" },
  { key: "documents", label: "Dokumente", icon: "▤" },
  { key: "finance", label: "Finanzen", icon: "€" },
  { key: "settings", label: "Einstellungen", icon: "⚙" }
];

const demoStore: Store = {
  settings: { companyName: "TeamGrid Unternehmen", ownerName: "Mario Juric" },
  projects: [
    { id: 1, name: "SBT Querschlag QS56", type: "Tunnelbau", location: "Semmering", progress: 64, budget: 250000, status: "active", description: "QS56 Elektro, Prüfungen und Mängelkoordination." },
    { id: 2, name: "Industrieanlage Inbetriebnahme", type: "Automation", location: "Oberösterreich", progress: 38, budget: 120000, status: "active", description: "SPS, Tests und Inbetriebnahme." },
    { id: 3, name: "Servicevertrag Kunde Nord", type: "Service", location: "Linz", progress: 82, budget: 45000, status: "active", description: "Wartung und Störungsbehebung." },
    { id: 4, name: "Interne Organisation", type: "Office", location: "Zentrale", progress: 25, budget: 15000, status: "paused", description: "Interne Abläufe und Teamstruktur." }
  ],
  people: [
    { id: 1, name: "Mario Juric", company: "Intern", role: "Bauleiter", phone: "+43 ...", email: "mario@example.com", status: "active" },
    { id: 2, name: "Ivan K.", company: "Partnerfirma", role: "Monteur", phone: "+43 ...", email: "ivan@example.com", status: "active" },
    { id: 3, name: "Julian M.", company: "Intern", role: "Prüfung", phone: "+43 ...", email: "julian@example.com", status: "active" },
    { id: 4, name: "Ramona", company: "Extern", role: "Entwicklung", phone: "-", email: "dev@example.com", status: "active" }
  ],
  tasks: [
    { id: 1, title: "Mängelliste QS56 prüfen", projectId: 1, personId: 1, status: "open", priority: "high", due: new Date().toISOString().slice(0, 10), description: "Offene Mängel und Status kontrollieren." },
    { id: 2, title: "Fotodokumentation Briden ergänzen", projectId: 1, personId: 2, status: "progress", priority: "normal", due: new Date().toISOString().slice(0, 10), description: "Fotos sauber zuordnen." },
    { id: 3, title: "Materialbedarf nächste Woche prüfen", projectId: 2, personId: 3, status: "open", priority: "normal", due: "", description: "Materialliste mit offenen Bestellungen abgleichen." },
    { id: 4, title: "Fahrzeugservice VB-123AB planen", projectId: null, personId: 1, status: "open", priority: "low", due: "", description: "Service und Pickerl prüfen." },
    { id: 5, title: "Kundenangebot vorbereiten", projectId: 3, personId: 4, status: "done", priority: "normal", due: "", description: "Angebot finalisieren." }
  ],
  vehicles: [
    { id: 1, plate: "VB-123AB", name: "VW Transporter", driver: "Mario", service: "2026-08-15", status: "active", note: "Service im August." },
    { id: 2, plate: "L-456CD", name: "Mercedes Vito", driver: "Ivan", service: "2026-09-10", status: "active", note: "" },
    { id: 3, plate: "W-789EF", name: "Anhänger", driver: "-", service: "2027-01-20", status: "active", note: "" }
  ],
  material: [
    { id: 1, name: "Briden", amount: 100, unit: "Stk", supplier: "Lieferant A", projectId: 1, status: "open", note: "" },
    { id: 2, name: "Kabel 240mm²", amount: 80, unit: "m", supplier: "Lieferant B", projectId: 1, status: "ordered", note: "" },
    { id: 3, name: "Kabelbinder Edelstahl", amount: 500, unit: "Stk", supplier: "Lieferant C", projectId: 2, status: "delivered", note: "" }
  ],
  documents: [
    { id: 1, name: "Prüfprotokoll QS56.pdf", type: "PDF", projectId: 1, date: "2026-07-02", note: "Demo-Eintrag" },
    { id: 2, name: "Fotodokumentation Briden.zip", type: "ZIP", projectId: 1, date: "2026-07-01", note: "Demo-Eintrag" },
    { id: 3, name: "Kundenangebot Nord.docx", type: "DOCX", projectId: 3, date: "2026-06-30", note: "Demo-Eintrag" }
  ],
  finance: [
    { id: 1, title: "Teilrechnung SBT", type: "income", amount: 50000, projectId: 1, status: "open", due: "2026-07-15", note: "" },
    { id: 2, title: "Material Einkauf", type: "expense", amount: 12000, projectId: 1, status: "open", due: "2026-07-20", note: "" },
    { id: 3, title: "Servicevertrag Nord", type: "income", amount: 18500, projectId: 3, status: "paid", due: "2026-07-01", note: "" }
  ]
};

const storageKey = "teamgrid-functional-v1";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function nextId(items: { id: number }[]) {
  return Math.max(0, ...items.map((item) => item.id)) + 1;
}

function money(value: number) {
  return value.toLocaleString("de-AT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function cloneDemo(): Store {
  return JSON.parse(JSON.stringify(demoStore)) as Store;
}

function getProjectName(store: Store, id: number | null) {
  if (!id) return "Ohne Projekt";
  return store.projects.find((p) => p.id === id)?.name ?? "Unbekannt";
}

function getPersonName(store: Store, id: number | null) {
  if (!id) return "Nicht zugewiesen";
  return store.people.find((p) => p.id === id)?.name ?? "Unbekannt";
}

function field(form: HTMLFormElement, name: string) {
  const data = new FormData(form);
  return String(data.get(name) ?? "").trim();
}

function numberField(form: HTMLFormElement, name: string) {
  const value = Number(field(form, name));
  return Number.isFinite(value) ? value : 0;
}

function nullableNumber(form: HTMLFormElement, name: string) {
  const raw = field(form, name);
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export default function TeamGridClient() {
  const [store, setStore] = useState<Store>(cloneDemo());
  const [view, setView] = useState<View>("dashboard");
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        setStore(JSON.parse(raw) as Store);
      } catch {
        setStore(cloneDemo());
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(storageKey, JSON.stringify(store));
  }, [store, loaded]);

  const metrics = useMemo(() => {
    const income = store.finance.filter((f) => f.type === "income").reduce((sum, f) => sum + f.amount, 0);
    const costs = store.finance.filter((f) => f.type === "expense").reduce((sum, f) => sum + f.amount, 0);
    const openTasks = store.tasks.filter((t) => t.status !== "done").length;
    const dueToday = store.tasks.filter((t) => t.status !== "done" && t.due === today()).length;
    const openMaterial = store.material.filter((m) => m.status !== "delivered" && m.status !== "done").length;
    const avgProgress = store.projects.length ? Math.round(store.projects.reduce((sum, p) => sum + p.progress, 0) / store.projects.length) : 0;
    const health = Math.max(0, Math.min(100, avgProgress + 30 - openTasks - dueToday * 2));
    return { income, costs, balance: income - costs, openTasks, dueToday, openMaterial, avgProgress, health };
  }, [store]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const rows: { type: string; title: string; sub: string; open: View }[] = [];
    store.projects.forEach((p) => {
      if ([p.name, p.type, p.location, p.description].join(" ").toLowerCase().includes(q)) rows.push({ type: "Projekt", title: p.name, sub: `${p.type} · ${p.location}`, open: "projects" });
    });
    store.tasks.forEach((t) => {
      if ([t.title, t.description, getProjectName(store, t.projectId), getPersonName(store, t.personId)].join(" ").toLowerCase().includes(q)) rows.push({ type: "Aufgabe", title: t.title, sub: `${getProjectName(store, t.projectId)} · ${getPersonName(store, t.personId)}`, open: "tasks" });
    });
    store.people.forEach((p) => {
      if ([p.name, p.company, p.role, p.email, p.phone].join(" ").toLowerCase().includes(q)) rows.push({ type: "Person", title: p.name, sub: `${p.role} · ${p.company}`, open: "people" });
    });
    store.vehicles.forEach((v) => {
      if ([v.plate, v.name, v.driver, v.note].join(" ").toLowerCase().includes(q)) rows.push({ type: "Fahrzeug", title: v.plate, sub: `${v.name} · ${v.driver}`, open: "fleet" });
    });
    store.material.forEach((m) => {
      if ([m.name, m.supplier, m.note].join(" ").toLowerCase().includes(q)) rows.push({ type: "Material", title: m.name, sub: `${m.amount} ${m.unit} · ${m.supplier}`, open: "material" });
    });
    return rows.slice(0, 12);
  }, [query, store]);

  function updateProject(id: number, patch: Partial<Project>) {
    setStore((s) => ({ ...s, projects: s.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  }

  function updateTask(id: number, patch: Partial<Task>) {
    setStore((s) => ({ ...s, tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
  }

  function deleteBy<T extends { id: number }>(key: keyof Store, id: number) {
    setStore((s) => ({ ...s, [key]: (s[key] as T[]).filter((item) => item.id !== id) } as Store));
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `teamgrid-export-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result)) as Store;
        if (!imported.projects || !imported.tasks || !imported.people) throw new Error("Ungültige Datei");
        setStore(imported);
      } catch {
        alert("Import fehlgeschlagen. Die Datei passt nicht zu TeamGrid.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">TG</div>
          <div>
            <strong>TeamGrid</strong>
            <span>Functional SaaS Demo</span>
          </div>
        </div>

        <div className="sideLabel">Plattform</div>
        <nav className="nav">
          {nav.map((item) => (
            <button key={item.key} className={view === item.key ? "active" : ""} onClick={() => setView(item.key)}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sideFooter">
          <strong>{store.settings.companyName}</strong>
          <small>Speichert lokal im Browser</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="crumb">TeamGrid / {nav.find((n) => n.key === view)?.label}</div>
            <h1>{store.settings.companyName}</h1>
            <p>Zentrale Plattform für Unternehmen, Projekte und operative Abläufe.</p>
          </div>
          <div className="searchBox">
            <span>⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Suche nach Projekt, Aufgabe, Person..." />
          </div>
        </header>

        {query.trim() ? (
          <section className="panel searchResults">
            <div className="panelHead">
              <h2>Suchergebnisse</h2>
              <span>{searchResults.length} Treffer</span>
            </div>
            <div className="workList">
              {searchResults.map((r, i) => (
                <button className="dataRow clickRow" key={`${r.type}-${i}`} onClick={() => setView(r.open)}>
                  <div>
                    <strong>{r.title}</strong>
                    <small>{r.type} · {r.sub}</small>
                  </div>
                  <span>öffnen</span>
                </button>
              ))}
              {!searchResults.length ? <p className="muted">Keine Treffer gefunden.</p> : null}
            </div>
          </section>
        ) : null}

        {view === "dashboard" ? <Dashboard store={store} metrics={metrics} setView={setView} updateTask={updateTask} updateProject={updateProject} /> : null}
        {view === "projects" ? <Projects store={store} setStore={setStore} updateProject={updateProject} deleteBy={deleteBy} /> : null}
        {view === "tasks" ? <Tasks store={store} setStore={setStore} updateTask={updateTask} deleteBy={deleteBy} /> : null}
        {view === "people" ? <People store={store} setStore={setStore} deleteBy={deleteBy} /> : null}
        {view === "fleet" ? <Fleet store={store} setStore={setStore} deleteBy={deleteBy} /> : null}
        {view === "material" ? <MaterialPage store={store} setStore={setStore} deleteBy={deleteBy} /> : null}
        {view === "documents" ? <Documents store={store} setStore={setStore} deleteBy={deleteBy} /> : null}
        {view === "finance" ? <Finance store={store} setStore={setStore} deleteBy={deleteBy} /> : null}
        {view === "settings" ? <Settings store={store} setStore={setStore} exportJson={exportJson} importJson={importJson} /> : null}
      </main>
    </div>
  );
}

function Badge({ children, tone = "" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="panel">
      <div className="panelHead">
        <h2>{title}</h2>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
      {children}
    </section>
  );
}

function Dashboard({ store, metrics, setView, updateTask, updateProject }: {
  store: Store;
  metrics: { income: number; costs: number; balance: number; openTasks: number; dueToday: number; openMaterial: number; avgProgress: number; health: number };
  setView: (v: View) => void;
  updateTask: (id: number, patch: Partial<Task>) => void;
  updateProject: (id: number, patch: Partial<Project>) => void;
}) {
  const urgent = store.tasks.filter((t) => t.status !== "done").slice(0, 5);

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">TeamGrid Company OS</span>
          <h2>Dein Unternehmen auf einen Blick.</h2>
          <p>Ein funktionales Command Center für Projekte, Aufgaben, Personal, Material, Fuhrpark, Dokumente und Finanzen.</p>
          <div className="heroActions">
            <button className="btn" onClick={() => setView("tasks")}>Aufgaben öffnen</button>
            <button className="btn secondary" onClick={() => setView("projects")}>Projekt erstellen</button>
          </div>
        </div>
        <div className="healthRing" style={{ background: `conic-gradient(var(--primary) ${metrics.health}%, #e5e7eb 0)` }}>
          <strong>{metrics.health}%</strong>
          <small>System</small>
        </div>
      </section>

      <section className="statGrid">
        <Stat label="Projekte" value={store.projects.length} hint="gesamt" />
        <Stat label="Aufgaben" value={metrics.openTasks} hint="offen" tone="warning" />
        <Stat label="Heute" value={metrics.dueToday} hint="fällig" tone="danger" />
        <Stat label="People" value={store.people.filter((p) => p.status === "active").length} hint="aktiv" />
        <Stat label="Material" value={metrics.openMaterial} hint="offen" />
        <Stat label="Saldo" value={money(metrics.balance)} hint="aktuell" tone="success" />
      </section>

      <section className="grid2">
        <Panel title="Heute wichtig" subtitle="aus echten Daten">
          <div className="workList">
            {urgent.map((task) => (
              <div className="workItem" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <small>{getProjectName(store, task.projectId)} · {getPersonName(store, task.personId)}</small>
                </div>
                <select value={task.status} onChange={(e) => updateTask(task.id, { status: e.target.value as Status })}>
                  <option value="open">Offen</option>
                  <option value="progress">In Arbeit</option>
                  <option value="done">Erledigt</option>
                </select>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Finanzradar" subtitle="berechnet">
          <div className="workList">
            <div className="workItem"><strong>Einnahmen</strong><Badge>{money(metrics.income)}</Badge></div>
            <div className="workItem"><strong>Ausgaben</strong><Badge tone="danger">{money(metrics.costs)}</Badge></div>
            <div className="workItem"><strong>Saldo</strong><Badge tone="success">{money(metrics.balance)}</Badge></div>
          </div>
        </Panel>
      </section>

      <Panel title="Projekt-Pipeline" subtitle="Fortschritt änderbar">
        <div className="workList">
          {store.projects.map((project) => (
            <div className="dataRow" key={project.id}>
              <div>
                <strong>{project.name}</strong>
                <small>{project.type} · {project.location}</small>
              </div>
              <input className="miniInput" type="number" min="0" max="100" value={project.progress} onChange={(e) => updateProject(project.id, { progress: Number(e.target.value) })} />
              <div className="progress"><span style={{ width: `${project.progress}%` }} /></div>
              <Badge>{project.status}</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Stat({ label, value, hint, tone = "" }: { label: string; value: string | number; hint: string; tone?: string }) {
  return (
    <div className={`statCard ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </div>
  );
}

function Projects({ store, setStore, updateProject, deleteBy }: {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  updateProject: (id: number, patch: Partial<Project>) => void;
  deleteBy: <T extends { id: number }>(key: keyof Store, id: number) => void;
}) {
  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const item: Project = {
      id: nextId(store.projects),
      name: field(form, "name"),
      type: field(form, "type") || "Projekt",
      location: field(form, "location"),
      progress: Math.max(0, Math.min(100, numberField(form, "progress"))),
      budget: numberField(form, "budget"),
      status: "active",
      description: field(form, "description")
    };
    if (!item.name) return;
    setStore((s) => ({ ...s, projects: [item, ...s.projects] }));
    form.reset();
  }

  return (
    <>
      <div className="moduleHead"><h2>Projekte</h2><p>Erstellen, Fortschritt ändern, Status setzen und löschen.</p></div>
      <section className="grid2">
        <Panel title="Neues Projekt" subtitle="funktional">
          <form className="formCard" onSubmit={add}>
            <input className="input" name="name" placeholder="Projektname" required />
            <select className="select" name="type"><option>Tunnelbau</option><option>Industrie</option><option>Service</option><option>Intern</option><option>Gebäudetechnik</option></select>
            <input className="input" name="location" placeholder="Ort" />
            <input className="input" type="number" name="progress" placeholder="Fortschritt %" defaultValue={0} />
            <input className="input" type="number" name="budget" placeholder="Budget" defaultValue={0} />
            <textarea className="textarea" name="description" placeholder="Beschreibung" />
            <button className="btn">Projekt erstellen</button>
          </form>
        </Panel>

        <Panel title="Projektstatus" subtitle="Übersicht">
          <div className="workList">
            <div className="workItem"><strong>Aktiv</strong><Badge>{store.projects.filter((p) => p.status === "active").length}</Badge></div>
            <div className="workItem"><strong>Pausiert</strong><Badge>{store.projects.filter((p) => p.status === "paused").length}</Badge></div>
            <div className="workItem"><strong>Abgeschlossen</strong><Badge tone="success">{store.projects.filter((p) => p.status === "done").length}</Badge></div>
          </div>
        </Panel>
      </section>

      <Panel title="Projektliste" subtitle={`${store.projects.length} Projekte`}>
        <div className="workList">
          {store.projects.map((project) => (
            <div className="dataRow" key={project.id}>
              <div>
                <strong>{project.name}</strong>
                <small>{project.type} · {project.location} · Budget {money(project.budget)}</small>
              </div>
              <input className="miniInput" type="number" min="0" max="100" value={project.progress} onChange={(e) => updateProject(project.id, { progress: Number(e.target.value) })} />
              <select value={project.status} onChange={(e) => updateProject(project.id, { status: e.target.value as Status })}>
                <option value="active">Aktiv</option>
                <option value="paused">Pausiert</option>
                <option value="done">Abgeschlossen</option>
              </select>
              <button className="iconBtn dangerBtn" onClick={() => deleteBy<Project>("projects", project.id)}>Löschen</button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Tasks({ store, setStore, updateTask, deleteBy }: {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  updateTask: (id: number, patch: Partial<Task>) => void;
  deleteBy: <T extends { id: number }>(key: keyof Store, id: number) => void;
}) {
  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const item: Task = {
      id: nextId(store.tasks),
      title: field(form, "title"),
      projectId: nullableNumber(form, "projectId"),
      personId: nullableNumber(form, "personId"),
      status: "open",
      priority: (field(form, "priority") || "normal") as Task["priority"],
      due: field(form, "due"),
      description: field(form, "description")
    };
    if (!item.title) return;
    setStore((s) => ({ ...s, tasks: [item, ...s.tasks] }));
    form.reset();
  }

  const columns: { key: Status; title: string }[] = [
    { key: "open", title: "Offen" },
    { key: "progress", title: "In Arbeit" },
    { key: "done", title: "Erledigt" }
  ];

  return (
    <>
      <div className="moduleHead"><h2>Aufgaben</h2><p>Kanban mit Statuswechsel, Zuweisung und Löschen.</p></div>

      <Panel title="Neue Aufgabe" subtitle="funktional">
        <form className="formGrid" onSubmit={add}>
          <input className="input" name="title" placeholder="Aufgabe" required />
          <select className="select" name="projectId"><option value="">Kein Projekt</option>{store.projects.map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
          <select className="select" name="personId"><option value="">Keine Person</option>{store.people.map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
          <select className="select" name="priority"><option value="low">Niedrig</option><option value="normal">Normal</option><option value="high">Hoch</option></select>
          <input className="input" type="date" name="due" />
          <input className="input" name="description" placeholder="Beschreibung" />
          <button className="btn">Aufgabe erstellen</button>
        </form>
      </Panel>

      <div className="kanban">
        {columns.map((column) => (
          <section className="kanbanCol" key={column.key}>
            <h2>{column.title}</h2>
            {store.tasks.filter((task) => task.status === column.key).map((task) => (
              <article className="taskCard" key={task.id}>
                <strong>{task.title}</strong>
                <small>{getProjectName(store, task.projectId)} · {getPersonName(store, task.personId)}</small>
                <div className="cardActions">
                  <Badge tone={task.priority === "high" ? "danger" : ""}>{task.priority}</Badge>
                  <select value={task.status} onChange={(e) => updateTask(task.id, { status: e.target.value as Status })}>
                    <option value="open">Offen</option>
                    <option value="progress">In Arbeit</option>
                    <option value="done">Erledigt</option>
                  </select>
                  <button className="iconBtn dangerBtn" onClick={() => deleteBy<Task>("tasks", task.id)}>Löschen</button>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}

function People({ store, setStore, deleteBy }: {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  deleteBy: <T extends { id: number }>(key: keyof Store, id: number) => void;
}) {
  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const item: Person = { id: nextId(store.people), name: field(form, "name"), company: field(form, "company"), role: field(form, "role"), phone: field(form, "phone"), email: field(form, "email"), status: "active" };
    if (!item.name) return;
    setStore((s) => ({ ...s, people: [item, ...s.people] }));
    form.reset();
  }

  return (
    <>
      <div className="moduleHead"><h2>People</h2><p>Mitarbeiter, Partnerfirmen, externe Arbeiter und Rollen.</p></div>
      <Panel title="Person hinzufügen" subtitle="funktional">
        <form className="formGrid" onSubmit={add}>
          <input className="input" name="name" placeholder="Name" required />
          <input className="input" name="company" placeholder="Firma" />
          <input className="input" name="role" placeholder="Rolle" />
          <input className="input" name="phone" placeholder="Telefon" />
          <input className="input" name="email" placeholder="E-Mail" />
          <button className="btn">Person speichern</button>
        </form>
      </Panel>
      <section className="grid3">
        {store.people.map((person) => (
          <Panel title={person.name} subtitle={person.company} key={person.id}>
            <div className="workList">
              <div className="workItem"><strong>Rolle</strong><span>{person.role}</span></div>
              <div className="workItem"><strong>Kontakt</strong><span>{person.phone}</span></div>
              <div className="workItem"><strong>Status</strong><Badge tone="success">{person.status}</Badge></div>
              <button className="btn dangerBtn" onClick={() => deleteBy<Person>("people", person.id)}>Löschen</button>
            </div>
          </Panel>
        ))}
      </section>
    </>
  );
}

function Fleet({ store, setStore, deleteBy }: {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  deleteBy: <T extends { id: number }>(key: keyof Store, id: number) => void;
}) {
  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const item: Vehicle = { id: nextId(store.vehicles), plate: field(form, "plate"), name: field(form, "name"), driver: field(form, "driver"), service: field(form, "service"), status: "active", note: field(form, "note") };
    if (!item.plate) return;
    setStore((s) => ({ ...s, vehicles: [item, ...s.vehicles] }));
    form.reset();
  }

  return (
    <>
      <div className="moduleHead"><h2>Fuhrpark</h2><p>Fahrzeuge, Fahrer, Service und Einsatzplanung.</p></div>
      <Panel title="Fahrzeug hinzufügen" subtitle="funktional">
        <form className="formGrid" onSubmit={add}>
          <input className="input" name="plate" placeholder="Kennzeichen" required />
          <input className="input" name="name" placeholder="Fahrzeug" />
          <input className="input" name="driver" placeholder="Fahrer" />
          <input className="input" type="date" name="service" />
          <input className="input" name="note" placeholder="Notiz" />
          <button className="btn">Fahrzeug speichern</button>
        </form>
      </Panel>
      <Panel title="Fahrzeuge" subtitle={`${store.vehicles.length} Einträge`}>
        <div className="workList">
          {store.vehicles.map((vehicle) => (
            <div className="dataRow" key={vehicle.id}>
              <div><strong>{vehicle.plate}</strong><small>{vehicle.name}</small></div>
              <span>{vehicle.driver}</span>
              <span>Service: {vehicle.service || "-"}</span>
              <button className="iconBtn dangerBtn" onClick={() => deleteBy<Vehicle>("vehicles", vehicle.id)}>Löschen</button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function MaterialPage({ store, setStore, deleteBy }: {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  deleteBy: <T extends { id: number }>(key: keyof Store, id: number) => void;
}) {
  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const item: Material = {
      id: nextId(store.material),
      name: field(form, "name"),
      amount: numberField(form, "amount"),
      unit: field(form, "unit"),
      supplier: field(form, "supplier"),
      projectId: nullableNumber(form, "projectId"),
      status: "open",
      note: field(form, "note")
    };
    if (!item.name) return;
    setStore((s) => ({ ...s, material: [item, ...s.material] }));
    form.reset();
  }

  function updateMaterial(id: number, patch: Partial<Material>) {
    setStore((s) => ({ ...s, material: s.material.map((m) => (m.id === id ? { ...m, ...patch } : m)) }));
  }

  return (
    <>
      <div className="moduleHead"><h2>Material</h2><p>Materialbedarf, Bestellungen und Lieferstatus.</p></div>
      <Panel title="Material hinzufügen" subtitle="funktional">
        <form className="formGrid" onSubmit={add}>
          <input className="input" name="name" placeholder="Material" required />
          <input className="input" type="number" name="amount" placeholder="Menge" defaultValue={0} />
          <input className="input" name="unit" placeholder="Einheit" />
          <input className="input" name="supplier" placeholder="Lieferant" />
          <select className="select" name="projectId"><option value="">Kein Projekt</option>{store.projects.map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
          <input className="input" name="note" placeholder="Notiz" />
          <button className="btn">Material speichern</button>
        </form>
      </Panel>
      <Panel title="Materialliste" subtitle={`${store.material.length} Einträge`}>
        <div className="workList">
          {store.material.map((item) => (
            <div className="dataRow" key={item.id}>
              <div><strong>{item.name}</strong><small>{getProjectName(store, item.projectId)} · {item.supplier}</small></div>
              <span>{item.amount} {item.unit}</span>
              <select value={item.status} onChange={(e) => updateMaterial(item.id, { status: e.target.value as Status })}>
                <option value="open">Offen</option>
                <option value="ordered">Bestellt</option>
                <option value="delivered">Angekommen</option>
                <option value="done">Erledigt</option>
              </select>
              <button className="iconBtn dangerBtn" onClick={() => deleteBy<Material>("material", item.id)}>Löschen</button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Documents({ store, setStore, deleteBy }: {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  deleteBy: <T extends { id: number }>(key: keyof Store, id: number) => void;
}) {
  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement | null;
    const fileName = fileInput?.files?.[0]?.name || field(form, "name");
    const type = fileName.includes(".") ? fileName.split(".").pop()?.toUpperCase() || "DATEI" : "DATEI";
    const item: DocumentItem = { id: nextId(store.documents), name: fileName, type, projectId: nullableNumber(form, "projectId"), date: today(), note: field(form, "note") };
    if (!item.name) return;
    setStore((s) => ({ ...s, documents: [item, ...s.documents] }));
    form.reset();
  }

  return (
    <>
      <div className="moduleHead"><h2>Dokumente</h2><p>Dateien als Einträge erfassen. In dieser Demo wird nur der Dateiname gespeichert.</p></div>
      <Panel title="Dokument erfassen" subtitle="funktional als Eintrag">
        <form className="formGrid" onSubmit={add}>
          <input className="input" type="file" name="file" />
          <input className="input" name="name" placeholder="oder Dateiname manuell" />
          <select className="select" name="projectId"><option value="">Unternehmen</option>{store.projects.map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
          <input className="input" name="note" placeholder="Notiz" />
          <button className="btn">Dokument speichern</button>
        </form>
      </Panel>
      <Panel title="Dateiablage" subtitle={`${store.documents.length} Einträge`}>
        <div className="workList">
          {store.documents.map((doc) => (
            <div className="dataRow" key={doc.id}>
              <div><strong>{doc.name}</strong><small>{getProjectName(store, doc.projectId)} · {doc.note}</small></div>
              <span>{doc.type}</span>
              <span>{doc.date}</span>
              <button className="iconBtn dangerBtn" onClick={() => deleteBy<DocumentItem>("documents", doc.id)}>Löschen</button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Finance({ store, setStore, deleteBy }: {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  deleteBy: <T extends { id: number }>(key: keyof Store, id: number) => void;
}) {
  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const item: FinanceItem = {
      id: nextId(store.finance),
      title: field(form, "title"),
      type: (field(form, "type") || "income") as FinanceItem["type"],
      amount: numberField(form, "amount"),
      projectId: nullableNumber(form, "projectId"),
      status: "open",
      due: field(form, "due"),
      note: field(form, "note")
    };
    if (!item.title) return;
    setStore((s) => ({ ...s, finance: [item, ...s.finance] }));
    form.reset();
  }

  const income = store.finance.filter((f) => f.type === "income").reduce((sum, f) => sum + f.amount, 0);
  const costs = store.finance.filter((f) => f.type === "expense").reduce((sum, f) => sum + f.amount, 0);

  return (
    <>
      <div className="moduleHead"><h2>Finanzen</h2><p>Einnahmen, Ausgaben und Projektbudgets.</p></div>
      <section className="statGrid three">
        <Stat label="Einnahmen" value={money(income)} hint="gesamt" tone="success" />
        <Stat label="Ausgaben" value={money(costs)} hint="gesamt" tone="danger" />
        <Stat label="Saldo" value={money(income - costs)} hint="berechnet" />
      </section>
      <Panel title="Finanzeintrag hinzufügen" subtitle="funktional">
        <form className="formGrid" onSubmit={add}>
          <input className="input" name="title" placeholder="Titel" required />
          <select className="select" name="type"><option value="income">Einnahme</option><option value="expense">Ausgabe</option></select>
          <input className="input" type="number" name="amount" placeholder="Betrag" defaultValue={0} />
          <select className="select" name="projectId"><option value="">Kein Projekt</option>{store.projects.map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
          <input className="input" type="date" name="due" />
          <input className="input" name="note" placeholder="Notiz" />
          <button className="btn">Eintrag speichern</button>
        </form>
      </Panel>
      <Panel title="Finanzliste" subtitle={`${store.finance.length} Einträge`}>
        <div className="workList">
          {store.finance.map((item) => (
            <div className="dataRow" key={item.id}>
              <div><strong>{item.title}</strong><small>{getProjectName(store, item.projectId)} · {item.type}</small></div>
              <span>{money(item.amount)}</span>
              <Badge tone={item.type === "expense" ? "danger" : "success"}>{item.status}</Badge>
              <button className="iconBtn dangerBtn" onClick={() => deleteBy<FinanceItem>("finance", item.id)}>Löschen</button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Settings({ store, setStore, exportJson, importJson }: {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  exportJson: () => void;
  importJson: (file: File | null) => void;
}) {
  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStore((s) => ({ ...s, settings: { companyName: field(form, "companyName"), ownerName: field(form, "ownerName") } }));
  }

  return (
    <>
      <div className="moduleHead"><h2>Einstellungen</h2><p>Firma, Export, Import und Reset.</p></div>
      <section className="grid2">
        <Panel title="Firma" subtitle="funktional">
          <form className="formCard" onSubmit={save}>
            <input className="input" name="companyName" defaultValue={store.settings.companyName} placeholder="Firmenname" />
            <input className="input" name="ownerName" defaultValue={store.settings.ownerName} placeholder="Owner" />
            <button className="btn">Speichern</button>
          </form>
        </Panel>

        <Panel title="Daten" subtitle="localStorage">
          <div className="workList">
            <button className="btn" onClick={exportJson}>JSON Export herunterladen</button>
            <label className="uploadBtn">
              JSON Import
              <input type="file" accept="application/json" onChange={(e) => importJson(e.target.files?.[0] ?? null)} />
            </label>
            <button className="btn dangerBtn" onClick={() => {
              if (confirm("Demo-Daten wirklich zurücksetzen?")) setStore(cloneDemo());
            }}>Demo-Daten zurücksetzen</button>
          </div>
        </Panel>
      </section>

      <Panel title="Wichtig" subtitle="nächste echte SaaS-Stufe">
        <div className="workList">
          <div className="workItem"><strong>Aktuell</strong><span>speichert im Browser</span></div>
          <div className="workItem"><strong>Nächster Schritt</strong><span>Supabase/PostgreSQL Datenbank</span></div>
          <div className="workItem"><strong>Danach</strong><span>Login, Rollen, Mandanten, echte Uploads</span></div>
        </div>
      </Panel>
    </>
  );
}
