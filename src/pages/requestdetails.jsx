import React, { useState } from "react";

// Sample RID Request Details data
const defaultData = [
  {
    requestId: "RID-001",
    projectName: "VPC Setup Automation",
    requestedBy: "John Doe",
    status: "Pending",
    requestedOn: "2025-07-20",
    priority: "High",
  },
  {
    requestId: "RID-002",
    projectName: "EC2 Provisioning",
    requestedBy: "Jane Smith",
    status: "In Progress",
    requestedOn: "2025-07-21",
    priority: "Medium",
  },
  {
    requestId: "RID-003",
    projectName: "Security Group Config",
    requestedBy: "Ali Khan",
    status: "Completed",
    requestedOn: "2025-07-18",
    priority: "Low",
  },
  {
    requestId: "RID-004",
    projectName: "Load Balancer Setup",
    requestedBy: "Sarah Wilson",
    status: "Pending",
    requestedOn: "2025-07-22",
    priority: "High",
  },
  {
    requestId: "RID-005",
    projectName: "Database Migration",
    requestedBy: "Mike Johnson",
    status: "In Progress",
    requestedOn: "2025-07-19",
    priority: "Medium",
  },
  {
    requestId: "RID-006",
    projectName: "Backup Configuration",
    requestedBy: "Lisa Chen",
    status: "Completed",
    requestedOn: "2025-07-17",
    priority: "Low",
  },
];

// Helper: Search filter
const filterRequests = (data, search) => {
  if (!search) return data;
  return data.filter(
    (item) =>
      item.requestId.toLowerCase().includes(search.toLowerCase()) ||
      item.projectName.toLowerCase().includes(search.toLowerCase()) ||
      item.requestedBy.toLowerCase().includes(search.toLowerCase())
  );
};

// Helper: Sort by Request ID descending
const sortRequestsDesc = (data) => {
  return [...data].sort(
    (a, b) =>
      parseInt(b.requestId.split("-")[1]) - parseInt(a.requestId.split("-")[1])
  );
};

// Status Cell
const StatusCell = ({ status }) => {
  const color =
    status === "Completed"
      ? "text-green-600"
      : status === "In Progress"
      ? "text-yellow-600"
      : "text-red-600";
  return <span className={color}>{status}</span>;
};

// Priority Badge
const PriorityBadge = ({ priority }) => {
  const badgeColor =
    priority === "High"
      ? "bg-red-200 text-red-800"
      : priority === "Medium"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-green-200 text-green-800";
  return (
    <span className={`px-2 py-1 rounded text-sm ${badgeColor}`}>
      {priority}
    </span>
  );
};

// Date formatter
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const RequestDetailsTable = () => {
  const [visibleRows, setVisibleRows] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedData = sortRequestsDesc(defaultData);
  const filteredData = filterRequests(sortedData, searchTerm);
  const displayedRows = filteredData.slice(0, visibleRows);

  const loadMore = () => {
    setVisibleRows((prev) => prev + 3);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Request Details</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by ID, Project, or Requested By"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-1/3 p-2 border rounded bg-white/30 backdrop-blur-sm"
      />

      <div className="mb-4 text-sm text-gray-600">
        Showing {Math.min(visibleRows, filteredData.length)} of{" "}
        {filteredData.length} requests
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left font-semibold">
                Request ID
              </th>
              <th className="border px-4 py-2 text-left font-semibold">
                Project Name
              </th>
              <th className="border px-4 py-2 text-left font-semibold">
                Requested By
              </th>
              <th className="border px-4 py-2 text-left font-semibold">
                Status
              </th>
              <th className="border px-4 py-2 text-left font-semibold">
                Requested On
              </th>
              <th className="border px-4 py-2 text-left font-semibold">
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row) => (
              <tr key={row.requestId} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <b>{row.requestId}</b>
                </td>
                <td className="border px-4 py-2">{row.projectName}</td>
                <td className="border px-4 py-2">{row.requestedBy}</td>
                <td className="border px-4 py-2">
                  <StatusCell status={row.status} />
                </td>
                <td className="border px-4 py-2">
                  {formatDate(row.requestedOn)}
                </td>
                <td className="border px-4 py-2">
                  <PriorityBadge priority={row.priority} />
                </td>
              </tr>
            ))}
            {visibleRows < filteredData.length && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center hover:bg-gray-50 cursor-pointer py-2 hover:underline border"
                  onClick={loadMore}
                >
                  Load More...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestDetailsTable;
