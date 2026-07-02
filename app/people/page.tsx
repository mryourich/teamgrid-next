import { Panel, Badge } from "@/components/Cards";
import { people } from "@/lib/data";

export default function PeoplePage() {
  return (
    <>
      <div className="moduleHead">
        <h2>People</h2>
        <p>Mitarbeiter, Partnerfirmen, externe Arbeiter und Rollen im Unternehmen.</p>
      </div>

      <section className="grid3">
        {people.map((person) => (
          <Panel title={person.name} subtitle={person.company} key={person.id}>
            <div className="workList">
              <div className="workItem"><strong>Rolle</strong><span>{person.role}</span></div>
              <div className="workItem"><strong>Telefon</strong><span>{person.phone}</span></div>
              <div className="workItem"><strong>Status</strong><Badge tone="success">{person.status}</Badge></div>
            </div>
          </Panel>
        ))}
      </section>
    </>
  );
}
