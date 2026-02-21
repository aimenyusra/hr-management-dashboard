import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard  from "./pages/Dashboard";
import Employees  from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Requests   from "./pages/Requests";
import Tasks      from "./pages/Tasks";
import Reports    from "./pages/Reports";
import Billing    from "./pages/Billing";
import Help       from "./pages/Help";
import Settings   from "./pages/Settings";
import "./styles/global.css";
import "./styles/pages/ComingSoon.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/"           element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"  element={<Dashboard />}  />
            <Route path="/employees"  element={<Employees />}  />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/requests"   element={<Requests />}   />
            <Route path="/tasks"      element={<Tasks />}      />
            <Route path="/reports"    element={<Reports />}    />
            <Route path="/billing"    element={<Billing />}    />
            <Route path="/help"       element={<Help />}       />
            <Route path="/settings"   element={<Settings />}   />
            <Route path="*"           element={<NotFound />}   />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-icon">404</div>
      <h1 className="coming-soon-title">Page Not Found</h1>
      <p className="coming-soon-sub">The page you're looking for doesn't exist.</p>
      <a href="/dashboard" className="coming-soon-badge" style={{ textDecoration:"none" }}>
        Go to Dashboard
      </a>
    </div>
  );
}