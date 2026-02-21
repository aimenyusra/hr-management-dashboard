import Header from "../components/Header";
import KPICards from "../components/KPICards";
import AttendanceOverview from "../components/AttendanceOverview";
import PendingRequests from "../components/PendingRequests";
import UpcomingLeave from "../components/UpcomingLeave";
import RecentActivity from "../components/RecentActivity";
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