import { useState } from "react";
import "../../styles/components/attendance/AttendanceTable.css";

const attendanceData = [
  { id: 1,  name: "Daniel Park",    avatar: "DP", department: "Engineering", checkIn: "08:55 AM", checkOut: "05:30 PM", status: "present",        workHours: "8.5" },
  { id: 2,  name: "Sarah Lin",      avatar: "SL", department: "Design",      checkIn: "09:10 AM", checkOut: "06:00 PM", status: "late",           workHours: "8.8" },
  { id: 3,  name: "James Okafor",   avatar: "JO", department: "Engineering", checkIn: "—",        checkOut: "—",        status: "on-leave",       workHours: "0" },
  { id: 4,  name: "Priya Nair",     avatar: "PN", department: "Product",     checkIn: "08:45 AM", checkOut: "05:45 PM", status: "present",        workHours: "9.0" },
  { id: 5,  name: "Marcus Webb",    avatar: "MW", department: "Marketing",   checkIn: "09:15 AM", checkOut: "06:15 PM", status: "late",           workHours: "9.0" },
  { id: 6,  name: "Elena Torres",   avatar: "ET", department: "HR",          checkIn: "08:50 AM", checkOut: "04:30 PM", status: "early-checkout", workHours: "7.7" },
  { id: 7,  name: "Kevin Zhang",    avatar: "KZ", department: "Engineering", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present",        workHours: "9.0" },
  { id: 8,  name: "Aisha Mensah",   avatar: "AM", department: "HR",          checkIn: "—",        checkOut: "—",        status: "on-leave",       workHours: "0" },
  { id: 9,  name: "Tom Brady",      avatar: "TB", department: "Sales",       checkIn: "09:20 AM", checkOut: "06:10 PM", status: "late",           workHours: "8.8" },
  { id: 10, name: "Lisa Chen",      avatar: "LC", department: "Design",      checkIn: "08:30 AM", checkOut: "05:30 PM", status: "present",        workHours: "9.0" },
  { id: 11, name: "Michael Scott",  avatar: "MS", department: "Sales",       checkIn: "09:05 AM", checkOut: "06:05 PM", status: "late",           workHours: "9.0" },
  { id: 12, name: "Angela Martin",  avatar: "AM2",department: "Finance",     checkIn: "08:55 AM", checkOut: "04:45 PM", status: "early-checkout", workHours: "7.8" },
  { id: 13, name: "Dwight Schrute", avatar: "DS", department: "Operations",  checkIn: "08:00 AM", checkOut: "05:00 PM", status: "present",        workHours: "9.0" },
  { id: 14, name: "Pam Beesly",     avatar: "PB", department: "HR",          checkIn: "—",        checkOut: "—",        status: "on-leave",       workHours: "0" },
  { id: 15, name: "Jim Halpert",    avatar: "JH", department: "Sales",       checkIn: "09:25 AM", checkOut: "06:20 PM", status: "late",           workHours: "8.9" },
];

const avatarColors = ["#4F6EF7","#22c55e","#f97316","#8b5cf6","#06b6d4","#ef4444","#0ea5e9","#a855f7"];

function getAvatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

const statusConfig = {
  "present":        { bg: "#dcfce7", color: "#15803d", dot: "#22c55e", label: "Present" },
  "late":           { bg: "#fff8f0", color: "#9a3412", dot: "#f97316", label: "Late" },
  "on-leave":       { bg: "#faf5ff", color: "#6b21a8", dot: "#8b5cf6", label: "On Leave" },
  "early-checkout": { bg: "#fef9c3", color: "#854d0e", dot: "#f59e0b", label: "Early Checkout" },
  "absent":         { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444", label: "Absent" },
};

const departments = ["All", "Engineering", "Design", "Product", "Marketing", "HR", "Sales", "Operations", "Finance"];

const filterLabels = {
  all:             "All Employees",
  present:         "Present Employees",
  late:            "Late Check-ins",
  "early-checkout": "Early Check-outs",
  "on-leave":      "On Leave Today",
  "week-view":     "Weekly Attendance View",
  "month-view":    "Monthly Attendance View",
};

export default function AttendanceTable({ activeFilter }) {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Apply ALL filters
  const filtered = attendanceData.filter((emp) => {
    // KPI Filter (from parent)
    let matchKPI = true;
    
    if (activeFilter === "present") {
      matchKPI = emp.status === "present";
    } else if (activeFilter === "late") {
      matchKPI = emp.status === "late";
    } else if (activeFilter === "early-checkout") {
      matchKPI = emp.status === "early-checkout";
    } else if (activeFilter === "on-leave") {
      matchKPI = emp.status === "on-leave";
    } else if (activeFilter === "week-view") {
      // For weekly view - show all (you could add date filtering logic here)
      matchKPI = true;
    } else if (activeFilter === "month-view") {
      // For monthly view - show all (you could add date filtering logic here)
      matchKPI = true;
    } else {
      // "all" or undefined
      matchKPI = true;
    }

    // Search filter
    const matchSearch = 
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());

    // Department filter
    const matchDept = deptFilter === "All" || emp.department === deptFilter;

    // Status filter
    const matchStatus = statusFilter === "All" || emp.status === statusFilter;

    return matchKPI && matchSearch && matchDept && matchStatus;
  });

  const clearFilters = () => {
    setSearch("");
    setDeptFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className=" card attendance-table-card">
      {/* Toolbar */}
      <div className="attendance-toolbar">
        <div className="toolbar-left">
          <p className="toolbar-title">
            {filterLabels[activeFilter] || "All Employees"}
          </p>
          <p className="toolbar-subtitle">
            Showing <strong>{filtered.length}</strong> of {attendanceData.length} employees
            {activeFilter && activeFilter !== "all" && (
              <span className="filter-chip">
                Filtered by: {filterLabels[activeFilter]}
              </span>
            )}
          </p>
        </div>

        <div className="toolbar-right">
          <div className="search-box">
            <span>🔍</span>
            <input
              className="search-input"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select className="filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="early-checkout">Early Checkout</option>
            <option value="on-leave">On Leave</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              {["Employee", "Department", "Check In", "Check Out", "Status", "Work Hours"].map(h => (
                <th key={h} className="att-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => {
              const s = statusConfig[emp.status];
              return (
                <tr key={emp.id} className={`att-tr ${i % 2 === 1 ? "att-tr--alt" : ""}`}>
                  <td className="att-td">
                    <div className="emp-cell">
                      <div className="avatar" style={{ width:32, height:32, background:getAvatarColor(emp.name), fontSize:10 }}>
                        {emp.avatar}
                      </div>
                      <span className="emp-name">{emp.name}</span>
                    </div>
                  </td>
                  <td className="att-td">{emp.department}</td>
                  <td className="att-td">
                    <span className={emp.status === "late" ? "time-late" : "time-normal"}>
                      {emp.checkIn}
                    </span>
                  </td>
                  <td className="att-td">
                    <span className={emp.status === "early-checkout" ? "time-early" : "time-normal"}>
                      {emp.checkOut}
                    </span>
                  </td>
                  <td className="att-td">
                    <span className="status-badge" style={{ background: s.bg, color: s.color }}>
                      <span className="status-dot" style={{ background: s.dot }} />
                      {s.label}
                    </span>
                  </td>
                  <td className="att-td">
                    <span className="work-hours">{emp.workHours}h</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No employees found.</p>
            <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="attendance-footer">
        <span className="footer-count">Showing {filtered.length} of {attendanceData.length} employees</span>
        <div className="footer-stats">
          <span>Present: <strong>{attendanceData.filter(e => e.status === "present").length}</strong></span>
          <span>Late: <strong>{attendanceData.filter(e => e.status === "late").length}</strong></span>
          <span>On Leave: <strong>{attendanceData.filter(e => e.status === "on-leave").length}</strong></span>
          <span>Early Checkout: <strong>{attendanceData.filter(e => e.status === "early-checkout").length}</strong></span>
        </div>
      </div>
    </div>
  );
}