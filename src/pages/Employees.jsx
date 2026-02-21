import { useState } from "react";
import Header from "../components/Header";
import EmployeeKPICards from "../components/employees/EmployeeKPICards";
import DepartmentChart from "../components/employees/DepartmentChart";
import EmployeeTable from "../components/employees/EmployeeTable";
import "../styles/pages/Employees.css";

export default function Employees() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      <Header
        title="Employees"
        subtitle="Manage and monitor your workforce"
        action={
          <button className="add-employee-btn">
            ➕ Add Employee
          </button>
        }
      />

      {/* KPI Cards - 4 in a row, compact */}
      <EmployeeKPICards
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Department Chart - full width below KPIs */}
      <DepartmentChart />

      {/* Employee Table - main content focus */}
      <EmployeeTable activeFilter={activeFilter} />
    </>
  );
}