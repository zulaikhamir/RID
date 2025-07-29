import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, CloudCog, ChevronDown } from "lucide-react";

const Header = ({ onSignupClick = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: "home", label: "Home" },
    { path: "about", label: "About Us" },
    { path: "products", label: "Products" },
    { path: "contact", label: "Contact Us" },
  ];

  const products = [
    {
      key: "rid",
      label: "RID",
      path: "/rid",
    },
    {
      key: "rms",
      label: "RMS",
      path: "/solutions",
    },
    {
      key: "ims",
      label: "IMS",
      path: "/ims",
    },
    {
      key: "intellichat",
      label: "IntelliChat",
      path: "/intellichat",
    },
  ];

  const handleLoginClick = () => {
    navigate("/dashboard/request-details");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50">
      <div className="w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between w-full">
          {/* Logo on left */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center space-x-2 group">
              <div className="bg-[#181ed4] p-2 rounded-lg group-hover:shadow-lg transition-shadow">
                <CloudCog className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#181ed4]">RID</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 relative">
            {navItems.map((item) => {
              if (item.label === "Products") {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsProductDropdownOpen(true)}
                    onMouseLeave={() => setIsProductDropdownOpen(false)}
                  >
                    <button className="text-[#181ed4] hover:text-white transition-colors duration-300 font-medium px-2 py-1 rounded hover:bg-[#181ed4]/10 flex items-center">
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {isProductDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                        {products.map((product) => (
                          <a
                            key={product.key}
                            href={product.path}
                            className="block px-4 py-3 text-slate-700 hover:bg-[#181ed4]/10 hover:text-[#181ed4] transition-all first:rounded-t-lg last:rounded-b-lg"
                          >
                            {product.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.path}
                  href={`#${item.path}`}
                  className="text-[#181ed4] hover:text-white transition-colors duration-300 font-medium relative group px-2 py-1 rounded hover:bg-[#181ed4]/10"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSignupClick}
              className="hidden sm:inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={handleLoginClick}
              className="hidden sm:inline-flex items-center bg-white text-[#181ed4] border border-[#181ed4] font-semibold py-2 px-6 rounded-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300 ml-2"
            >
              Login
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-700 hover:text-blue-600 transition-colors"
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
              {navItems.map((item) =>
                item.label === "Products" ? (
                  <div key="mobile-products">
                    <button
                      onClick={() =>
                        setIsProductDropdownOpen(!isProductDropdownOpen)
                      }
                      className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 font-medium flex items-center justify-between"
                    >
                      Products
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isProductDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isProductDropdownOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {products.map((product) => (
                          <a
                            key={product.key}
                            href={product.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm text-slate-600 hover:text-blue-600 py-1"
                          >
                            {product.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.path}
                    href={`#${item.path}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                )
              )}
              <button
                onClick={() => {
                  onSignupClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  handleLoginClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-2 inline-flex items-center justify-center bg-white text-[#181ed4] border border-[#181ed4] font-semibold py-2 px-6 rounded-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300"
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
