import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import "../../styles/components/reports/ReportCharts.css";

const taskData = [
  { name: "Completed", value: 28, color: "#22c55e" },
  { name: "In Progress", value: 14, color: "#f59e0b" },
  { name: "To Do", value: 6, color: "#94a3b8" },
  { name: "Overdue", value: 6, color: "#ef4444" },
];

export default function TaskStatusChart() {
  const total = taskData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className=" card chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Task Status Distribution</h3>
          <p className="chart-subtitle">Current month breakdown</p>
        </div>
        <div className="chart-badge" style={{ background: "#faf5ff", color: "#8b5cf6" }}>
          {total} Tasks
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={taskData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {taskData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e8edf5",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend 
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
            formatter={(value, entry) => `${value}: ${entry.payload.value}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}