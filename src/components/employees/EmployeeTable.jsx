import { useState } from "react";
import "../../styles/components/employees/EmployeeTable.css";

const employees = [
  { id: 1,  name: "Daniel Park",    avatar: "DP", role: "UI Engineer",        status: "active",   type: "Full Time", workMode: "Onsite", leaveBalance: 10 },
  { id: 2,  name: "Sarah Lin",      avatar: "SL", role: "Frontend Developer", status: "active",   type: "Full Time", workMode: "Remote", leaveBalance: 8  },
  { id: 3,  name: "James Okafor",   avatar: "JO", role: "Backend Engineer",   status: "on leave", type: "Full Time", workMode: "Hybrid", leaveBalance: 5  },
  { id: 4,  name: "Priya Nair",     avatar: "PN", role: "Product Designer",   status: "active",   type: "Part Time", workMode: "Remote", leaveBalance: 12 },
  { id: 5,  name: "Marcus Webb",    avatar: "MW", role: "Marketing Lead",     status: "active",   type: "Full Time", workMode: "Onsite", leaveBalance: 7  },
  { id: 6,  name: "Elena Torres",   avatar: "ET", role: "Data Analyst",       status: "inactive", type: "Contract",  workMode: "Remote", leaveBalance: 3  },
  { id: 7,  name: "Kevin Zhang",    avatar: "KZ", role: "DevOps Engineer",    status: "active",   type: "Full Time", workMode: "Hybrid", leaveBalance: 9  },
  { id: 8,  name: "Aisha Mensah",   avatar: "AM", role: "HR Specialist",      status: "on leave", type: "Full Time", workMode: "Onsite", leaveBalance: 2  },
  { id: 9,  name: "Tom Brady",      avatar: "TB", role: "Sales Manager",      status: "active",   type: "Full Time", workMode: "Onsite", leaveBalance: 15 },
  { id: 10, name: "Lisa Chen",      avatar: "LC", role: "UX Designer",        status: "active",   type: "Contract",  workMode: "Remote", leaveBalance: 6  },
  { id: 11, name: "Michael Scott",  avatar: "MS", role: "Project Manager",    status: "active",   type: "Full Time", workMode: "Hybrid", leaveBalance: 11 },
  { id: 12, name: "Angela Martin",  avatar: "AM2",role: "Accountant",         status: "active",   type: "Part Time", workMode: "Onsite", leaveBalance: 4  },
];

const avatarColors = ["#4F6EF7","#22c55e","#f97316","#8b5cf6","#06b6d4","#ef4444","#0ea5e9","#a855f7"];
function getAvatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

const statusConfig = {
  "active":   { bg: "#dcfce7", color: "#15803d", dot: "#16a34a", label: "Active"   },
  "on leave": { bg: "#fef9c3", color: "#854d0e", dot: "#ca8a04", label: "On Leave" },
  "inactive": { bg: "#fee2e2", color: "#991b1b", dot: "#dc2626", label: "Inactive" },
};

const filterLabels = {
  all:      "All Employees",
  fulltime: "Full-Time Employees",
  contract: "Contract Employees",
  remote:   "Remote Workers",
};

