import { useNavigate } from "react-router-dom";
import "../../styles/components/dashboard/RecentActivity.css";

const activities = [
  { icon: "📄", text: "John Doe submitted a leave request",         time: "2 mins ago" },
  { icon: "⏰", text: "Maria Lee checked in late",                   time: "19 mins ago" },
  { icon: "✅", text: "Alex Chen's WFH was approved",                time: "1 hour ago" },
  { icon: "👤", text: "New employee Tom Brady onboarded",            time: "2 hours ago" },
  { icon: "📊", text: "Attendance report generated",                 time: "4 hours ago" },
];

export default function RecentActivity() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tasks");
  };

  return (
    <div className="card activity-card activity-card--clickable" onClick={handleClick}>
      <div className="activity-header">
        <h3 className="activity-title">Recent Activity</h3>
        <span className="view-details">View Tasks →</span>
      </div>

      <div className="activity-list">
        {activities.map((activity, i) => (
          <div key={i} className="activity-item">
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-content">
              <p className="activity-text">{activity.text}</p>
              <p className="activity-time">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}