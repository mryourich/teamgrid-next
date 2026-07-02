import { Panel, Badge } from "@/components/Cards";
import { documents } from "@/lib/data";

export default function DocumentsPage() {
  return (
    <>
      <div className="moduleHead">
        <h2>Dokumente</h2>
        <p>Projektdateien, Fotos, Protokolle und Exporte.</p>
      </div>

      <Panel title="Dateiablage" subtitle="Mock-Daten">
        <div className="workList">
          {documents.map((doc) => (
            <div className="dataRow" key={doc.id}>
              <div>
                <strong>{doc.name}</strong>
                <small>{doc.project}</small>
              </div>
              <span>{doc.type}</span>
              <span>{doc.date}</span>
              <Badge>Demo</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
