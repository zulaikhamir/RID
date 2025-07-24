import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Budget from "./pages/budget";
import CreateRequest from "./pages/createrequest";
import RequestDetailsTable from "./pages/requestdetails";
import Footer from "./components/footer";
import UserManual from "./pages/usermanual";
import "./index.css";

function App() {
  return (
    <Router>
      {/* Full height layout */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main layout with sidebar + content */}
        <div className="flex flex-1">
          {/* Sidebar: visible on md and above, hidden on small screens */}
          <aside className="hidden md:block w-64 bg-gray-100 border-r">
            <Sidebar />
          </aside>

          {/* Main content: full width on small screens, takes remaining space on md+ */}
          <main className="flex-1 p-4">
            <Routes>
              {" "}
              <Route
                path="/request-details"
                element={<RequestDetailsTable />}
              />
              <Route path="/create-request" element={<CreateRequest />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/usermanual" element={<UserManual />} />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
