import { Panel, Badge } from "@/components/Cards";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <>
      <div className="moduleHead">
        <h2>Projekte</h2>
        <p>Alle Baustellen, Serviceaufträge und Unternehmensprojekte zentral verwalten.</p>
      </div>

      <section className="grid3">
        <Panel title="Neues Projekt" subtitle="Demo-Formular">
          <form className="formCard">
            <input className="input" placeholder="Projektname" />
            <select className="select"><option>Tunnelbau</option><option>Industrie</option><option>Service</option></select>
            <input className="input" placeholder="Ort" />
            <textarea className="textarea" placeholder="Beschreibung" />
            <button className="btn" type="button">Projekt erstellen</button>
          </form>
        </Panel>

        <Panel title="Projektstatus" subtitle="Übersicht">
          <div className="workList">
            <div className="workItem"><strong>Aktiv</strong><Badge>3</Badge></div>
            <div className="workItem"><strong>Pausiert</strong><Badge>1</Badge></div>
            <div className="workItem"><strong>Abgeschlossen</strong><Badge tone="success">4</Badge></div>
          </div>
        </Panel>

        <Panel title="Nächster Schritt" subtitle="später">
          <p>Echte Datenbank, Rechte je Projekt, Dateien, Aufgaben und Fortschritt pro Projekt.</p>
        </Panel>
      </section>

      <Panel title="Projektliste" subtitle="Mock-Daten">
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
