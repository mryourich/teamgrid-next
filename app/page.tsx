import Link from "next/link";
import { Panel, StatCard, Badge } from "@/components/Cards";
import { metrics, projects, tasks } from "@/lib/data";

export default function HomePage() {
  const balance = metrics.revenue - metrics.costs;

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">TeamGrid Company OS</span>
          <h2>Dein Unternehmen auf einen Blick.</h2>
          <p>
            TeamGrid verbindet Projekte, Aufgaben, Personal, Material, Fuhrpark,
            Dokumente, Zeiten und Finanzen in einem zentralen Command Center.
          </p>
          <div className="heroActions">
            <Link className="btn" href="/tasks">Aufgaben öffnen</Link>
            <Link className="btn secondary" href="/projects">Projekte ansehen</Link>
          </div>
        </div>
        <div className="healthRing">
          <strong>84%</strong>
          <small>System</small>
        </div>
      </section>

      <section className="statGrid">
        <StatCard label="Projekte" value={metrics.projects} hint="aktiv" />
        <StatCard label="Aufgaben" value={metrics.openTasks} hint="offen" tone="warning" />
        <StatCard label="Heute" value={metrics.today} hint="fällig" tone="danger" />
        <StatCard label="People" value={metrics.people} hint="aktiv" />
        <StatCard label="Material" value={metrics.materialOpen} hint="offen" />
        <StatCard label="Saldo" value={`${balance.toLocaleString("de-AT")} €`} hint="aktuell" tone="success" />
      </section>

      <section className="grid2">
        <Panel title="Heute wichtig" subtitle="operative Punkte">
          <div className="workList">
            {tasks.slice(0, 4).map((task) => (
              <div className="workItem" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <small>{task.project} · {task.person}</small>
                </div>
                <Badge tone={task.priority === "high" ? "danger" : "default"}>{task.priority}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Finanzradar" subtitle="Demo-Werte">
          <div className="workList">
            <div className="workItem"><strong>Einnahmen</strong><Badge>{metrics.revenue.toLocaleString("de-AT")} €</Badge></div>
            <div className="workItem"><strong>Ausgaben</strong><Badge tone="danger">{metrics.costs.toLocaleString("de-AT")} €</Badge></div>
            <div className="workItem"><strong>Saldo</strong><Badge tone="success">{balance.toLocaleString("de-AT")} €</Badge></div>
          </div>
        </Panel>
      </section>

      <Panel title="Projekt-Pipeline" subtitle="Fortschritt">
        <div className="workList">
          {projects.map((project) => (
            <div className="dataRow" key={project.id}>
              <div>
                <strong>{project.name}</strong>
                <small>{project.type} · {project.location}</small>
              </div>
              <span>{project.progress}%</span>
              <div className="progress"><span style={{ width: `${project.progress}%` }} /></div>
              <Badge>{project.status}</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
