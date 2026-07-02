import { Panel, Badge } from "@/components/Cards";
import { finance } from "@/lib/data";

export default function FinancePage() {
  const total = finance.reduce((sum, item) => item.type === "Einnahme" ? sum + item.amount : sum - item.amount, 0);

  return (
    <>
      <div className="moduleHead">
        <h2>Finanzen</h2>
        <p>Einnahmen, Ausgaben, Projektbudgets und offene Beträge.</p>
      </div>

      <section className="grid2">
        <Panel title="Finanzübersicht" subtitle="Demo">
          <div className="workList">
            {finance.map((item) => (
              <div className="dataRow" key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.type}</small>
                </div>
                <span>{item.amount.toLocaleString("de-AT")} €</span>
                <Badge>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Saldo" subtitle="aktuell">
          <div className="statCard success">
            <span>Saldo</span>
            <strong>{total.toLocaleString("de-AT")} €</strong>
            <small>Demo-Berechnung</small>
          </div>
        </Panel>
      </section>
    </>
  );
}
