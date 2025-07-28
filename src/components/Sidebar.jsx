import { Link } from "react-router-dom";
import { useState } from "react";
import CreateRequest from "../pages/CreateRequest";
import Budget from "../pages/Budget";

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    requestDetails: false,
    userManual: false,
  });

  // Custom Triangle Icons
  const TriangleRight = () => (
    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
      <path d="M4 2 L10 6 L4 10 Z" />
    </svg>
  );

  const TriangleDown = () => (
    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
      <path d="M2 4 L6 10 L10 4 Z" />
    </svg>
  );

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    if (!isSidebarCollapsed) {
      setOpenMenus({
        requestDetails: false,
        userManual: false,
      });
    }
  };

  return (
    <div
      className={`${
        isSidebarCollapsed ? "w-16" : "w-64"
      } h-screen bg-[#181ed4] text-white flex flex-col transition-all duration-300`}
    >
      {/* Collapse/Expand Button */}
      <div className="p-4 border-b border-blue-600">
        <button
          onClick={toggleSidebar}
          className="flex justify-start hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {!isSidebarCollapsed && (
          <nav className="flex flex-col gap-4">
            {/* Request Details */}
            <div className="space-y-2">
              <button
                onClick={() => toggleMenu("requestDetails")}
                className="flex items-center w-full text-left hover:text-blue-300 transition-colors py-1"
              >
                <div className="flex items-center justify-center w-4 h-4 mr-3">
                  {openMenus.requestDetails ? (
                    <TriangleDown />
                  ) : (
                    <TriangleRight />
                  )}
                </div>
                <span>Request Details</span>
              </button>
              {openMenus.requestDetails && (
                <div className="ml-7 space-y-1">
                  <Link
                    to="/dashboard/request-details"
                    className="block text-sm text-blue-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              )}
            </div>

            {/* Change Requests (separated component) */}
            <CreateRequest
              TriangleRight={TriangleRight}
              TriangleDown={TriangleDown}
            />

            {/* Budget (separated component) */}
            <Budget TriangleRight={TriangleRight} TriangleDown={TriangleDown} />

            {/* User Manual */}
            <div className="space-y-2">
              <button
                onClick={() => toggleMenu("userManual")}
                className="flex items-center w-full text-left hover:text-blue-300 transition-colors py-1"
              >
                <div className="flex items-center justify-center w-4 h-4 mr-3">
                  {openMenus.userManual ? <TriangleDown /> : <TriangleRight />}
                </div>
                <span>RID User Manual</span>
              </button>
              {openMenus.userManual && (
                <div className="ml-7 space-y-1">
                  <Link
                    to="/dashboard/usermanual"
                    className="block text-sm text-blue-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                  >
                    View Manual
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
