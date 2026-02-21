import "../../styles/components/requests/RequestKPIs.css";

const kpis = [
  { title: "Pending Requests", value: "18", sub: "Awaiting review",   accent: "#f59e0b", color: "#fef9c3", filter: "pending"  },
  { title: "Approved",         value: "42", sub: "This month",        accent: "#22c55e", color: "#dcfce7", filter: "approved" },
  { title: "Rejected",         value: "9",  sub: "This month",        accent: "#ef4444", color: "#fee2e2", filter: "rejected" },
  { title: "Total This Month", value: "69", sub: "All requests",      accent: "#4f6ef7", color: "#f0f4ff", filter: "all"      },
];

export default function RequestKPIs({ activeFilter, onFilterChange }) {
  return (
    <div className="request-kpi-grid">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className={`card kpi-card kpi-card--clickable ${activeFilter === kpi.filter ? "kpi-card--active" : ""}`}
          style={{ borderTop: `4px solid ${kpi.accent}` }}
          onClick={() => onFilterChange(activeFilter === kpi.filter ? "all" : kpi.filter)}
        >
          <p className="kpi-card-title">{kpi.title}</p>
          <h2 className="kpi-card-value" style={{ color: kpi.accent }}>{kpi.value}</h2>
          <span className="kpi-card-badge" style={{ color: kpi.accent, background: kpi.color }}>
            {kpi.sub}
          </span>
          {activeFilter === kpi.filter && (
            <div className="kpi-active-indicator" style={{ background: kpi.accent }}>
              ✓ Filtering
            </div>
          )}
        </div>
      ))}
    </div>
  );
}