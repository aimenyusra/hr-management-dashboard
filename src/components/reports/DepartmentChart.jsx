import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "../../styles/components/reports/ReportCharts.css";

const departmentData = [
  { name: "Engineering", count: 320, color: "#4f6ef7" },
  { name: "Product", count: 180, color: "#22c55e" },
  { name: "Design", count: 120, color: "#8b5cf6" },
  { name: "Marketing", count: 100, color: "#f97316" },
  { name: "Operations", count: 80, color: "#06b6d4" },
];

export default function DepartmentChart() {
  const total = departmentData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Employees by Department</h3>
          <p className="chart-subtitle">Workforce distribution</p>
        </div>
        <div className="chart-badge" style={{ background: "#f0f4ff", color: "#4f6ef7" }}>
          {total} Total
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
          />
          <YAxis 
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e8edf5",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            cursor={{ fill: "rgba(79, 110, 247, 0.1)" }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {departmentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}