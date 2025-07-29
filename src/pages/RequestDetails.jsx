import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Modal from "../components/Modal";

// Sample RID Request Details data
const defaultData = [
  {
    requestId: "RID-001",
    projectName: "Resource Management System (RMS)",
    changeDetails:
      "Automate resource allocation and add real-time usage dashboards for managers.",
    requestedBy: "John Doe",
    status: "Pending",
    requestedOn: "2025-07-20",
    priority: "High",
    startDate: "2025-07-21",
    approvalDetails: {
      first: {
        entity: "Team Lead",
        date: "2025-07-21",
        status: "Approved",
      },
      second: {
        entity: "Project Manager",
        date: "",
        status: "Pending",
      },
    },
  },
  {
    requestId: "RID-002",
    projectName: "Rapid Infra Deployment (RID)",
    changeDetails:
      "Enhance EC2 provisioning scripts and integrate auto-tagging for cost tracking.",
    requestedBy: "Jane Smith",
    status: "In Progress",
    requestedOn: "2025-07-01",
    priority: "Medium",
    startDate: "2025-07-02",
    approvalDetails: {
      first: {
        entity: "Team Lead",
        date: "2025-07-01",
        status: "Approved",
      },
      second: {
        entity: "Project Manager",
        date: "2025-07-02",
        status: "Approved",
      },
    },
  },
  {
    requestId: "RID-003",
    projectName: "Security Group Configuration",
    changeDetails:
      "Update security rules to follow CIS benchmarks and enable logging for all traffic.",
    requestedBy: "Ali Khan",
    status: "Completed",
    requestedOn: "2025-10-18",
    priority: "Low",
    startDate: "2025-10-20",
    approvalDetails: {
      first: {
        entity: "Team Lead",
        date: "2025-10-18",
        status: "Approved",
      },
      second: {
        entity: "Project Manager",
        date: "2025-10-19",
        status: "Approved",
      },
    },
  },
  {
    requestId: "RID-004",
    projectName: "Security Group Configuration",
    changeDetails:
      "Update security rules to follow CIS benchmarks and enable logging for all traffic.",
    requestedBy: "Elsa",
    status: "Completed",
    requestedOn: "2025-10-18",
    priority: "Low",
    startDate: "2025-10-20",
    approvalDetails: {
      first: {
        entity: "Team Lead",
        date: "2025-10-18",
        status: "Approved",
      },
      second: {
        entity: "Project Manager",
        date: "2025-10-19",
        status: "Approved",
      },
    },
  },
  // ...continue for others as needed
];

