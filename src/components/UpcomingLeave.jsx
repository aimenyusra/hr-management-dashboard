import { useNavigate } from "react-router-dom";
import "../styles/components/UpcomingLeave.css";

const leaves = [
  { name: "Sarah Khan", type: "Casual Leave", dates: "12 March - 13 March • 2 days", avatar: "SK", color: "#8b5cf6" },
  { name: "Ravi Sharma", type: "Sick Leave",  dates: "15 March - 19 March • 5 days", avatar: "RS", color: "#f97316" },
];

export default function UpcomingLeave() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to attendance page
    // In a real app, you could pass state to filter by "on leave"
    navigate("/attendance");
  };

  return (
    <div className="card upcoming-card upcoming-card--clickable" onClick={handleClick}>
      <div className="upcoming-header">
        <h3 className="upcoming-title">Upcoming Leave</h3>
        <span className="view-details">View All →</span>
      </div>

      <div className="leave-list">
        {leaves.map((leave, i) => (
          <div key={i} className="leave-item">
            <div className="leave-avatar" style={{ background: leave.color }}>
              {leave.avatar}
            </div>
            <div className="leave-info">
              <p className="leave-name">{leave.name}</p>
              <p className="leave-type">{leave.type}</p>
              <p className="leave-dates">{leave.dates}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}