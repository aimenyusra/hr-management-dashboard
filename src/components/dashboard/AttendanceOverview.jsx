import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../../styles/components/dashboard/AttendanceOverview.css";
import { useNavigate } from "react-router-dom";

const attendanceData = [
  { name: "Present", value: 760, color: "#22c55e" },
  { name: "On Leave", value: 30, color: "#f97316" },
  { name: "Absent", value: 10, color: "#ef4444" },
];

export default function AttendanceOverview() {
  const total = attendanceData.reduce((sum, item) => sum + item.value, 0);
  const presentPercentage = Math.round((760 / total) * 100);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/attendance");
  };

  return (
    <div className="card attendance-card" onClick={handleClick}>
      <div className="attendance-header">
        <h3 className="attendance-title">Attendance Overview</h3>
        <span className="attendance-date">View Details →</span>
      </div>

      <div className="attendance-content">
        {/* Left side - Recharts Donut Chart */}
        <div className="donut-section">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Percentage Text */}
          <div className="donut-center">
            <span className="donut-percentage">{presentPercentage}%</span>
            <span className="donut-label">Present</span>
          </div>
        </div>

        {/* Right side - Stats */}
        <div className="attendance-stats">
          <div className="stat-item stat-item--present">
            <div className="stat-left">
              <span className="stat-dot"></span>
              <span className="stat-label">Present</span>
            </div>
            <span className="stat-value">760</span>
          </div>

          <div className="stat-item stat-item--leave">
            <div className="stat-left">
              <span className="stat-dot"></span>
              <span className="stat-label">On Leave</span>
            </div>
            <span className="stat-value">30</span>
          </div>

          <div className="stat-item stat-item--absent">
            <div className="stat-left">
              <span className="stat-dot"></span>
              <span className="stat-label">Absent</span>
            </div>
            <span className="stat-value">10</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-item stat-item--total">
            <div className="stat-left">
              <span className="stat-icon">👥</span>
              <span className="stat-label">Total</span>
            </div>
            <span className="stat-value">800</span>
          </div>
        </div>
      </div>
    </div>
  );
}