import React, { useState } from "react";
import {
  Server,
  Save,
  Copy,
  Eye,
  Settings,
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
    vpcId: "",
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

  const [selectedRegion, setSelectedRegion] = useState("eu-north-1");
  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data for dropdowns
  const regions = [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "us-west-2", label: "US West (Oregon)" },
    { value: "eu-north-1", label: "Europe (Stockholm)" },
    { value: "eu-west-1", label: "Europe (Ireland)" },
    { value: "ap-south-1", label: "Asia Pacific (Mumbai)" },
  ];

  const amis = [
    { value: "ami-0989fb15ce71ba39e", label: "Amazon Linux 2023 AMI" },
    { value: "ami-0abcdef1234567890", label: "Ubuntu Server 22.04 LTS" },
    { value: "ami-0fedcba0987654321", label: "Windows Server 2022" },
    { value: "ami-0123456789abcdef0", label: "Red Hat Enterprise Linux 9" },
  ];

  const keyPairs = [
    { value: "", label: "Select a key pair" },
    { value: "my-key-pair", label: "my-key-pair" },
    { value: "prod-key", label: "prod-key" },
    { value: "dev-key", label: "dev-key" },
    { value: "test-key", label: "test-key" },
  ];

  const vpcs = [
    { value: "", label: "Select a VPC" },
    {
      value: "vpc-0123456789abcdef0",
      label: "vpc-0123456789abcdef0 (default)",
    },
    {
      value: "vpc-0abcdef1234567890",
      label: "vpc-0abcdef1234567890 (prod-vpc)",
    },
    {
      value: "vpc-0fedcba0987654321",
      label: "vpc-0fedcba0987654321 (dev-vpc)",
    },
  ];

  const subnets = [
    { value: "", label: "Select a subnet" },
    {
      value: "subnet-0123456789abcdef0",
      label: "subnet-0123456789abcdef0 (eu-north-1a)",
    },
    {
      value: "subnet-0abcdef1234567890",
      label: "subnet-0abcdef1234567890 (eu-north-1b)",
    },
    {
      value: "subnet-0fedcba0987654321",
      label: "subnet-0fedcba0987654321 (eu-north-1c)",
    },
  ];

  const securityGroupOptions = [
    { value: "", label: "Select security groups" },
    { value: "sg-0123456789abcdef0", label: "sg-0123456789abcdef0 (default)" },
    { value: "sg-0abcdef1234567890", label: "sg-0abcdef1234567890 (web-sg)" },
    { value: "sg-0fedcba0987654321", label: "sg-0fedcba0987654321 (app-sg)" },
    { value: "sg-0987654321fedcba0", label: "sg-0987654321fedcba0 (db-sg)" },
  ];

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
        i === index ? (field ? { ...item, [field]: value } : value) : item
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
    { id: "preview", label: "Preview", icon: <Eye className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Deploy EC2
                  </h1>
                  <p className="text-gray-600">
                    EC2 | {selectedRegion} | Configure your EC2 launch template
                  </p>
                </div>
              </div>

              {/* Region Selector */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Region:
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  {regions.map((region) => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
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
                      ? "border-blue-600 text-blue-600"
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
                <div className="space-y-8">
                  {/* Template Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Template Information
                    </h3>
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          {instanceTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Template Description
                        </label>
                        <textarea
                          value={templateData.templateDescription}
                          onChange={(e) =>
                            handleInputChange("templateDescription", e.target.value)
                          }
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="Description of your launch template..."
                        />
                      </div> */}
                    </div>
                  </div>

                  {/* Instance Configuration */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Instance Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          AMI ID *
                        </label>
                        <select
                          value={templateData.amiId}
                          onChange={(e) =>
                            handleInputChange("amiId", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          required
                        >
                          {amis.map((ami) => (
                            <option key={ami.value} value={ami.value}>
                              {ami.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Key Pair Name
                        </label>
                        <select
                          value={templateData.keyPairName}
                          onChange={(e) =>
                            handleInputChange("keyPairName", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          {keyPairs.map((keyPair) => (
                            <option key={keyPair.value} value={keyPair.value}>
                              {keyPair.label}
                            </option>
                          ))}
                        </select>
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          {availabilityZones.map((zone) => (
                            <option key={zone} value={zone}>
                              {zone}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Network Configuration */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Network Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          VPC
                        </label>
                        <select
                          value={templateData.vpcId}
                          onChange={(e) =>
                            handleInputChange("vpcId", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          {vpcs.map((vpc) => (
                            <option key={vpc.value} value={vpc.value}>
                              {vpc.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subnet
                        </label>
                        <select
                          value={templateData.subnetId}
                          onChange={(e) =>
                            handleInputChange("subnetId", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          {subnets.map((subnet) => (
                            <option key={subnet.value} value={subnet.value}>
                              {subnet.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Security Groups */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Security Groups
                      </label>
                      {templateData.securityGroups.map((sg, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <select
                            value={sg}
                            onChange={(e) =>
                              handleArrayChange(
                                "securityGroups",
                                index,
                                null,
                                e.target.value
                              )
                            }
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          >
                            {securityGroupOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
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
                        className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm"
                      >
                        + Add Security Group
                      </button>
                    </div>
                  </div>

                  {/* Storage Configuration */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Storage Configuration
                    </h3>
                    {templateData.blockDeviceMappings.map((device, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 mb-4"
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
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                              className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
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
                              className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
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
                      className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm border border-blue-600"
                    >
                      + Add Block Device
                    </button>
                  </div>

                  {/* Advanced Options */}
                  {/* <div> */}
                  {/* <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Options</h3> */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                  {/* <div>
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="my-instance-profile"
                        />
                      </div> */}

                  {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Shutdown Behavior
                        </label>
                        <select
                          value={templateData.shutdownBehavior}
                          onChange={(e) =>
                            handleInputChange("shutdownBehavior", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          <option value="stop">Stop</option>
                          <option value="terminate">Terminate</option>
                        </select>
                      </div> */}
                  {/* </div> */}

                  {/* Checkboxes */}
                  {/* <div className="mt-4 space-y-4"> */}
                  {/* <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="monitoring"
                          checked={templateData.monitoring}
                          onChange={(e) =>
                            handleInputChange("monitoring", e.target.checked)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="monitoring"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Enable detailed monitoring
                        </label>
                      </div> */}

                  {/* <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ebsOptimized"
                          checked={templateData.ebsOptimized}
                          onChange={(e) =>
                            handleInputChange("ebsOptimized", e.target.checked)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="ebsOptimized"
                          className="ml-2 text-sm text-gray-700"
                        >
                          EBS-optimized instance
                        </label>
                      </div> */}

                  {/* <div className="flex items-center">
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
                          className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="terminationProtection"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Enable termination protection
                        </label>
                      </div> */}
                  {/* </div> */}

                  {/* User Data */}
                  {/* <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User Data Script
                      </label>
                      <textarea
                        value={templateData.userData}
                        onChange={(e) =>
                          handleInputChange("userData", e.target.value)
                        }
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-sm"
                        placeholder="#!/bin/bash&#10;yum update -y&#10;# Add your startup script here..."
                      />
                    </div> */}
                </div>
                // </div>
              )}

              {/* Preview Tab */}
              {activeTab === "preview" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Template Preview
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
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            VPC
                          </p>
                          <p className="text-gray-900">
                            {templateData.vpcId || "Default"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Subnet
                          </p>
                          <p className="text-gray-900">
                            {templateData.subnetId || "None"}
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
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Region: {selectedRegion} | Service: EC2
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type={"button"}
                    onClick={
                      activeTab === "basic"
                        ? () => setActiveTab("preview")
                        : handleSubmit
                    }
                    disabled={
                      (activeTab === "preview" && isLoading) ||
                      !templateData.templateName ||
                      !templateData.amiId
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {activeTab === "preview" && isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Launching...</span>
                      </>
                    ) : activeTab === "basic" ? (
                      <>
                        <Eye className="h-4 w-4" />
                        <span>Next</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Launch EC2 Instance</span>
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
