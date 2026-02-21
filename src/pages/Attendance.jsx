import { useState } from "react";
import Header from "../components/Header";
import AttendanceKPIs from "../components/attendance/AttendanceKPIs";
import AttendanceTable from "../components/attendance/AttendanceTable";


export default function Attendance() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      <Header
        title="Attendance"
        subtitle="Track daily employee attendance"
      />
      
      <AttendanceKPIs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <AttendanceTable activeFilter={activeFilter} />
    </>
  );
}