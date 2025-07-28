// ChangeRequestsMenu.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Server,
  HardDrive,
  Wifi,
  Shield,
  LayoutDashboard,
  ClipboardCheck,
} from "lucide-react";

const CreateRequest = ({ TriangleRight, TriangleDown }) => {
  const [openCategories, setOpenCategories] = useState({
    ec2: false,
    vpc: false,
    network: false,
    storage: false,
    dashboard: false,
    approval: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate(); // ✅ FIX: Now inside the component

  const changeRequestCategories = {
    ec2: {
      icon: <Server className="w-4 h-4" />,
      label: "EC2 Manager",
      items: [
        "Launch EC2 instance",
        "Stop/Start/Reboot/Terminate EC2",
        "View instance details",
        "View cost estimation",
        "Modify tags",
        "Attach/detach volumes",
      ],
    },
    vpc: {
      icon: <Wifi className="w-4 h-4" />,
      label: "VPC Builder",
      items: [
        "Create VPC",
        "Create Subnets (public/private)",
        "Attach Internet Gateway",
        "Attach NAT Gateway",
        "CIDR block selection",
      ],
    },
    network: {
      icon: <Shield className="w-4 h-4" />,
      label: "Network & Security",
      items: [
        "Create/Update Security Groups",
        "Manage Inbound/Outbound rules",
        "Create NACLs",
        "Create Route Tables",
        "Associate Subnets to Route Tables",
      ],
    },
    storage: {
      icon: <HardDrive className="w-4 h-4" />,
      label: "Storage & Backup",
      items: [
        "Create/Attach/Detach EBS Volumes",
        "Modify volume size/type",
        "Create EBS Snapshots",
        "Create/Use AMIs",
        "Create S3 bucket",
        "List & delete snapshots",
      ],
    },
    dashboard: {
      icon: <LayoutDashboard className="w-4 h-4" />,
      label: "Infra Dashboard",
      items: [
        "View list of active EC2s per customer",
        "Resource tagging summary",
        "Filter by tag, region, state",
        "View associated VPC/subnet",
        "Instance health & state",
      ],
    },
    approval: {
      icon: <ClipboardCheck className="w-4 h-4" />,
      label: "Approval Center",
      items: [
        "View pending launch/change requests",
        "Approve/Deny requests",
        "View requester info & config summary",
        "Approval history logs",
      ],
    },
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleChangeRequestClick = (category, item) => {
    if (category === "EC2 Manager" && item === "Launch EC2 instance") {
      navigate("/dashboard/ec2/launch"); // ✅ navigate works now
    } else {
      console.log(`Selected: ${category} - ${item}`);
    }
  };

  return (
    <div className="space-y-2">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full text-left hover:text-blue-300 transition-colors py-1"
      >
        <div className="flex items-center justify-center w-4 h-4 mr-3">
          {isOpen ? <TriangleDown /> : <TriangleRight />}
        </div>
        <span>Change Requests</span>
      </button>

      {/* Categories */}
      {isOpen && (
        <div className="ml-7 space-y-2">
          {Object.entries(changeRequestCategories).map(([key, category]) => (
            <div key={key} className="space-y-1">
              {/* Category Header */}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateRequest;
