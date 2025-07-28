import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Budget from "./pages/Budget";
import CreateRequest from "./pages/CreateRequest";
import RequestDetailsTable from "./pages/requestdetails";
import Footer from "./components/footer";
import UserManual from "./pages/usermanual";
import "./index.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <Router>
      {/* Full height layout */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main layout with sidebar + content */}
        <div className="flex flex-1">
          <aside className="hidden md:block">
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              setIsCollapsed={setIsSidebarCollapsed}
            />
          </aside>

          {/* Main content: full width on small screens, takes remaining space on md+ */}
          <main className="flex-1 p-4">
            <Routes>
              {" "}
              <Route
                path="/request-details"
                element={<RequestDetailsTable />}
              />
              <Route path="/createrequest" element={<CreateRequest />} />
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
