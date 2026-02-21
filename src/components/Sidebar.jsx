import { NavLink } from "react-router-dom";
import "../styles/components/Sidebar.css";

const sidebarItems = [
  { icon: "⊞", label: "Dashboard", path: "/dashboard" },
  { icon: "👥", label: "Employees", path: "/employees" },
  { icon: "📅", label: "Attendance", path: "/attendance" },
  { icon: "📋", label: "Requests", path: "/requests" },
  { icon: "✅", label: "Tasks", path: "/tasks" },
  { icon: "📊", label: "Reports", path: "/reports" },
];

const bottomItems = [
  { icon: "💳", label: "Billing", path: "/billing" },
  { icon: "❓", label: "Help", path: "/help" },
  { icon: "⚙️", label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🌐</div>
        <span className="sidebar-logo-text">WorkSphere</span>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-bottom-item ${isActive ? "active" : ""}`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}