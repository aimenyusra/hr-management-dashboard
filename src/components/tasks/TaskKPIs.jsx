import "../../styles/components/tasks/TaskKPIs.css";

const kpis = [
  { title: "Total Tasks",  value: "48", sub: "This month",      accent: "#4f6ef7", color: "#f0f4ff", icon: "📋", filter: "all"         },
  { title: "In Progress",  value: "14", sub: "Active tasks",    accent: "#f59e0b", color: "#fef9c3", icon: "⚡", filter: "in-progress" },
  { title: "Completed",    value: "28", sub: "58% of total",    accent: "#22c55e", color: "#dcfce7", icon: "✅", filter: "completed"   },
  { title: "Overdue",      value: "6",  sub: "Needs attention", accent: "#ef4444", color: "#fee2e2", icon: "🚨", filter: "overdue"     },
];

export default function TaskKPIs({ activeFilter, onFilterChange }) {
  return (
    <div className="task-kpi-group">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className={`card emp-kpi-card ${activeFilter === kpi.filter ? "emp-kpi-card--active" : ""}`}
          style={{ borderLeft: `4px solid ${kpi.accent}` }}
          onClick={() => onFilterChange(activeFilter === kpi.filter ? "all" : kpi.filter)}
        >
          <div className="emp-kpi-left">
            <p className="emp-kpi-title">{kpi.title}</p>
            <h2 className="emp-kpi-value" style={{ color: kpi.accent }}>{kpi.value}</h2>
            <span className="emp-kpi-badge" style={{ color: kpi.accent, background: kpi.color }}>
              {kpi.sub}
            </span>
          </div>
          <div className="emp-kpi-icon" style={{ background: kpi.color, color: kpi.accent }}>
            {kpi.icon}
          </div>
        </div>
      ))}
    </div>
  );
}