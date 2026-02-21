import { useState } from "react";
import "../../styles/components/tasks/TaskTable.css";

const initialTasks = [
  { id: 1,  title: "Redesign onboarding flow",       desc: "Update UI for new hire onboarding",      assignee: "Daniel Park",   avatar: "DP", priority: "high",   dueDate: "Mar 10", status: "completed",   progress: 100 },
  { id: 2,  title: "Q1 payroll audit",               desc: "Review and verify payroll records",      assignee: "Angela Martin", avatar: "AM", priority: "high",   dueDate: "Mar 05", status: "overdue",     progress: 40  },
  { id: 3,  title: "Update employee handbook",       desc: "Revise company policies section",        assignee: "Aisha Mensah",  avatar: "AM2",priority: "medium", dueDate: "Mar 20", status: "in-progress", progress: 65  },
  { id: 4,  title: "HR system integration",          desc: "Connect attendance with payroll",        assignee: "Kevin Zhang",   avatar: "KZ", priority: "high",   dueDate: "Mar 25", status: "in-progress", progress: 30  },
  { id: 5,  title: "Schedule performance reviews",   desc: "Set up Q1 review calendar",              assignee: "Sarah Lin",     avatar: "SL", priority: "medium", dueDate: "Mar 15", status: "to-do",       progress: 0   },
  { id: 6,  title: "Recruit 5 backend engineers",    desc: "Post JDs and shortlist candidates",      assignee: "Priya Nair",    avatar: "PN", priority: "high",   dueDate: "Apr 01", status: "in-progress", progress: 50  },
  { id: 7,  title: "Office renovation planning",     desc: "Coordinate with facilities team",        assignee: "Marcus Webb",   avatar: "MW", priority: "low",    dueDate: "Apr 10", status: "to-do",       progress: 0   },
  { id: 8,  title: "Benefits enrollment update",     desc: "Send out new benefits documentation",    assignee: "Elena Torres",  avatar: "ET", priority: "medium", dueDate: "Mar 12", status: "overdue",     progress: 20  },
  { id: 9,  title: "Diversity report submission",    desc: "Compile and submit DEI metrics",         assignee: "Lisa Chen",     avatar: "LC", priority: "medium", dueDate: "Mar 30", status: "to-do",       progress: 0   },
  { id: 10, title: "Employee satisfaction survey",   desc: "Design and launch Q1 pulse survey",      assignee: "Tom Brady",     avatar: "TB", priority: "low",    dueDate: "Mar 22", status: "completed",   progress: 100 },
  { id: 11, title: "Training budget allocation",     desc: "Finalize L&D budget for Q2",             assignee: "Michael Scott", avatar: "MS", priority: "high",   dueDate: "Mar 08", status: "overdue",     progress: 55  },
  { id: 12, title: "Exit interview analysis",        desc: "Summarize last quarter exit interviews", assignee: "James Okafor",  avatar: "JO", priority: "low",    dueDate: "Mar 28", status: "in-progress", progress: 75  },
];

const avatarColors = ["#4F6EF7","#22c55e","#f97316","#8b5cf6","#06b6d4","#ef4444","#0ea5e9","#a855f7"];
function getAvatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

