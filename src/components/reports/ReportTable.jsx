import { useState } from "react";
import "../../styles/components/reports/ReportTable.css";

const reportData = [
  { id: 1,  name: "Daniel Park",    avatar: "DP", department: "Engineering", attendance: 96, tasksCompleted: 8,  leavesTaken: 2 },
  { id: 2,  name: "Sarah Lin",      avatar: "SL", department: "Design",      attendance: 92, tasksCompleted: 6,  leavesTaken: 3 },
  { id: 3,  name: "James Okafor",   avatar: "JO", department: "Engineering", attendance: 78, tasksCompleted: 4,  leavesTaken: 5 },
  { id: 4,  name: "Priya Nair",     avatar: "PN", department: "Product",     attendance: 94, tasksCompleted: 7,  leavesTaken: 1 },
  { id: 5,  name: "Marcus Webb",    avatar: "MW", department: "Marketing",   attendance: 90, tasksCompleted: 5,  leavesTaken: 2 },
  { id: 6,  name: "Elena Torres",   avatar: "ET", department: "HR",          attendance: 88, tasksCompleted: 9,  leavesTaken: 4 },
  { id: 7,  name: "Kevin Zhang",    avatar: "KZ", department: "Engineering", attendance: 95, tasksCompleted: 11, leavesTaken: 1 },
  { id: 8,  name: "Aisha Mensah",   avatar: "AM", department: "HR",          attendance: 91, tasksCompleted: 6,  leavesTaken: 3 },
  { id: 9,  name: "Tom Brady",      avatar: "TB", department: "Sales",       attendance: 89, tasksCompleted: 7,  leavesTaken: 2 },
  { id: 10, name: "Lisa Chen",      avatar: "LC", department: "Design",      attendance: 97, tasksCompleted: 10, leavesTaken: 0 },
];

const avatarColors = ["#4F6EF7","#22c55e","#f97316","#8b5cf6","#06b6d4","#ef4444","#0ea5e9","#a855f7"];
function getAvatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

function AttBadge({ pct }) {
  const color = pct >= 95 ? "#15803d" : pct >= 85 ? "#854d0e" : "#991b1b";
  const bg    = pct >= 95 ? "#dcfce7" : pct >= 85 ? "#fef9c3" : "#fee2e2";
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 12px", borderRadius:20, background:bg, color, fontSize:12, fontWeight:700 }}>
      {pct}%
    </span>
  );
}

const departments = ["All", ...new Set(reportData.map(e => e.department))];

export default function ReportTable() {
  const [deptFilter, setDeptFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = reportData.filter(e => {
    const matchDept = deptFilter === "All" || e.department === deptFilter;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="card report-table-card">
      <div className="report-toolbar">
        <div className="toolbar-left">
          <p className="toolbar-title">Employee Performance Summary</p>
          <p className="toolbar-subtitle">Showing <strong>{filtered.length}</strong> of {reportData.length} employees</p>
        </div>
        <div className="toolbar-right">
          <div className="search-box">
            <span>🔍</span>
            <input
              className="search-input"
              placeholder="Search employee..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="filter-select" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            {departments.map(d => <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>)}
          </select>
          <button className="export-btn">⬇ Export CSV</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              {["Employee", "Department", "Attendance %", "Tasks Completed", "Leaves Taken"].map(h => (
                <th key={h} className="rep-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => (
              <tr key={emp.id} className={`rep-tr ${i % 2 === 1 ? "rep-tr--alt" : ""}`}>
                <td className="rep-td">
                  <div className="emp-cell">
                    <div className="avatar" style={{ width:32, height:32, background:getAvatarColor(emp.name), fontSize:10 }}>
                      {emp.avatar}
                    </div>
                    <span className="emp-name">{emp.name}</span>
                  </div>
                </td>
                <td className="rep-td"><span className="dept-chip">{emp.department}</span></td>
                <td className="rep-td"><AttBadge pct={emp.attendance} /></td>
                <td className="rep-td"><strong className="tasks-num">{emp.tasksCompleted}</strong></td>
                <td className="rep-td"><span className="leaves-num">{emp.leavesTaken} days</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No report data available for selected range.</p>
          </div>
        )}
      </div>

      <div className="report-footer">
        <span className="footer-info">Showing {filtered.length} of {reportData.length} employees</span>
      </div>
    </div>
  );
}