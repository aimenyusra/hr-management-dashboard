import "../../styles/components/employees/DepartmentChart.css";

const departments = [
  { name: "Engineering", count: 320, pct: 40, color: "#4f6ef7" },
  { name: "Product",     count: 180, pct: 22, color: "#22c55e" },
  { name: "Design",      count: 120, pct: 15, color: "#8b5cf6" },
  { name: "Marketing",   count: 100, pct: 12, color: "#f97316" },
  { name: "Operations",  count: 80,  pct: 10, color: "#06b6d4" },
];

export default function DepartmentChart() {
  const totalCount = departments.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="card dept-card">
      <div className="dept-header">
        <div className="dept-header-left">
          <p className="dept-title">Employees by Department</p>
          <p className="dept-subtitle">Workforce distribution across departments</p>
        </div>
        <div className="dept-total">
          <span className="dept-total-label">Total</span>
          <span className="dept-total-value">{totalCount}</span>
        </div>
      </div>

      {/* Horizontal department rows */}
      <div className="dept-rows">
        {departments.map((d) => (
          <div key={d.name} className="dept-row">
            <span className="dept-name">{d.name}</span>
            <div className="dept-bar-track">
              <div
                className="dept-bar-fill"
                style={{ width: `${d.pct}%`, background: d.color }}
              >
                <span className="dept-pct-label">{d.pct}%</span>
              </div>
            </div>
            <span className="dept-count-badge">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}