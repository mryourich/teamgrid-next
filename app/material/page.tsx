import { Panel, Badge } from "@/components/Cards";
import { material } from "@/lib/data";

export default function MaterialPage() {
  return (
    <>
      <div className="moduleHead">
        <h2>Material</h2>
        <p>Materialbedarf, Bestellungen, Lieferstatus und Lieferanten.</p>
      </div>

      <Panel title="Materialliste" subtitle="Demo-Daten">
        <div className="workList">
          {material.map((item) => (
            <div className="dataRow" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <small>{item.supplier}</small>
              </div>
              <span>{item.amount} {item.unit}</span>
              <span>{item.status}</span>
              <Badge>{item.status}</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