// Helper: Search filter, status, priority
const filterRequests = (data, search, status, priority) => {
  return data.filter((item) => {
    const matchesSearch =
      item.requestId.toLowerCase().includes(search.toLowerCase()) ||
      item.projectName.toLowerCase().includes(search.toLowerCase()) ||
      item.requestedBy.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status ? item.status === status : true;
    const matchesPriority = priority ? item.priority === priority : true;

    return matchesSearch && matchesStatus && matchesPriority;
  });
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

// Column Filter Dropdown Component
const ColumnFilter = ({
  title,
  options,
  value,
  onChange,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="relative">
      <div
        className="flex items-center justify-between cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
        onClick={onToggle}
      >
        <span className="font-semibold">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-full">
          <div className="py-1">
            <button
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                !value ? "bg-blue-50 text-blue-700" : ""
              }`}
              onClick={() => onChange("")}
            >
              All
            </button>
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                  value === option ? "bg-blue-50 text-blue-700" : ""
                }`}
                onClick={() => onChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const RequestDetailsTable = () => {
  const [visibleRows, setVisibleRows] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // Reset visible rows when filters change
  useEffect(() => {
    setVisibleRows(3);
  }, [searchTerm, statusFilter, priorityFilter]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedData = sortRequestsDesc(defaultData);
  const filteredData = filterRequests(
    sortedData,
    searchTerm,
    statusFilter,
    priorityFilter
  );

  const displayedRows = filteredData.slice(0, visibleRows);

  const loadMore = () => {
    setVisibleRows((prev) => prev + 3);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPriorityFilter("");
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Get unique values for filters
  const statusOptions = [...new Set(defaultData.map((item) => item.status))];
  const priorityOptions = [
    ...new Set(defaultData.map((item) => item.priority)),
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4 w-full flex justify-between items-center">
        <h2 className="text-xl font-bold">Request Details</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by ID, Project, or Requested By"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 border rounded bg-white/30 backdrop-blur-sm"
        />
      </div>

      {/* Active Filters Display */}
      {(searchTerm || statusFilter || priorityFilter) && (
        <div className="mb-4 flex gap-2 items-center flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              Search: "{searchTerm}"
            </span>
          )}
          {statusFilter && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              Status: {statusFilter}
            </span>
          )}
          {priorityFilter && (
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
              Priority: {priorityFilter}
            </span>
          )}
          <button
            onClick={clearFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Results Counter */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {Math.min(visibleRows, filteredData.length)} of{" "}
        {filteredData.length} requests
        {filteredData.length !== defaultData.length && (
          <span className="text-blue-600">
            {" "}
            (filtered from {defaultData.length} total)
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">
                <span className="font-semibold">Request ID</span>
              </th>
              <th className="border px-4 py-2 text-left">
                <span className="font-semibold">Project Name</span>
              </th>
              <th className="border px-4 py-2 text-left font-semibold">
                Change Details
              </th>

              <th className="border px-4 py-2 text-left">
                <span className="font-semibold">Requested By</span>
              </th>
              <th className="border px-4 py-2 text-left">
                <ColumnFilter
                  title="Status"
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  isOpen={openDropdown === "status"}
                  onToggle={() => toggleDropdown("status")}
                />
              </th>
              <th className="border px-4 py-2 text-left">
                <span className="font-semibold">Requested On</span>
              </th>
              <th className="border px-4 py-2 text-left">
                <ColumnFilter
                  title="Priority"
                  options={priorityOptions}
                  value={priorityFilter}
                  onChange={setPriorityFilter}
                  isOpen={openDropdown === "priority"}
                  onToggle={() => toggleDropdown("priority")}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.length > 0 ? (
              <>
                {displayedRows.map((row) => (
                  <tr key={row.requestId} className="hover:bg-gray-50">
                    <td
                      className="border px-4 py-2 underline cursor-pointer hover:text-blue-600" //req ids underlined
                      onClick={() => openModal(row)}
                    >
                      <b>{row.requestId}</b>
                    </td>

                    <td className="border px-4 py-2">{row.projectName}</td>
                    <td className="border px-4 py-2">{row.changeDetails}</td>
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
              </>
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-gray-500 border"
                >
                  No requests found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
        >
          {selectedRequest && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                {selectedRequest.projectName}
              </h2>

              <p>
                <b>Start Date:</b>{" "}
                {selectedRequest.startDate
                  ? new Date(selectedRequest.startDate).toLocaleDateString()
                  : "N/A"}
              </p>

              <h3 className="text-lg font-semibold mt-4">Approval Details</h3>
              <div className="mt-2">
                <p>
                  <b>1st Approval:</b>{" "}
                  {selectedRequest.approvalDetails?.first?.entity || "N/A"} -
                  <b> Date:</b>{" "}
                  {selectedRequest.approvalDetails?.first?.date
                    ? new Date(
                        selectedRequest.approvalDetails.first.date
                      ).toLocaleDateString()
                    : "N/A"}{" "}
                  -<b> Status:</b>{" "}
                  {selectedRequest.approvalDetails?.first?.status || "Pending"}
                </p>
                <p>
                  <b>2nd Approval:</b>{" "}
                  {selectedRequest.approvalDetails?.second?.entity || "N/A"} -
                  <b> Date:</b>{" "}
                  {selectedRequest.approvalDetails?.second?.date
                    ? new Date(
                        selectedRequest.approvalDetails.second.date
                      ).toLocaleDateString()
                    : "N/A"}{" "}
                  -<b> Status:</b>{" "}
                  {selectedRequest.approvalDetails?.second?.status || "Pending"}
                </p>
              </div>

              <p>
                <b>Status:</b> {selectedRequest.status}
              </p>
              <p>
                <b>Priority:</b> {selectedRequest.priority}
              </p>
              <p>
                <b>Requested On:</b>{" "}
                {new Date(selectedRequest.requestedOn).toLocaleDateString()}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default RequestDetailsTable;
