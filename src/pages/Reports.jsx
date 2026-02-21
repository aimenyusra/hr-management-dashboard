import Header from "../components/Header";
import ReportKPIs from "../components/reports/ReportKPIs";
import AttendanceTrendChart from "../components/reports/AttendanceTrendChart";
import DepartmentChart from "../components/reports/DepartmentChart";
import TaskStatusChart from "../components/reports/TaskStatusChart";
import ReportTable from "../components/reports/ReportTable";
import "../styles/pages/Reports.css";

export default function Reports() {
  return (
    <>
      <Header
        title="Reports & Analytics"
        subtitle="Monitor workforce performance and insights"
        action={
          <div className="report-header-actions">
            <select className="date-range-select">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
            <button className="export-report-btn">⬇ Export Report</button>
          </div>
        }
      />

      {/* KPI Cards */}
      <ReportKPIs />

      {/* Attendance Trend - Full Width */}
      <div className="attendance-chart">
      <AttendanceTrendChart />
      </div>

      {/* Department + Task Status - Side by Side */}
      <div className="charts-row">
        <DepartmentChart />
        <TaskStatusChart />
      </div>

      {/* Detailed Report Table */}
      <ReportTable />
    </>
  );
}