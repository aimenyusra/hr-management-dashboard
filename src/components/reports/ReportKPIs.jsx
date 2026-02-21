import "../../styles/components/reports/ReportKPIs.css";

const kpis = [
  { title: "Total Employees",       value: "800",  sub: "+12 this month",    accent: "#4f6ef7", color: "#f0f4ff", icon: "👥" },
  { title: "Avg Attendance Rate",   value: "91%",  sub: "Last 30 days",      accent: "#22c55e", color: "#dcfce7", icon: "📊" },
  { title: "Task Completion Rate",  value: "72%",  sub: "This month",        accent: "#8b5cf6", color: "#faf5ff", icon: "✅" },
  { title: "Pending Requests",      value: "18",   sub: "Awaiting review",   accent: "#f97316", color: "#fff8f0", icon: "⏳" },
];

export default function ReportKPIs() {
  return (
    <div className="report-kpi-grid">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className="card report-kpi-card"
          style={{ borderLeft: `4px solid ${kpi.accent}` }}
        >
          <div className="kpi-header">
            <span className="kpi-icon" style={{ background: kpi.color, color: kpi.accent }}>
              {kpi.icon}
            </span>
            <p className="kpi-title">{kpi.title}</p>
          </div>
          <h2 className="kpi-value" style={{ color: kpi.accent }}>{kpi.value}</h2>
          <span className="kpi-badge" style={{ color: kpi.accent, background: kpi.color }}>
            {kpi.sub}
          </span>
        </div>
      ))}
    </div>
  );
}