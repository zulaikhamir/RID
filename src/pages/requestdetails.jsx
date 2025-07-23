import React from "react";
import { motion } from "framer-motion";

const requests = [
  {
    id: "REQ-2025-001",
    status: "PENDING",
    changeNo: "CHG-2025-0001",
    createdDate: "July 20, 2025",
    creator: "John Doe",
    approvalStatus: "Awaiting Manager Approval",
  },
  {
    id: "REQ-2025-002",
    status: "APPROVED",
    changeNo: "CHG-2025-0002",
    createdDate: "July 21, 2025",
    creator: "Jane Smith",
    approvalStatus: "Approved",
  },
];

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const RequestDetails = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Request Details</h1>

      <div className="space-y-4">
        {requests.map((req, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl shadow-md bg-white/30 backdrop-blur-lg border border-white/20 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {req.id}
                </h2>
                <p className="text-sm text-gray-600">
                  Change No: {req.changeNo}
                </p>
                <p className="text-sm text-gray-600">
                  Created Date: {req.createdDate}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  statusColors[req.status]
                }`}
              >
                {req.status}
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Creator:</strong> {req.creator}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Approval Status:</strong> {req.approvalStatus}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-md hover:shadow-lg"
              >
                More Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RequestDetails;
