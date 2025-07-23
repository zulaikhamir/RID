import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-8">Change Request</h2>
      <nav className="flex flex-col gap-4">
        {" "}
        <Link to="/request-details" className="hover:text-blue-300">
          Request Details
        </Link>
        <Link to="/create-request" className="hover:text-blue-300">
          Create Request
        </Link>
        <Link to="/budget" className="hover:text-blue-300">
          Budget
        </Link>
        <Link to="/usermanual" className="hover:text-blue-300">
          Budget User Manual
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
