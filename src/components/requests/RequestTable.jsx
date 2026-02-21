import { useState } from "react";
import "../../styles/components/requests/RequestTable.css";

// Dummy request data
const initialRequests = [
  { id: 1,  employeeName: "Daniel Park",    avatar: "DP", type: "leave",       fromDate: "Mar 10", toDate: "Mar 12", days: 3,  reason: "Family vacation",          status: "pending",  appliedOn: "Mar 08" },
  { id: 2,  employeeName: "Sarah Lin",      avatar: "SL", type: "wfh",         fromDate: "Mar 13", toDate: "Mar 13", days: 1,  reason: "Home maintenance work",     status: "approved", appliedOn: "Mar 11" },
  { id: 3,  employeeName: "James Okafor",   avatar: "JO", type: "overtime",    fromDate: "Mar 09", toDate: "Mar 09", days: 2,  reason: "Project deadline",          status: "approved", appliedOn: "Mar 08" },
  { id: 4,  employeeName: "Priya Nair",     avatar: "PN", type: "leave",       fromDate: "Mar 15", toDate: "Mar 17", days: 3,  reason: "Medical appointment",       status: "rejected", appliedOn: "Mar 10" },
  { id: 5,  employeeName: "Marcus Webb",    avatar: "MW", type: "correction",  fromDate: "Mar 07", toDate: "Mar 07", days: 1,  reason: "Forgot to check in",        status: "pending",  appliedOn: "Mar 08" },
  { id: 6,  employeeName: "Elena Torres",   avatar: "ET", type: "wfh",         fromDate: "Mar 14", toDate: "Mar 15", days: 2,  reason: "Travel restrictions",       status: "pending",  appliedOn: "Mar 12" },
  { id: 7,  employeeName: "Kevin Zhang",    avatar: "KZ", type: "overtime",    fromDate: "Mar 11", toDate: "Mar 11", days: 3,  reason: "Sprint release weekend",    status: "approved", appliedOn: "Mar 09" },
  { id: 8,  employeeName: "Aisha Mensah",   avatar: "AM", type: "leave",       fromDate: "Mar 20", toDate: "Mar 22", days: 3,  reason: "Annual leave",             status: "approved", appliedOn: "Mar 13" },
  { id: 9,  employeeName: "Tom Brady",      avatar: "TB", type: "correction",  fromDate: "Mar 06", toDate: "Mar 06", days: 1,  reason: "System error on login",     status: "rejected", appliedOn: "Mar 07" },
  { id: 10, employeeName: "Lisa Chen",      avatar: "LC", type: "wfh",         fromDate: "Mar 18", toDate: "Mar 19", days: 2,  reason: "Client calls from home",    status: "pending",  appliedOn: "Mar 14" },
  { id: 11, employeeName: "Michael Scott",  avatar: "MS", type: "leave",       fromDate: "Mar 25", toDate: "Mar 28", days: 4,  reason: "Wedding anniversary trip",  status: "pending",  appliedOn: "Mar 15" },
  { id: 12, employeeName: "Angela Martin",  avatar: "AM2",type: "overtime",    fromDate: "Mar 10", toDate: "Mar 10", days: 2,  reason: "Month-end closing",         status: "approved", appliedOn: "Mar 09" },
];

const avatarColors = ["#4F6EF7", "#22c55e", "#f97316", "#8b5cf6", "#06b6d4", "#ef4444", "#0ea5e9", "#a855f7"];

function getAvatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

const statusConfig = {
  pending:  { bg: "#fef9c3", color: "#854d0e", dot: "#ca8a04", label: "Pending"  },
  approved: { bg: "#dcfce7", color: "#15803d", dot: "#16a34a", label: "Approved" },
  rejected: { bg: "#fee2e2", color: "#991b1b", dot: "#dc2626", label: "Rejected" },
};

