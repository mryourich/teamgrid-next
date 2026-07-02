import { Badge } from "@/components/Cards";
import { tasks } from "@/lib/data";

const columns = [
  { key: "open", title: "Offen" },
  { key: "progress", title: "In Arbeit" },
  { key: "done", title: "Erledigt" }
];

export default function TasksPage() {
  return (
    <>
      <div className="moduleHead">
        <h2>Aufgaben</h2>
        <p>Kanban-Ansicht für operative Arbeit, Mängel, Fortschritt und interne Punkte.</p>
      </div>

      <div className="kanban">
        {columns.map((column) => (
          <section className="kanbanCol" key={column.key}>
            <h2>{column.title}</h2>
            {tasks.filter((task) => task.status === column.key).map((task) => (
              <article className="taskCard" key={task.id}>
                <strong>{task.title}</strong>
                <small>{task.project} · {task.person}</small>
                <div>
                  <Badge tone={task.priority === "high" ? "danger" : "default"}>{task.priority}</Badge>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
