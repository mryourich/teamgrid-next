import { Panel, Badge } from "@/components/Cards";
import { vehicles } from "@/lib/data";

export default function FleetPage() {
  return (
    <>
      <div className="moduleHead">
        <h2>Fuhrpark</h2>
        <p>Fahrzeuge, Fahrer, Service, Pickerl und Einsatzplanung.</p>
      </div>

      <Panel title="Fahrzeuge" subtitle="Demo-Daten">
        <div className="workList">
          {vehicles.map((vehicle) => (
            <div className="dataRow" key={vehicle.id}>
              <div>
                <strong>{vehicle.plate}</strong>
                <small>{vehicle.name}</small>
              </div>
              <span>{vehicle.driver}</span>
              <span>Service: {vehicle.service}</span>
              <Badge tone="success">{vehicle.status}</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
