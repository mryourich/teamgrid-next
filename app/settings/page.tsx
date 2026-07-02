import { Panel } from "@/components/Cards";

export default function SettingsPage() {
  return (
    <>
      <div className="moduleHead">
        <h2>Einstellungen</h2>
        <p>Firma, Module, Rollen und Plattform-Konfiguration.</p>
      </div>

      <section className="grid2">
        <Panel title="Firma" subtitle="Demo">
          <form className="formCard">
            <input className="input" defaultValue="TeamGrid Unternehmen" />
            <input className="input" defaultValue="Mario Juric" />
            <button className="btn" type="button">Speichern</button>
          </form>
        </Panel>

        <Panel title="Nächste Ausbaustufe" subtitle="SaaS">
          <div className="workList">
            <div className="workItem"><strong>Login</strong><span>Supabase Auth</span></div>
            <div className="workItem"><strong>Datenbank</strong><span>PostgreSQL</span></div>
            <div className="workItem"><strong>Rollen</strong><span>Admin, PM, Employee, Extern</span></div>
            <div className="workItem"><strong>Upload</strong><span>Storage Bucket</span></div>
          </div>
        </Panel>
      </section>
    </>
  );
}
