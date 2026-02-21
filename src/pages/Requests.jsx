import { useState } from "react";
import Header from "../components/Header";
import RequestKPIs from "../components/requests/RequestKPIs";
import RequestTable from "../components/requests/RequestTable";
import "../styles/pages/Requests.css";

export default function Requests() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      <Header
        title="Request Management"
        subtitle="Manage and review employee requests"
        action={
          <button className="new-request-btn">
            ➕ New Request
          </button>
        }
      />
      <RequestKPIs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <RequestTable activeFilter={activeFilter} />
    </>
  );
}