import { useState } from "react";

const Budget = ({ TriangleRight, TriangleDown }) => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    "30-day cost projection (EC2)",
    "AWS Pricing API integration",
    "Track launched instance costs",
    "Set monthly spend limit per customer",
    "Alert if nearing budget",
  ];

  const handleClick = (feature) => {
    console.log(`Clicked: ${feature}`);
    // Example: navigate(`/budget/${feature.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full text-left hover:text-blue-300 transition-colors py-1"
      >
        <div className="flex items-center justify-center w-4 h-4 mr-3">
          {isOpen ? <TriangleDown /> : <TriangleRight />}
        </div>
        <span>Budget</span>
      </button>
      {isOpen && (
        <div className="ml-7 space-y-1">
          {features.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item)}
              className="block w-full text-left text-sm text-blue-100 hover:text-white hover:bg-blue-600 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Budget;
