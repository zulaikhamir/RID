import React from "react";

const UserManual = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">User Manual</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Getting Started</h2>
        <p className="text-gray-700">
          To start using the system, log in with your credentials. If you're a
          new user, please contact the admin to get your account set up.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Creating a Request</h2>
        <p className="text-gray-700">
          Navigate to the “Create Request” section from the sidebar. Fill out
          the required details such as project name, description, and budget.
          Click submit to send the request for review.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          3. Viewing Request Details
        </h2>
        <p className="text-gray-700">
          Go to the “Request Details” page to see all your submitted requests
          along with their current status (Pending, Approved, Rejected). You can
          click on any request to view more information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Budget Monitoring</h2>
        <p className="text-gray-700">
          Use the “Budget” tab to keep track of allocated and spent budgets
          across different departments or projects.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">5. Need Help?</h2>
        <p className="text-gray-700">
          If you face any issues, please contact the IT support team or refer to
          the FAQs section in the Help tab.
        </p>
      </section>
    </div>
  );
};

export default UserManual;
