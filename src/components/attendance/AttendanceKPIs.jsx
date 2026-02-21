import "../../styles/components/attendance/AttendanceKPIs.css";

const kpis = [
  { 
    title: "Attendance Rate", 
    value: "92.5%", 
    sub: "740 of 800 present", 
    accent: "#22c55e", 
    color: "#dcfce7", 
    icon: "📊",
    filter: "present"  // Shows ONLY present employees
  },
  { 
    title: "Late Check-ins", 
    value: "20", 
    sub: "2.5% of workforce", 
    accent: "#f97316", 
    color: "#fff8f0", 
    icon: "⏰",
    filter: "late"  // Shows ONLY late employees
  },
  { 
    title: "Early Check-outs", 
    value: "8", 
    sub: "1% left before time", 
    accent: "#f59e0b", 
    color: "#fef9c3", 
    icon: "🚪",
    filter: "early-checkout"  // Shows ONLY early checkout
  },
  { 
    title: "Approved Leave Today", 
    value: "32", 
    sub: "4% on leave", 
    accent: "#8b5cf6", 
    color: "#faf5ff", 
    icon: "🌴",
    filter: "on-leave"  // Shows ONLY on leave
  },
  { 
    title: "Weekly Average", 
    value: "88%", 
    sub: "Last 7 days trend", 
    accent: "#06b6d4", 
    color: "#f0fdfa", 
    icon: "📅",
    filter: "week-view"  // UNIQUE filter - could show weekly stats
  },
  { 
    title: "Monthly Average", 
    value: "91%", 
    sub: "This month trend", 
    accent: "#4f6ef7", 
    color: "#f0f4ff", 
    icon: "📆",
    filter: "month-view"  // UNIQUE filter - could show monthly stats
  },
];

export default function AttendanceKPIs({ activeFilter, onFilterChange }) {
  const handleCardClick = (filter) => {
    // Toggle filter: if already active, reset to "all"
    if (activeFilter === filter) {
      onFilterChange("all");
    } else {
      onFilterChange(filter);
    }
  };

  return (
    <div className="attendance-kpi-grid">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className={`card attendance-kpi-card ${activeFilter === kpi.filter ? "attendance-kpi-card--active" : ""}`}
          style={{ borderLeft: `4px solid ${kpi.accent}` }}
          onClick={() => handleCardClick(kpi.filter)}
        >
          <div className="attendance-kpi-header">
            <span className="attendance-kpi-icon" style={{ background: kpi.color, color: kpi.accent }}>
              {kpi.icon}
            </span>
            <p className="attendance-kpi-title">{kpi.title}</p>
          </div>
          
          <h2 className="attendance-kpi-value" style={{ color: kpi.accent }}>
            {kpi.value}
          </h2>
          
          <span className="attendance-kpi-badge" style={{ color: kpi.accent, background: kpi.color }}>
            {kpi.sub}
          </span>

          {activeFilter === kpi.filter && (
            <div className="kpi-active-badge" style={{ background: kpi.accent }}>
              ✓ Filtering
            </div>
          )}
        </div>
      ))}
    </div>
  );
}