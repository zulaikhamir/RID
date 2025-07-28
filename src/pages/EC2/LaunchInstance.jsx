import React, { useState } from "react";
import {
  Server,
  Save,
  Copy,
  Eye,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const LaunchInstance = () => {
  const [templateData, setTemplateData] = useState({
    templateName: "",
    templateDescription: "",
    instanceType: "t3.micro",
    amiId: "ami-0989fb15ce71ba39e", // Amazon Linux 2 in eu-north-1
    keyPairName: "",
    securityGroups: [""],
    subnetId: "",
    iamInstanceProfile: "",
    userData: "",
    monitoring: false,
    ebsOptimized: false,
    terminationProtection: false,
    shutdownBehavior: "stop",
    placement: {
      availabilityZone: "eu-north-1a",
      tenancy: "default",
    },
    blockDeviceMappings: [
      {
        deviceName: "/dev/xvda",
        volumeType: "gp3",
        volumeSize: 8,
        deleteOnTermination: true,
        encrypted: false,
      },
    ],
    tags: [
      { key: "Name", value: "" },
      { key: "Environment", value: "" },
    ],
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const instanceTypes = [
    "t3.nano",
    "t3.micro",
    "t3.small",
    "t3.medium",
    "t3.large",
    "t3.xlarge",
    "t3.2xlarge",
    "m5.large",
    "m5.xlarge",
    "m5.2xlarge",
    "c5.large",
    "c5.xlarge",
    "c5.2xlarge",
    "r5.large",
    "r5.xlarge",
  ];

  const availabilityZones = ["eu-north-1a", "eu-north-1b", "eu-north-1c"];

  const volumeTypes = ["gp3", "gp2", "io1", "io2", "st1", "sc1"];

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setTemplateData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setTemplateData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setTemplateData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addToArray = (arrayName, newItem) => {
    setTemplateData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem],
    }));
  };

  const removeFromArray = (arrayName, index) => {
    setTemplateData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: <Server className="w-4 h-4" /> },
    {
      id: "advanced",
      label: "Advanced",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    { id: "storage", label: "Storage", icon: <Copy className="w-4 h-4" /> },
    { id: "preview", label: "Preview", icon: <Eye className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-[#181ed4] p-2 rounded-lg">
                <Server className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Create Launch Template
                </h1>
                <p className="text-gray-600">
                  EC2 | eu-north-1 | Configure your EC2 launch template
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="p-4 bg-green-50 border-l-4 border-green-400">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <p className="text-green-700">
                  Launch template created successfully!
                </p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-[#181ed4] text-[#181ed4]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Template Name *
                      </label>
                      <input
                        type="text"
                        value={templateData.templateName}
                        onChange={(e) =>
                          handleInputChange("templateName", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                        placeholder="my-launch-template"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instance Type *
                      </label>
                      <select
                        value={templateData.instanceType}
                        onChange={(e) =>
                          handleInputChange("instanceType", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                      >
                        {instanceTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AMI ID *
                      </label>
                      <input
                        type="text"
                        value={templateData.amiId}
                        onChange={(e) =>
                          handleInputChange("amiId", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                        placeholder="ami-0989fb15ce71ba39e"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Pair Name
                      </label>
                      <input
                        type="text"
                        value={templateData.keyPairName}
                        onChange={(e) =>
                          handleInputChange("keyPairName", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                        placeholder="my-key-pair"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subnet ID
                      </label>
                      <input
                        type="text"
                        value={templateData.subnetId}
                        onChange={(e) =>
                          handleInputChange("subnetId", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                        placeholder="subnet-xxxxxxxxx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Availability Zone
                      </label>
                      <select
                        value={templateData.placement.availabilityZone}
                        onChange={(e) =>
                          handleInputChange(
                            "placement.availabilityZone",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                      >
                        {availabilityZones.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Description
                    </label>
                    <textarea
                      value={templateData.templateDescription}
                      onChange={(e) =>
                        handleInputChange("templateDescription", e.target.value)
                      }
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                      placeholder="Description of your launch template..."
                    />
                  </div>

                  {/* Security Groups */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Groups
                    </label>
                    {templateData.securityGroups.map((sg, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          type="text"
                          value={sg}
                          onChange={(e) =>
                            handleArrayChange(
                              "securityGroups",
                              index,
                              null,
                              e.target.value
                            )
                          }
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                          placeholder="sg-xxxxxxxxx"
                        />
                        {templateData.securityGroups.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeFromArray("securityGroups", index)
                            }
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addToArray("securityGroups", "")}
                      className="text-[#181ed4] hover:bg-blue-50 px-3 py-2 rounded-lg text-sm"
                    >
                      + Add Security Group
                    </button>
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === "advanced" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IAM Instance Profile
                      </label>
                      <input
                        type="text"
                        value={templateData.iamInstanceProfile}
                        onChange={(e) =>
                          handleInputChange(
                            "iamInstanceProfile",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                        placeholder="my-instance-profile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shutdown Behavior
                      </label>
                      <select
                        value={templateData.shutdownBehavior}
                        onChange={(e) =>
                          handleInputChange("shutdownBehavior", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                      >
                        <option value="stop">Stop</option>
                        <option value="terminate">Terminate</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="monitoring"
                        checked={templateData.monitoring}
                        onChange={(e) =>
                          handleInputChange("monitoring", e.target.checked)
                        }
                        className="h-4 w-4 text-[#181ed4] focus:ring-[#181ed4] border-gray-300 rounded"
                      />
                      <label
                        htmlFor="monitoring"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Enable detailed monitoring
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="ebsOptimized"
                        checked={templateData.ebsOptimized}
                        onChange={(e) =>
                          handleInputChange("ebsOptimized", e.target.checked)
                        }
                        className="h-4 w-4 text-[#181ed4] focus:ring-[#181ed4] border-gray-300 rounded"
                      />
                      <label
                        htmlFor="ebsOptimized"
                        className="ml-2 text-sm text-gray-700"
                      >
                        EBS-optimized instance
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terminationProtection"
                        checked={templateData.terminationProtection}
                        onChange={(e) =>
                          handleInputChange(
                            "terminationProtection",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-[#181ed4] focus:ring-[#181ed4] border-gray-300 rounded"
                      />
                      <label
                        htmlFor="terminationProtection"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Enable termination protection
                      </label>
                    </div>
                  </div>

                  {/* User Data */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Data Script
                    </label>
                    <textarea
                      value={templateData.userData}
                      onChange={(e) =>
                        handleInputChange("userData", e.target.value)
                      }
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent font-mono text-sm"
                      placeholder="#!/bin/bash&#10;yum update -y&#10;# Add your startup script here..."
                    />
                  </div>
                </div>
              )}

              {/* Storage Tab */}
              {activeTab === "storage" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Block Device Mappings
                  </h3>

                  {templateData.blockDeviceMappings.map((device, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Device Name
                          </label>
                          <input
                            type="text"
                            value={device.deviceName}
                            onChange={(e) =>
                              handleArrayChange(
                                "blockDeviceMappings",
                                index,
                                "deviceName",
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Volume Type
                          </label>
                          <select
                            value={device.volumeType}
                            onChange={(e) =>
                              handleArrayChange(
                                "blockDeviceMappings",
                                index,
                                "volumeType",
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                          >
                            {volumeTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Size (GB)
                          </label>
                          <input
                            type="number"
                            value={device.volumeSize}
                            onChange={(e) =>
                              handleArrayChange(
                                "blockDeviceMappings",
                                index,
                                "volumeSize",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181ed4] focus:border-transparent"
                            min="1"
                            max="16384"
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center space-x-6">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`deleteOnTermination-${index}`}
                            checked={device.deleteOnTermination}
                            onChange={(e) =>
                              handleArrayChange(
                                "blockDeviceMappings",
                                index,
                                "deleteOnTermination",
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-[#181ed4] focus:ring-[#181ed4] border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`deleteOnTermination-${index}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            Delete on termination
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`encrypted-${index}`}
                            checked={device.encrypted}
                            onChange={(e) =>
                              handleArrayChange(
                                "blockDeviceMappings",
                                index,
                                "encrypted",
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-[#181ed4] focus:ring-[#181ed4] border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`encrypted-${index}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            Encrypted
                          </label>
                        </div>

                        {templateData.blockDeviceMappings.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeFromArray("blockDeviceMappings", index)
                            }
                            className="text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm"
                          >
                            Remove Device
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      addToArray("blockDeviceMappings", {
                        deviceName: "/dev/sdf",
                        volumeType: "gp3",
                        volumeSize: 10,
                        deleteOnTermination: true,
                        encrypted: false,
                      })
                    }
                    className="text-[#181ed4] hover:bg-blue-50 px-4 py-2 rounded-lg text-sm border border-[#181ed4]"
                  >
                    + Add Block Device
                  </button>
                </div>
              )}
            </div>
            {/* Configuration Summary */}
            {activeTab === "preview" && ( // <-- make sure this matches your tab value
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Block Device Mappings
                </h3>

                {/* Configuration Summary */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Configuration Summary
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Template Name
                        </p>
                        <p className="text-gray-900">
                          {templateData.templateName || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Instance Type
                        </p>
                        <p className="text-gray-900">
                          {templateData.instanceType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          AMI ID
                        </p>
                        <p className="text-gray-900">{templateData.amiId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Key Pair
                        </p>
                        <p className="text-gray-900">
                          {templateData.keyPairName || "None"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* JSON Preview */}
                <div className="bg-gray-900 rounded-xl p-6 mt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    JSON Preview
                  </h4>
                  <pre className="text-green-400 text-sm overflow-auto max-h-96 bg-gray-800 p-4 rounded-lg">
                    {JSON.stringify(templateData, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Region: eu-north-1 | Service: EC2
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !templateData.templateName ||
                      !templateData.amiId
                    }
                    className="px-6 py-2 bg-[#181ed4] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Create Launch Template</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LaunchInstance;
