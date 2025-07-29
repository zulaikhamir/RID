import { Link } from "react-router-dom";
import { useState } from "react";
import CreateRequest from "../pages/CreateRequest";
import Budget from "../pages/Budget";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
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

  // Menu Icons - More specific and meaningful icons
  const RequestDetailsIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 2a1 1 0 000 2h6a1 1 0 100-2H9z" />
      <path
        fillRule="evenodd"
        d="M4 5a2 2 0 012-2 1 1 0 000 2H6v6.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V5zm16 0a2 2 0 00-2-2 1 1 0 000 2h2v6.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V5z"
      />
      <path d="M7 8a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z" />
    </svg>
  );

  const CreateRequestIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </svg>
  );

  const BudgetIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
    </svg>
  );

  const UserManualIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V5h12v14zM7 19h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V9H7v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V9h-2v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V9h-2v2z" />
      <path d="M9 7h6v1H9V7z" />
    </svg>
  );

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setOpenMenus({
        requestDetails: false,
        userManual: false,
      });
    }
  };

  // Handle icon clicks when sidebar is collapsed
  const handleCollapsedIconClick = (menu) => {
    if (isCollapsed) {
      // Expand sidebar and open the menu
      setIsCollapsed(false);
      setOpenMenus((prev) => ({
        ...prev,
        [menu]: true,
      }));
    } else {
      toggleMenu(menu);
    }
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
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
        {isCollapsed ? (
          // Collapsed View - Show Icons Only
          <nav className="flex flex-col gap-6 items-center">
            {/* Request Details Icon */}
            <button
              onClick={() => handleCollapsedIconClick("requestDetails")}
              className="flex items-center justify-center w-8 h-8 hover:text-blue-300 hover:bg-blue-600 hover:bg-opacity-30 rounded transition-colors"
              title="Request Details"
            >
              <RequestDetailsIcon />
            </button>

            {/* Create Request Icon */}
            <button
              onClick={() => handleCollapsedIconClick("createRequest")}
              className="flex items-center justify-center w-8 h-8 hover:text-blue-300 hover:bg-blue-600 hover:bg-opacity-30 rounded transition-colors"
              title="Create Request"
            >
              <CreateRequestIcon />
            </button>

            {/* Budget Icon */}
            <button
              onClick={() => handleCollapsedIconClick("budget")}
              className="flex items-center justify-center w-8 h-8 hover:text-blue-300 hover:bg-blue-600 hover:bg-opacity-30 rounded transition-colors"
              title="Budget"
            >
              <BudgetIcon />
            </button>

            {/* User Manual Icon */}
            <button
              onClick={() => handleCollapsedIconClick("userManual")}
              className="flex items-center justify-center w-8 h-8 hover:text-blue-300 hover:bg-blue-600 hover:bg-opacity-30 rounded transition-colors"
              title="RID User Manual"
            >
              <UserManualIcon />
            </button>
          </nav>
        ) : (
          // Expanded View - Show Full Menu
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
              isCollapsed={false}
            />

            {/* Budget (separated component) */}
            <Budget
              TriangleRight={TriangleRight}
              TriangleDown={TriangleDown}
              isCollapsed={false}
            />

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
