import Header from "../components/Header";
import KPICards from "../components/dashboard/KPICards";
import AttendanceOverview from "../components/dashboard/AttendanceOverview";
import PendingRequests from "../components/dashboard/PendingRequests";
import UpcomingLeave from "../components/dashboard/UpcomingLeave";
import RecentActivity from "../components/dashboard/RecentActivity";
import "../styles/pages/Dashboard.css";
import "../styles/components/ClickableCards.css"

export default function Dashboard() {
  return (
    <>
    
      <Header 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening today." 
      />

      {/* KPI Cards Row */}
      <KPICards />

      {/* Main Grid Layout */}
      <div className="dashboard-grid">
        
        {/* Left Column */}
        <AttendanceOverview />
        
        {/* Right Column */}
        <PendingRequests />
        
        {/* Left Column */}
        <UpcomingLeave />
        {/* Right Column */}
      <RecentActivity />
      </div>
    </>
  );
}