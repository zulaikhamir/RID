import React from "react";

const Budget = () => {
  const data = [
    { label: "Total Allocated", value: "$12,500" },
    { label: "Used This Month", value: "$8,750" },
    { label: "Remaining", value: "$3,750" },
    { label: "Pending Requests", value: "$2,100" },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Budget Overview</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-6 text-center  border border-white/20
                       transform transition-all duration-300 
                       hover:scale-105 hover:shadow-2xl"
          >
            <p className="text-3xl font-bold text-blue-600">{item.value}</p>
            <p className="text-gray-600 mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
