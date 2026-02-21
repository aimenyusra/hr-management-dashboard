import { useNavigate } from "react-router-dom";
import "../styles/components/KPICards.css";

const kpis = [
  { title: "Total Employees", value: "800",  sub: "Active Employees",  accent: "#4f6ef7", color: "#f0f4ff", route: "/employees"  },
  { title: "Present Today",   value: "760",  sub: "Checked in today",  accent: "#22c55e", color: "#f0faf4", route: "/attendance" },
  { title: "On Leave",        value: "30",   sub: "Approved leaves",   accent: "#f97316", color: "#fff8f0", route: "/attendance" },
  { title: "Absent",          value: "10",   sub: "Not checked in",    accent: "#ef4444", color: "#fee2e2", route: "/attendance" },
];

export default function KPICards() {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="kpi-grid">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className="card kpi-card kpi-card--clickable"
          style={{ borderTop: `4px solid ${kpi.accent}` }}
          onClick={() => handleCardClick(kpi.route)}
        >
          <p className="kpi-card-title">{kpi.title}</p>
          <h2 className="kpi-card-value" style={{ color: kpi.accent }}>
            {kpi.value}
          </h2>
          <span className="kpi-card-badge" style={{ color: kpi.accent, background: kpi.color }}>
            {kpi.sub}
          </span>
        </div>
      ))}
    </div>
  );
}