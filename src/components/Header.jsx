import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";

const Header = ({ onSignupClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50">
      <div className="w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-[#181ed4] p-2 rounded-lg group-hover:shadow-lg transition-shadow">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#181ed4]">RID</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[#181ed4] hover:text-white transition-colors duration-300 font-medium relative group ${
                  isActive(item.path)
                    ? "text-white bg-[#181ed4] rounded px-2 py-1"
                    : ""
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#181ed4] transition-all duration-300 group-hover:w-full ${
                    isActive(item.path) ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            {/* <button
              onClick={onSignupClick}
              className="hidden sm:inline-flex items-center bg-[#181ed4] text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button> */}
            <button
              onClick={() => navigate("/logout")}
              className="hidden sm:inline-flex items-center border border-[#181ed4] text-[#181ed4] font-semibold py-2 px-6 rounded-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300 ml-2"
            >
              Logout
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-700 hover:text-[#181ed4] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-slate-600 hover:text-[#181ed4] transition-colors font-medium ${
                    isActive(item.path) ? "text-[#181ed4] font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  onSignupClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#181ed4] text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full mt-2 inline-flex items-center bg-white text-[#181ed4] border border-[#181ed4] font-semibold py-2 px-6 rounded-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