const typeConfig = {
  leave:      { label: "Leave",       bg: "#eff2ff", color: "#4f6ef7" },
  wfh:        { label: "Work From Home", bg: "#f0fdfa", color: "#0d9488" },
  overtime:   { label: "Overtime",    bg: "#faf5ff", color: "#8b5cf6" },
  correction: { label: "Correction",  bg: "#fff8f0", color: "#f97316" },
};

const TABS = [
  { key: "all",        label: "All"                  },
  { key: "leave",      label: "Leave"                },
  { key: "wfh",        label: "Work From Home"       },
  { key: "correction", label: "Attendance Correction"},
  { key: "overtime",   label: "Overtime"             },
];

const PAGE_SIZE = 8;

export default function RequestTable({ activeFilter }) {
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Apply all filters
  const filtered = requests.filter((r) => {
    const matchKPI =
      activeFilter === "all" || !activeFilter ? true :
      r.status === activeFilter;

    const matchTab = activeTab === "all" || r.type === activeTab;

    const matchSearch = r.employeeName.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "all" || r.status === statusFilter;

    return matchKPI && matchTab && matchSearch && matchStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Action handlers
  const handleApprove = (id) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: "approved" } : r)
    );
  };

  const handleReject = (id) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: "rejected" } : r)
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setActiveTab("all");
    setCurrentPage(1);
  };

  return (
    <div className=" cardrequest-table-card">

      {/* Tabs */}
      <div className="request-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`request-tab ${activeTab === tab.key ? "request-tab--active" : ""}`}
            onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="request-toolbar">
        <span className="showing-count">
          Showing <strong>{filtered.length}</strong> requests
        </span>

        <div className="toolbar-right">
          <div className="search-box">
            <span>🔍</span>
            <input
              className="search-input"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="request-table">
          <thead>
            <tr>
              {["Employee", "Request Type", "Date", "Days / Hours", "Reason", "Status", "Action"].map(h => (
                <th key={h} className="req-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((req, i) => {
              const s = statusConfig[req.status];
              const t = typeConfig[req.type];
              return (
                <tr key={req.id} className={`req-tr ${i % 2 === 1 ? "req-tr--alt" : ""}`}>

                  {/* Employee */}
                  <td className="req-td">
                    <div className="emp-cell">
                      <div className="avatar" style={{ width: 34, height: 34, background: getAvatarColor(req.employeeName), fontSize: 11 }}>
                        {req.avatar}
                      </div>
                      <div>
                        <p className="emp-name">{req.employeeName}</p>
                        <p className="emp-applied">Applied {req.appliedOn}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="req-td">
                    <span className="type-badge" style={{ background: t.bg, color: t.color }}>
                      {t.label}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="req-td">
                    <span className="date-range">{req.fromDate} → {req.toDate}</span>
                  </td>

                  {/* Days */}
                  <td className="req-td">
                    <span className="days-badge">{req.days}d</span>
                  </td>

                  {/* Reason */}
                  <td className="req-td">
                    <span className="reason-text">{req.reason}</span>
                  </td>

                  {/* Status */}
                  <td className="req-td">
                    <span className="status-badge" style={{ background: s.bg, color: s.color }}>
                      <span className="status-dot" style={{ background: s.dot }} />
                      {s.label}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="req-td">
                    {req.status === "pending" ? (
                      <div className="action-group">
                        <button className="btn-approve" onClick={() => handleApprove(req.id)}>✓ Approve</button>
                        <button className="btn-reject" onClick={() => handleReject(req.id)}>✕ Reject</button>
                      </div>
                    ) : (
                      <button className="btn-view">View</button>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="empty-state">
            <p>🔍 No requests found</p>
            <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="req-pagination">
        <span className="pagin-info">
          Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} requests
        </span>
        <div className="pagin-btns">
          <button
            className="pagin-btn"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ‹ Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`pagin-btn ${currentPage === page ? "pagin-btn--active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagin-btn"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}