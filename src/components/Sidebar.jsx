import { Link } from "react-router-dom";
import { useState } from "react";
import { Server, HardDrive, Network, Shield } from "lucide-react";

const Sidebar = () => {
  const [isChangeRequestsOpen, setIsChangeRequestsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    requestDetails: false,
    createRequest: false,
    changeRequests: false,
    budget: false,
    userManual: false,
  });
  const [openCategories, setOpenCategories] = useState({
    ec2: false,
    disk: false,
    network: false,
    security: false,
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

  const changeRequestCategories = {
    ec2: {
      icon: <Server className="w-4 h-4" />,
      label: "EC2",
      items: [
        "Launch instances",
        "Terminate instances",
        "Instance type change",
        "Auto Scaling configuration",
        "Elastic IP assignment",
        "Key pair management",
      ],
    },
    disk: {
      icon: <HardDrive className="w-4 h-4" />,
      label: "Disk",
      items: [
        "Volume size increase",
        "Volume type change",
        "Snapshot creation",
        "Volume attachment/detachment",
        "IOPS modification",
        "Encryption enable/disable",
      ],
    },
    network: {
      icon: <Network className="w-4 h-4" />,
      label: "Network",
      items: [
        "VPC configuration",
        "Subnet creation/modification",
        "Security group rules",
        "Route table updates",
        "NAT gateway setup",
        "VPN connection setup",
      ],
    },
    security: {
      icon: <Shield className="w-4 h-4" />,
      label: "Security",
      items: [
        "IAM role assignment",
        "Access key rotation",
        "Certificate management",
        "MFA configuration",
        "Compliance audit",
        "Vulnerability assessment",
      ],
    },
  };

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
    // For change requests, also update the old state
    if (menu === "changeRequests") {
      setIsChangeRequestsOpen(!openMenus.changeRequests);
    }
  };

  const toggleChangeRequests = () => {
    const newState = !isChangeRequestsOpen;
    setIsChangeRequestsOpen(newState);
    setOpenMenus((prev) => ({
      ...prev,
      changeRequests: newState,
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    // Close all dropdowns when collapsing
    if (!isSidebarCollapsed) {
      setIsChangeRequestsOpen(false);
      setOpenMenus({
        requestDetails: false,
        createRequest: false,
        changeRequests: false,
        budget: false,
        userManual: false,
      });
      setOpenCategories({
        ec2: false,
        disk: false,
        network: false,
        security: false,
      });
    }
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleChangeRequestClick = (category, item) => {
    console.log(`Selected: ${category} - ${item}`);
    // You can add navigation or other logic here
    // For example: navigate to a specific change request page
  };

  return (
    <div
      className={`${
        isSidebarCollapsed ? "w-16" : "w-64"
      } h-screen bg-[#181ed4] text-white flex flex-col transition-all duration-300`}
    >
      {/* Collapse/Expand Button - Left Aligned */}
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
                    to="/request-details"
                    className="block text-sm text-blue-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              )}
            </div>

            {/* Create Request */}
            {/* <div className="space-y-2">
              <button
                onClick={() => toggleMenu("createRequest")}
                className="flex items-center w-full text-left hover:text-blue-300 transition-colors py-1"
              >
                <div className="flex items-center justify-center w-4 h-4 mr-3">
                  {openMenus.createRequest ? (
                    <TriangleDown />
                  ) : (
                    <TriangleRight />
                  )}
                </div>
                <span>Create Request</span>
              </button>
              {openMenus.createRequest && (
                <div className="ml-7 space-y-1">
                  <Link
                    to="/create-request"
                    className="block text-sm text-blue-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                  >
                    New Request
                  </Link>
                </div>
              )}
            </div> */}

            {/* Change Requests Dropdown */}
            <div className="space-y-2">
              <button
                onClick={() => toggleMenu("changeRequests")}
                className="flex items-center w-full text-left hover:text-blue-300 transition-colors py-1"
              >
                <div className="flex items-center justify-center w-4 h-4 mr-3">
                  {openMenus.changeRequests ? (
                    <TriangleDown />
                  ) : (
                    <TriangleRight />
                  )}
                </div>
                <span>Change Requests</span>
              </button>

              {/* Main Categories */}
              {openMenus.changeRequests && (
                <div className="ml-7 space-y-2">
                  {Object.entries(changeRequestCategories).map(
                    ([key, category]) => (
                      <div key={key} className="space-y-1">
                        {/* Category Header - No chevron */}
                        <button
                          onClick={() => toggleCategory(key)}
                          className="flex items-center w-full text-left text-sm hover:text-blue-300 transition-colors py-1"
                        >
                          <div className="flex items-center space-x-2">
                            {category.icon}
                            <span>{category.label}</span>
                          </div>
                        </button>

                        {/* Sub-items */}
                        {openCategories[key] && (
                          <div className="ml-6 space-y-1">
                            {category.items.map((item, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  handleChangeRequestClick(category.label, item)
                                }
                                className="block w-full text-left text-xs text-blue-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <button
                onClick={() => toggleMenu("budget")}
                className="flex items-center w-full text-left hover:text-blue-300 transition-colors py-1"
              >
                <div className="flex items-center justify-center w-4 h-4 mr-3">
                  {openMenus.budget ? <TriangleDown /> : <TriangleRight />}
                </div>
                <span>Budget</span>
              </button>
              {openMenus.budget && (
                <div className="ml-7 space-y-1">
                  <Link
                    to="/budget"
                    className="block text-sm text-blue-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                  >
                    View Budget
                  </Link>
                </div>
              )}
            </div>

            {/* RID User Manual */}
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
                    to="/usermanual"
                    className="block text-sm text-blue-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                  >
                    View Manual
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Collapsed state - show only icons */}
        {isSidebarCollapsed && (
          <div className="flex flex-col gap-4 items-center">
            <div
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
              title="Request Details"
            >
              <span className="text-xs">RD</span>
            </div>
            <div
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
              title="Create Request"
            >
              <span className="text-xs">CR</span>
            </div>
            <div
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
              title="Change Requests"
            >
              <span className="text-xs">CH</span>
            </div>
            <div
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
              title="Budget"
            >
              <span className="text-xs">B</span>
            </div>
            <div
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
              title="RID User Manual"
            >
              <span className="text-xs">UM</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