const statusConfig = {
  "to-do":       { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8", label: "To Do"       },
  "in-progress": { bg: "#fef9c3", color: "#854d0e", dot: "#f59e0b", label: "In Progress" },
  "completed":   { bg: "#dcfce7", color: "#15803d", dot: "#22c55e", label: "Completed"   },
  "overdue":     { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444", label: "Overdue"     },
};

const priorityConfig = {
  high:   { bg: "#fee2e2", color: "#dc2626", label: "High"   },
  medium: { bg: "#fff8f0", color: "#f97316", label: "Medium" },
  low:    { bg: "#f0faf4", color: "#16a34a", label: "Low"    },
};

const filterLabels = {
  all:         "All Tasks",
  "in-progress": "In Progress",
  completed:   "Completed Tasks",
  overdue:     "Overdue Tasks",
};

const TABS = [
  { key: "all",   label: "All"        },
  { key: "team",  label: "Team Tasks" },
  { key: "my",    label: "My Tasks"   },
];

const PAGE_SIZE = 8;

export default function TaskTable({ activeFilter }) {
  const [tasks, setTasks]           = useState(initialTasks);
  const [activeTab, setActiveTab]   = useState("all");
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter]   = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage]     = useState(1);

  // Completion % for progress bar at top
  const completedCount = tasks.filter(t => t.status === "completed").length;
  const completionPct  = Math.round((completedCount / tasks.length) * 100);

  // Filter logic
  const filtered = tasks.filter((t) => {
    const matchKPI =
      activeFilter === "all" || !activeFilter ? true : t.status === activeFilter;
    const matchTab =
      activeTab === "all" ? true :
      activeTab === "team" ? ["Daniel Park","Sarah Lin","Kevin Zhang","Priya Nair"].includes(t.assignee) :
      activeTab === "my"   ? ["Aisha Mensah","Marcus Webb"].includes(t.assignee) : true;
    const matchSearch    = t.title.toLowerCase().includes(search.toLowerCase()) || t.assignee.toLowerCase().includes(search.toLowerCase());
    const matchStatus    = statusFilter === "all"   || t.status === statusFilter;
    const matchPriority  = priorityFilter === "all" || t.priority === priorityFilter;

    return matchKPI && matchTab && matchSearch && matchStatus && matchPriority;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Actions
  const handleDelete = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const handleStatusChange = (id, newStatus) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus, progress: newStatus === "completed" ? 100 : t.progress } : t));

  const clearFilters = () => {
    setSearch(""); setStatusFilter("all"); setPriorityFilter("all"); setCurrentPage(1);
  };

  return (
    <div className="card task-table-card">

      {/* Progress Summary Bar */}
      <div className="progress-summary">
        <div className="progress-summary-left">
          <span className="progress-title">Monthly Task Completion</span>
          <span className="progress-pct">{completionPct}% tasks completed this month</span>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${completionPct}%` }} />
          </div>
          <span className="progress-fraction">{completedCount}/{tasks.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="task-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`task-tab ${activeTab === tab.key ? "task-tab--active" : ""}`}
            onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="task-toolbar">
        <div className="toolbar-left">
          <p className="toolbar-title">{filterLabels[activeFilter] || "All Tasks"}</p>
          <p className="toolbar-subtitle">
            Showing <strong>{filtered.length}</strong> of {tasks.length} tasks
            {activeFilter && activeFilter !== "all" && (
              <span className="filter-chip">Filtered: {filterLabels[activeFilter]}</span>
            )}
          </p>
        </div>

        <div className="toolbar-right">
          <div className="search-box">
            <span>🔍</span>
            <input
              className="search-input"
              placeholder="Search tasks..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            />
            {search && <button className="clear-search" onClick={() => setSearch("")}>✕</button>}
          </div>

          <select className="filter-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
            <option value="all">All Status</option>
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>

          <select className="filter-select" value={priorityFilter} onChange={e => { setPriorityFilter(e.target.value); setCurrentPage(1); }}>
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              {["Task Name", "Assigned To", "Priority", "Due Date", "Status", "Progress", "Action"].map(h => (
                <th key={h} className="task-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((task, i) => {
              const s = statusConfig[task.status];
              const p = priorityConfig[task.priority];
              const isOverdue = task.status === "overdue";
              return (
                <tr key={task.id} className={`task-tr ${i % 2 === 1 ? "task-tr--alt" : ""}`}>

                  {/* Task Name */}
                  <td className="task-td">
                    <p className="task-title">{task.title}</p>
                    <p className="task-desc">{task.desc}</p>
                  </td>

                  {/* Assigned To */}
                  <td className="task-td">
                    <div className="emp-cell">
                      <div className="avatar" style={{ width:30, height:30, background:getAvatarColor(task.assignee), fontSize:10 }}>
                        {task.avatar}
                      </div>
                      <span className="assignee-name">{task.assignee}</span>
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="task-td">
                    <span className="priority-badge" style={{ background: p.bg, color: p.color }}>
                      {p.label}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="task-td">
                    <span className={`due-date ${isOverdue ? "due-date--overdue" : ""}`}>
                      {isOverdue && "⚠️ "}{task.dueDate}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="task-td">
                    <span className="status-badge" style={{ background: s.bg, color: s.color }}>
                      <span className="status-dot" style={{ background: s.dot }} />
                      {s.label}
                    </span>
                  </td>

                  {/* Progress */}
                  <td className="task-td">
                    <div className="progress-cell">
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{
                            width: `${task.progress}%`,
                            background: task.progress === 100 ? "#22c55e" : task.status === "overdue" ? "#ef4444" : "#4f6ef7"
                          }}
                        />
                      </div>
                      <span className="progress-label">{task.progress}%</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="task-td">
                    <div className="action-group">
                      {task.status !== "completed" && (
                        <button className="btn-complete" onClick={() => handleStatusChange(task.id, "completed")} title="Mark Complete">✓</button>
                      )}
                      <button className="btn-edit" title="Edit">✎</button>
                      <button className="btn-delete" onClick={() => handleDelete(task.id)} title="Delete">🗑</button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="empty-state">
            <p>📋 No tasks found</p>
            <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="task-pagination">
        <span className="pagin-info">
          Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} tasks
        </span>
        <div className="pagin-btns">
          <button className="pagin-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹ Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
            <button key={pg} className={`pagin-btn ${currentPage === pg ? "pagin-btn--active" : ""}`} onClick={() => setCurrentPage(pg)}>{pg}</button>
          ))}
          <button className="pagin-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next ›</button>
        </div>
      </div>
    </div>
  );
}