import "../../styles/components/employees/EmployeeKPICards.css";

const empKpis = [
  { title: "Total Employees", value: "800", sub: "+12 this month",   accent: "#4f6ef7", color: "#f0f4ff", icon: "👥", filter: "all"      },
  { title: "Full-Time",       value: "680", sub: "85% of workforce", accent: "#22c55e", color: "#f0faf4", icon: "💼", filter: "fulltime" },
  { title: "Contract",        value: "90",  sub: "11% of workforce", accent: "#f97316", color: "#fff8f0", icon: "📋", filter: "contract" },
  { title: "Remote Workers",  value: "320", sub: "40% work remote",  accent: "#8b5cf6", color: "#faf5ff", icon: "🏠", filter: "remote"   },
];

export default function EmployeeKPICards({ activeFilter, onFilterChange }) {
  return (
    <div className="emp-kpi-group">
      {empKpis.map((kpi) => (
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