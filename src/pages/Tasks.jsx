import { useState } from "react";
import Header from "../components/Header";
import TaskKPIs from "../components/tasks/TaskKPIs";
import TaskTable from "../components/tasks/TaskTable";
import "../styles/pages/Tasks.css";

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      <Header
        title="Task Management"
        subtitle="Manage and track employee tasks"
        action={
          <button className="create-task-btn">
            ➕  Create Task
          </button>
        }
      />
      <TaskKPIs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <TaskTable activeFilter={activeFilter} />
    </>
  );
}