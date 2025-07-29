import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Landing page components
import LandingHeader from "./components/landing/Header";
import LandingFooter from "./components/landing/Footer";
import Preloader from "./components/landing/Preloader";
import Aboutus from "./pages/landing/Aboutus";
import Contact from "./pages/landing/Contact";
import Home from "./pages/landing/Home";
import Solutions from "./pages/landing/Solutions";
import WhyRID from "./pages/landing/WhyRID";

// Dashboard components
import DashboardHeader from "./components/Header";
import Sidebar from "./components/Sidebar";
import Budget from "./pages/Budget";
import CreateRequest from "./pages/CreateRequest";
import RequestDetailsTable from "./pages/RequestDetails";
import UserManual from "./pages/UserManual";
import LaunchInstance from "./pages/EC2/LaunchInstance";
import DashboardFooter from "./components/Footer";

import "./index.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route
          path="/"
          element={
            <>
              <LandingHeader />
              <Preloader />
              <section id="home">
                <Home />
              </section>
              <section id="about">
                <Aboutus />
              </section>
              <section id="whyrid">
                <WhyRID />
              </section>
              <section id="solutions">
                <Solutions />
              </section>
              <section id="contact">
                <Contact />
              </section>
              <LandingFooter />
            </>
          }
        />

        {/* Dashboard Layout */}
        <Route
          path="/dashboard/*"
          element={
            <div className="flex flex-col min-h-screen">
              <DashboardHeader />
              <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="hidden md:block w-64 bg-[#181ed4] text-white">
                  <div className="h-full">
                    <Sidebar
                      isCollapsed={isSidebarCollapsed}
                      setIsCollapsed={setIsSidebarCollapsed}
                    />
                  </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-4 bg-white">
                  <Routes>
                    <Route
                      path=""
                      element={<h1>Welcome to RID Dashboard</h1>}
                    />
                    <Route
                      path="request-details"
                      element={<RequestDetailsTable />}
                    />
                    <Route path="createrequest" element={<CreateRequest />} />
                    <Route path="budget" element={<Budget />} />
                    <Route path="usermanual" element={<UserManual />} />
                    <Route path="ec2/launch" element={<LaunchInstance />} />
                  </Routes>
                </main>
              </div>
              <DashboardFooter />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
