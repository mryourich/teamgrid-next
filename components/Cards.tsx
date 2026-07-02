import { ReactNode } from "react";

export function StatCard({ label, value, hint, tone = "default" }: {
  label: string;
  value: string | number;
  hint: string;
  tone?: "default" | "warning" | "danger" | "success";
}) {
  return (
    <div className={`statCard ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </div>
  );
}

export function Panel({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
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

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