export default function EmployeeTable({ activeFilter }) {
  const [search, setSearch]           = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [roleFilter, setRoleFilter]   = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter]   = useState("All");
  const [workModeFilter, setWorkModeFilter] = useState("All");

  const roles     = ["All", ...new Set(employees.map(e => e.role))];
  const statuses  = ["All", "active", "on leave", "inactive"];
  const types     = ["All", ...new Set(employees.map(e => e.type))];
  const workModes = ["All", ...new Set(employees.map(e => e.workMode))];

  const filtered = employees.filter((e) => {
    const matchKPI =
      !activeFilter || activeFilter === "all" ? true :
      activeFilter === "fulltime" ? e.type === "Full Time" :
      activeFilter === "contract" ? e.type === "Contract"  :
      activeFilter === "remote"   ? e.workMode === "Remote" : true;

    const matchSearch     = e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    const matchRole       = roleFilter === "All"     || e.role === roleFilter;
    const matchStatus     = statusFilter === "All"   || e.status === statusFilter;
    const matchType       = typeFilter === "All"     || e.type === typeFilter;
    const matchWorkMode   = workModeFilter === "All" || e.workMode === workModeFilter;

    return matchKPI && matchSearch && matchRole && matchStatus && matchType && matchWorkMode;
  });

  const clearFilters = () => {
    setRoleFilter("All"); setStatusFilter("All");
    setTypeFilter("All"); setWorkModeFilter("All");
  };

  const activeFiltersCount = [roleFilter, statusFilter, typeFilter, workModeFilter].filter(f => f !== "All").length;

  return (
    <div className=" card emp-table-card">

      {/* Toolbar */}
      <div className="emp-table-toolbar">
        {/* LEFT - Always shows something */}
        <div className="toolbar-left">
          <div>
            <p className="toolbar-title">
              {filterLabels[activeFilter] || "All Employees"}
            </p>
            <p className="toolbar-subtitle">
              Showing {filtered.length} of {employees.length} employees
              {activeFilter && activeFilter !== "all" && (
                <span className="filter-chip">
                  Filtered by: {filterLabels[activeFilter]}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="toolbar-right">
          <div className="emp-search">
            <span>🔍</span>
            <input
              className="emp-search-input"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch("")}>✕</button>
            )}
          </div>
          <button
            className={`emp-filter-btn ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            ▼ Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-panel-header">
            <span>Filter Employees</span>
            {activeFiltersCount > 0 && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All ({activeFiltersCount})
              </button>
            )}
          </div>
          <div className="filter-grid">
            {[
              { label: "Role",      value: roleFilter,     setter: setRoleFilter,     options: roles },
              { label: "Status",    value: statusFilter,   setter: setStatusFilter,   options: statuses },
              { label: "Type",      value: typeFilter,     setter: setTypeFilter,     options: types },
              { label: "Work Mode", value: workModeFilter, setter: setWorkModeFilter, options: workModes },
            ].map(f => (
              <div key={f.label} className="filter-group">
                <label>{f.label}</label>
                <select value={f.value} onChange={e => f.setter(e.target.value)}>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="emp-table">
          <thead>
            <tr>
              {["Employee", "Role", "Status", "Type", "Work Mode", "Leave Balance", "Action"].map(h => (
                <th key={h} className="emp-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => {
              const s = statusConfig[emp.status];
              return (
                <tr key={emp.id} className={`emp-tr ${i % 2 === 1 ? "emp-tr--alt" : ""}`}>
                  <td className="emp-td">
                    <div className="emp-cell">
                      <div className="avatar" style={{ width:32, height:32, background:getAvatarColor(emp.name), fontSize:10 }}>
                        {emp.avatar}
                      </div>
                      <span className="emp-name">{emp.name}</span>
                    </div>
                  </td>
                  <td className="emp-td emp-role">{emp.role}</td>
                  <td className="emp-td">
                    <span className="emp-status-badge" style={{ background:s.bg, color:s.color }}>
                      <span className="emp-status-dot" style={{ background:s.dot }} />
                      {s.label}
                    </span>
                  </td>
                  <td className="emp-td"><span className="emp-type-chip">{emp.type}</span></td>
                  <td className="emp-td emp-workmode">{emp.workMode}</td>
                  <td className="emp-td emp-leave">{emp.leaveBalance} days</td>
                  <td className="emp-td"><button className="action-btn">···</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="emp-empty">
            <p>No employees found.</p>
            <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="emp-pagination">
        <span className="emp-pagin-info">
          {filtered.length} of {employees.length} employees
        </span>
        <div className="emp-pagin-btns">
          <button className="emp-pagin-btn">‹ Prev</button>
          {[1, 2, 3].map(n => (
            <button key={n} className={`emp-pagin-btn ${n === 1 ? "emp-pagin-btn--active" : ""}`}>{n}</button>
          ))}
          <button className="emp-pagin-btn">Next ›</button>
        </div>
      </div>
    </div>
  );
}