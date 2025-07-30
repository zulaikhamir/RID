import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Play,
  Square,
  Trash2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Plus,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  Server,
  HardDrive,
  Camera,
  Download,
  Upload,
  Power,
  PowerOff,
  RotateCcw,
  Copy,
  Edit,
  Shield,
  Network,
  Database,
  Clock,
  Zap,
} from "lucide-react";

const InstanceManagement = () => {
  const [activeTab, setActiveTab] = useState("instances");
  const [selectedInstances, setSelectedInstances] = useState([]);
  const [selectedVolumes, setSelectedVolumes] = useState([]);
  const [instanceFilter, setInstanceFilter] = useState("running");
  const [searchTerm, setSearchTerm] = useState("");
  const [showInstanceActions, setShowInstanceActions] = useState(false);
  const [showVolumeActions, setShowVolumeActions] = useState(false);
  const [showInstanceState, setShowInstanceState] = useState(false);
  const [showAllStates, setShowAllStates] = useState(false);

  // Sample data for instances with more realistic data
  const instances = [
    {
      id: "i-07b92737958e51eb",
      name: "Wazuh",
      state: "running",
      type: "t3.medium",
      statusCheck: "3/3 checks passed",
      availabilityZone: "ap-south-1c",
      publicIp: "15.206.123.45",
      privateIp: "172.31.12.34",
      securityGroups: "sg-0123456789abcdef0",
      keyName: "my-key-pair",
      launchTime: "2024-07-30 10:30:00",
      platform: "Linux/UNIX",
      vpc: "vpc-12345678",
      subnet: "subnet-87654321",
      alarms: 2,
    },
    {
      id: "i-00d483ce51b51bd94",
      name: "Wazuh - Main",
      state: "running",
      type: "c5a.xlarge",
      statusCheck: "3/3 checks passed",
      availabilityZone: "ap-south-1b",
      publicIp: "13.127.98.76",
      privateIp: "172.31.45.67",
      securityGroups: "sg-0987654321fedcba0",
      keyName: "production-key",
      launchTime: "2024-07-29 14:15:00",
      platform: "Linux/UNIX",
      vpc: "vpc-87654321",
      subnet: "subnet-12345678",
      alarms: 1,
    },
    {
      id: "i-0abc123def456789",
      name: "Test Server",
      state: "stopped",
      type: "t2.micro",
      statusCheck: "Not available",
      availabilityZone: "ap-south-1a",
      publicIp: "-",
      privateIp: "172.31.78.90",
      securityGroups: "sg-test123456",
      keyName: "test-key",
      launchTime: "2024-07-28 09:45:00",
      platform: "Windows",
      vpc: "vpc-test12345",
      subnet: "subnet-test6789",
      alarms: 0,
    },
  ];

  // Sample data for volumes with more realistic data
  const volumes = [
    {
      id: "vol-05e98156fd2456dfe",
      name: "Wazuh-Root",
      type: "gp3",
      size: "8 GiB",
      iops: 3000,
      throughput: 125,
      snapshotId: "snap-09ce350a1b2c3d4e5",
      sourceVolumeId: "-",
      created: "2024-07-30",
      state: "in-use",
      attachedTo: "i-07b92737958e51eb",
      device: "/dev/sda1",
      zone: "ap-south-1c",
      encrypted: "Yes",
      volumeType: "Root",
    },
    {
      id: "vol-0e590ec2e0d10b25c",
      name: "Wazuh-Main-Root",
      type: "gp3",
      size: "8 GiB",
      iops: 3000,
      throughput: 125,
      snapshotId: "snap-09ce350b2c3d4e5f6",
      sourceVolumeId: "-",
      created: "2024-07-29",
      state: "in-use",
      attachedTo: "i-00d483ce51b51bd94",
      device: "/dev/sda1",
      zone: "ap-south-1b",
      encrypted: "Yes",
      volumeType: "Root",
    },
    {
      id: "vol-07aac2fe111d29067",
      name: "Data-Volume-1",
      type: "gp2",
      size: "100 GiB",
      iops: 300,
      throughput: "-",
      snapshotId: "snap-0260e4f7g8h9i0j1k",
      sourceVolumeId: "-",
      created: "2024-07-25",
      state: "available",
      attachedTo: "-",
      device: "-",
      zone: "ap-south-1a",
      encrypted: "No",
      volumeType: "Additional",
    },
    {
      id: "vol-002290c5da2ce1f47",
      name: "Backup-Volume",
      type: "gp2",
      size: "8 GiB",
      iops: 100,
      throughput: "-",
      snapshotId: "snap-06c28f5l2m3n4o5p6",
      sourceVolumeId: "-",
      created: "2024-07-20",
      state: "available",
      attachedTo: "-",
      device: "-",
      zone: "ap-south-1c",
      encrypted: "No",
      volumeType: "Additional",
    },
    {
      id: "vol-00b5308a775ad52cb",
      name: "Storage-Volume",
      type: "gp3",
      size: "75 GiB",
      iops: 3000,
      throughput: 125,
      snapshotId: "snap-0d769d2q3r4s5t6u7",
      sourceVolumeId: "-",
      created: "2024-07-18",
      state: "in-use",
      attachedTo: "i-00d483ce51b51bd94",
      device: "/dev/sdf",
      zone: "ap-south-1b",
      encrypted: "Yes",
      volumeType: "Additional",
    },
  ];

  const instanceActions = [
    { label: "Start instance", icon: Play, disabled: false },
    { label: "Stop instance", icon: Square, disabled: false },
    { label: "Restart instance", icon: RotateCcw, disabled: false },
    {
      label: "Terminate instance",
      icon: Trash2,
      disabled: false,
      danger: true,
    },
    { divider: true },
    { label: "Connect", icon: ExternalLink, disabled: false },
    { label: "Launch more like this", icon: Copy, disabled: false },
    { label: "Launch instance from template", icon: Server, disabled: false },
    { divider: true },
    {
      label: "Image and templates",
      submenu: [
        { label: "Create image", icon: Camera },
        { label: "Create template from instance", icon: Copy },
        { label: "Launch more like this", icon: Server },
      ],
    },
    {
      label: "Instance settings",
      submenu: [
        { label: "Change instance type", icon: Settings },
        { label: "Change security groups", icon: Shield },
        { label: "Change source/destination check", icon: Network },
        { label: "Change termination protection", icon: Shield },
        { label: "Change shutdown behavior", icon: Power },
        { label: "Change user data", icon: Edit },
        { label: "Change credit specification", icon: Zap },
      ],
    },
    {
      label: "Networking",
      submenu: [
        { label: "Attach network interface", icon: Network },
        { label: "Detach network interface", icon: Network },
        { label: "Associate Elastic IP address", icon: Network },
        { label: "Disassociate Elastic IP address", icon: Network },
      ],
    },
    {
      label: "Security",
      submenu: [
        { label: "Get Windows password", icon: Shield },
        { label: "Get system log", icon: Database },
        { label: "Get instance screenshot", icon: Camera },
      ],
    },
    {
      label: "Monitor and troubleshoot",
      submenu: [
        { label: "Get system log", icon: Database },
        { label: "Get instance screenshot", icon: Camera },
        { label: "Monitor in CloudWatch", icon: Eye },
        { label: "Get instance metadata", icon: Database },
      ],
    },
  ];

  const volumeActions = [
    { label: "Attach volume", icon: HardDrive, disabled: false },
    { label: "Detach volume", icon: HardDrive, disabled: false },
    { label: "Create snapshot", icon: Camera, disabled: false },
    { label: "Delete volume", icon: Trash2, disabled: false, danger: true },
    { divider: true },
    { label: "Modify volume", icon: Edit, disabled: false },
    { label: "Enable fast snapshot restore", icon: Zap, disabled: false },
    { label: "Disable fast snapshot restore", icon: Zap, disabled: true },
    { divider: true },
    { label: "Create volume from snapshot", icon: Copy, disabled: false },
    { label: "Create AMI from snapshot", icon: Server, disabled: false },
    { divider: true },
    { label: "Add/Edit tags", icon: Edit, disabled: false },
  ];

  const instanceStates = [
    "pending",
    "running",
    "shutting-down",
    "terminated",
    "stopping",
    "stopped",
  ];

  const allStatesOptions = [
    "All states",
    "running",
    "pending",
    "shutting-down",
    "terminated",
    "stopping",
    "stopped",
  ];

  const handleInstanceSelect = (instanceId) => {
    setSelectedInstances((prev) =>
      prev.includes(instanceId)
        ? prev.filter((id) => id !== instanceId)
        : [...prev, instanceId]
    );
  };

  const handleVolumeSelect = (volumeId) => {
    setSelectedVolumes((prev) =>
      prev.includes(volumeId)
        ? prev.filter((id) => id !== volumeId)
        : [...prev, volumeId]
    );
  };

  const handleSelectAllInstances = () => {
    if (selectedInstances.length === filteredInstances.length) {
      setSelectedInstances([]);
    } else {
      setSelectedInstances(filteredInstances.map((instance) => instance.id));
    }
  };

  const handleSelectAllVolumes = () => {
    if (selectedVolumes.length === filteredVolumes.length) {
      setSelectedVolumes([]);
    } else {
      setSelectedVolumes(filteredVolumes.map((volume) => volume.id));
    }
  };

  const filteredInstances = instances.filter((instance) => {
    const matchesState =
      instanceFilter === "all" || instance.state === instanceFilter;
    const matchesSearch =
      searchTerm === "" ||
      instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  const filteredVolumes = volumes.filter(
    (volume) =>
      searchTerm === "" ||
      volume.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volume.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ActionDropdown = ({ actions, show, onClose, selectedCount = 0 }) => {
    if (!show) return null;

    const isDisabled = (action) => {
      return action.disabled || (selectedCount === 0 && !action.alwaysEnabled);
    };

    return (
      <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50">
        <div className="py-1">
          {actions.map((action, index) => {
            if (action.divider) {
              return (
                <div key={index} className="border-t border-gray-200 my-1" />
              );
            }

            if (action.submenu) {
              return (
                <div key={index} className="relative group">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {action.icon && <action.icon className="h-4 w-4" />}
                      {action.label}
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <div className="absolute left-full top-0 w-56 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      {action.submenu.map((subAction, subIndex) => (
                        <button
                          key={subIndex}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => {
                            console.log(
                              `${action.label} -> ${subAction.label} clicked`
                            );
                            onClose();
                          }}
                        >
                          {subAction.icon && (
                            <subAction.icon className="h-4 w-4" />
                          )}
                          {subAction.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={index}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                  isDisabled(action)
                    ? "text-gray-400 cursor-not-allowed"
                    : action.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                disabled={isDisabled(action)}
                onClick={() => {
                  if (!isDisabled(action)) {
                    console.log(
                      `${action.label} clicked for ${selectedCount} items`
                    );
                    onClose();
                  }
                }}
              >
                {action.icon && <action.icon className="h-4 w-4" />}
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const StateDropdown = ({ options, show, onClose, selected, onSelect }) => {
    if (!show) return null;

    return (
      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
        <div className="py-1">
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                selected === option
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
              onClick={() => {
                onSelect(option.toLowerCase());
                onClose();
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const InstancesView = () => (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">
            Instances ({filteredInstances.length})
          </h1>
          <button className="text-blue-600 text-sm hover:underline">
            Info
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Last updated 1 minute ago
          </span>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
            Connect
          </button>
          <div className="relative">
            <button
              className="px-4 py-2 border border-gray-300 rounded text-sm bg-white flex items-center gap-2"
              onClick={() => setShowInstanceState(!showInstanceState)}
            >
              Instance state
              <ChevronDown className="h-4 w-4" />
            </button>
            <StateDropdown
              options={instanceStates}
              show={showInstanceState}
              onClose={() => setShowInstanceState(false)}
              selected={instanceFilter}
              onSelect={setInstanceFilter}
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => console.log("Launch instances clicked")}
          >
            Launch instances
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Find Instance by attribute or tag (case-sensitive)"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              className="px-4 py-2 border border-gray-300 rounded text-sm bg-white flex items-center gap-2"
              onClick={() => setShowAllStates(!showAllStates)}
            >
              {instanceFilter === "all"
                ? "All states"
                : instanceFilter.charAt(0).toUpperCase() +
                  instanceFilter.slice(1)}
              <ChevronDown className="h-4 w-4" />
            </button>
            <StateDropdown
              options={allStatesOptions}
              show={showAllStates}
              onClose={() => setShowAllStates(false)}
              selected={instanceFilter}
              onSelect={setInstanceFilter}
            />
          </div>
        </div>

        {instanceFilter !== "all" && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
              Instance state = {instanceFilter}
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setInstanceFilter("all")}
              >
                ×
              </button>
            </span>
            <button
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              onClick={() => {
                setInstanceFilter("all");
                setSearchTerm("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={
                    selectedInstances.length === filteredInstances.length &&
                    filteredInstances.length > 0
                  }
                  onChange={handleSelectAllInstances}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Instance ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Instance state
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Instance type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Status check
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Alarm status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Availability Zone
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Public IPv4 address
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Private IPv4 address
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Security groups
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Key name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Launch time
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Platform
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                VPC ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Subnet ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Root device type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                AMI ID
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInstances.map((instance) => (
              <tr key={instance.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedInstances.includes(instance.id)}
                    onChange={() => handleInstanceSelect(instance.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(`Navigate to instance ${instance.name}`)
                    }
                  >
                    {instance.name}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(`Navigate to instance ${instance.id}`)
                    }
                  >
                    {instance.id}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        instance.state === "running"
                          ? "bg-green-500"
                          : instance.state === "stopped"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <span
                      className={`${
                        instance.state === "running"
                          ? "text-green-700"
                          : instance.state === "stopped"
                          ? "text-red-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {instance.state.charAt(0).toUpperCase() +
                        instance.state.slice(1)}
                    </span>
                    <button
                      className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                      onClick={() =>
                        console.log(
                          `View instance state details for ${instance.id}`
                        )
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">{instance.type}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {instance.state === "running" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span>{instance.statusCheck}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(`View alarms for ${instance.id}`)
                    }
                  >
                    View alarms +
                  </button>
                </td>
                <td className="px-4 py-3">{instance.availabilityZone}</td>
                <td className="px-4 py-3">
                  {instance.publicIp !== "-" ? (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        console.log(
                          `View public IP details: ${instance.publicIp}`
                        )
                      }
                    >
                      {instance.publicIp}
                    </button>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(
                        `View private IP details: ${instance.privateIp}`
                      )
                    }
                  >
                    {instance.privateIp}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(
                        `View security groups: ${instance.securityGroups}`
                      )
                    }
                  >
                    {instance.securityGroups}
                  </button>
                </td>
                <td className="px-4 py-3">{instance.keyName}</td>
                <td className="px-4 py-3">{instance.launchTime}</td>
                <td className="px-4 py-3">{instance.platform}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(`View VPC details: ${instance.vpc}`)
                    }
                  >
                    {instance.vpc}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(`View subnet details: ${instance.subnet}`)
                    }
                  >
                    {instance.subnet}
                  </button>
                </td>
                <td className="px-4 py-3">EBS</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => console.log(`View AMI details`)}
                  >
                    ami-0abcd1234efgh5678
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button
            className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button
            className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom Panel */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <h3 className="font-medium text-gray-800 mb-2">
          {selectedInstances.length > 0
            ? `${selectedInstances.length} instance${
                selectedInstances.length > 1 ? "s" : ""
              } selected`
            : "Select an instance"}
        </h3>
        {selectedInstances.length > 0 && (
          <div className="text-sm text-gray-600">
            Selected: {selectedInstances.join(", ")}
          </div>
        )}
      </div>
    </div>
  );

  const VolumesView = () => (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">
            Volumes ({filteredVolumes.length})
          </h1>
          <button className="text-blue-600 text-sm hover:underline">
            Info
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Last updated about 1 hour ago
          </span>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => console.log("Create volume clicked")}
          >
            Create volume
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="px-4 py-2 border border-gray-300 rounded text-sm bg-white">
              <option>Choose filter set</option>
            </select>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={
                    selectedVolumes.length === filteredVolumes.length &&
                    filteredVolumes.length > 0
                  }
                  onChange={handleSelectAllVolumes}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Volume ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Size
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                IOPS
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Throughput
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Snapshot ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                State
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Attached to
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Device
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Availability Zone
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Created
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Encrypted
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Volume type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Multi-Attach
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                KMS Key ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Fast snapshot restore
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredVolumes.map((volume) => (
              <tr key={volume.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedVolumes.includes(volume.id)}
                    onChange={() => handleVolumeSelect(volume.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  {volume.name ? (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        console.log(`Navigate to volume ${volume.name}`)
                      }
                    >
                      {volume.name}
                    </button>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(`Navigate to volume ${volume.id}`)
                    }
                  >
                    {volume.id}
                  </button>
                </td>
                <td className="px-4 py-3">{volume.type}</td>
                <td className="px-4 py-3">{volume.size}</td>
                <td className="px-4 py-3">{volume.iops}</td>
                <td className="px-4 py-3">{volume.throughput}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      console.log(`Navigate to snapshot ${volume.snapshotId}`)
                    }
                  >
                    {volume.snapshotId}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        volume.state === "in-use"
                          ? "bg-green-500"
                          : volume.state === "available"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <span
                      className={`${
                        volume.state === "in-use"
                          ? "text-green-700"
                          : volume.state === "available"
                          ? "text-blue-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {volume.state}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {volume.attachedTo !== "-" ? (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        console.log(`Navigate to instance ${volume.attachedTo}`)
                      }
                    >
                      {volume.attachedTo}
                    </button>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-4 py-3">{volume.device}</td>
                <td className="px-4 py-3">{volume.zone}</td>
                <td className="px-4 py-3">{volume.created}</td>
                <td className="px-4 py-3">
                  <span
                    className={`${
                      volume.encrypted === "Yes"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {volume.encrypted}
                  </span>
                </td>
                <td className="px-4 py-3">{volume.volumeType}</td>
                <td className="px-4 py-3">
                  <span className="text-gray-500">Disabled</span>
                </td>
                <td className="px-4 py-3">
                  {volume.encrypted === "Yes" ? (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => console.log(`View KMS key details`)}
                    >
                      alias/aws/ebs
                    </button>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-500">Disabled</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button
            className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button
            className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom Sections */}
      <div className="border-t border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-800">
              Fault tolerance for all volumes in this Region
            </h3>
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">Snapshot summary</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                Last updated on Wed, Jul 30, 2025, 11:11:32 AM (GMT+05:30)
              </span>
              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                <RefreshCw className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Recently backed up volumes / Total # volumes
              </p>
              <div className="text-6xl font-bold text-gray-900">
                0 / {volumes.length}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Data Lifecycle Manager default policy for EBS Snapshots status
              </p>
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Failed to fetch default policy status
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("instances")}
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === "instances"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Instances
          </button>
          <button
            onClick={() => setActiveTab("volumes")}
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === "volumes"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Volumes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "instances" ? <InstancesView /> : <VolumesView />}
      </div>

      {/* Click outside handlers */}
      {(showInstanceState || showAllStates) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowInstanceState(false);
            setShowAllStates(false);
          }}
        />
      )}
    </div>
  );
};

export default InstanceManagement;
