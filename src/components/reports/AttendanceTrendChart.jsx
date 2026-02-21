import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../../styles/components/reports/ReportCharts.css";

const trendData = [
  { date: "Mar 1", attendance: 88 },
  { date: "Mar 3", attendance: 91 },
  { date: "Mar 5", attendance: 94 },
  { date: "Mar 7", attendance: 90 },
  { date: "Mar 9", attendance: 87 },
  { date: "Mar 11", attendance: 93 },
  { date: "Mar 13", attendance: 95 },
  { date: "Mar 15", attendance: 92 },
  { date: "Mar 17", attendance: 89 },
  { date: "Mar 19", attendance: 94 },
  { date: "Mar 21", attendance: 96 },
  { date: "Mar 23", attendance: 91 },
  { date: "Mar 25", attendance: 93 },
  { date: "Mar 27", attendance: 92 },
];

export default function AttendanceTrendChart() {
  const avgAttendance = Math.round(
    trendData.reduce((sum, d) => sum + d.attendance, 0) / trendData.length
  );

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Attendance Trend</h3>
          <p className="chart-subtitle">Daily attendance rate over last 14 days</p>
        </div>
        <div className="chart-badge" style={{ background: "#dcfce7", color: "#15803d" }}>
          Avg {avgAttendance}%
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
          />
          <YAxis 
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            domain={[80, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e8edf5",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#1e293b", fontWeight: 600 }}
          />
          <Line 
            type="monotone" 
            dataKey="attendance" 
            stroke="#4f6ef7" 
            strokeWidth={3}
            dot={{ fill: "#4f6ef7", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}