import { useNavigate } from "react-router-dom";
import "../styles/components/PendingRequests.css";

const requests = [
  { name: "Justin Lipshutz", type: "Leave",     date: "22 Feb", status: "Approved", avatar: "JL" },
  { name: "Marcus Culhane",  type: "WFH",       date: "24 Feb", status: "Pending",  avatar: "MC" },
  { name: "Leo Stanton",     type: "Late Entry", date: "28 Feb", status: "Approved", avatar: "LS" },
];

const avatarColors = ["#4f6ef7", "#22c55e", "#f97316"];

const statusConfig = {
  Approved: { bg: "#dcfce7", color: "#15803d" },
  Pending:  { bg: "#fef9c3", color: "#854d0e" },
};

export default function PendingRequests() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/requests");
  };

  const handleViewAll = (e) => {
    e.stopPropagation(); // Prevent card click
    navigate("/requests");
  };

  return (
    <div className="card pending-card pending-card--clickable" onClick={handleClick}>
      <div className="pending-header">
        <h3 className="pending-title">Pending Requests</h3>
        <button className="view-all-btn" onClick={handleViewAll}>
          View all →
        </button>
      </div>

      <div className="request-list">
        {requests.map((req, i) => {
          const s = statusConfig[req.status];
          return (
            <div key={i} className="request-item">
              <div className="request-left">
                <div className="req-avatar" style={{ background: avatarColors[i] }}>
                  {req.avatar}
                </div>
                <div className="req-info">
                  <p className="req-name">{req.name}</p>
                  <p className="req-type">{req.type}</p>
                </div>
              </div>
              <div className="request-right">
                <p className="req-date">{req.date}</p>
                <span className="req-status" style={{ background: s.bg, color: s.color }}>
                  {req.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}