import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Globe, MapPin, Briefcase } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#181ed4] text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-[#181ed4]" />
              </div>
              <span className="text-2xl font-bold text-[#181ed4] bg-white px-2 py-1 rounded">
                RID
              </span>
            </div>
            <p className="text-white text-sm">
              Streamlining infrastructure with intelligent automation. Built by
              JIT Global Info Systems to power modern DevOps teams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/createrequest"
                  className="hover:underline text-white/80"
                >
                  Change Request
                </Link>
              </li>
              <li>
                <Link
                  to="/request-details"
                  className="hover:underline text-white/80"
                >
                  Request Details
                </Link>
              </li>
              <li>
                <Link to="/budget" className="hover:underline text-white/80">
                  Budget
                </Link>
              </li>
              <li>
                <Link
                  to="/usermanual"
                  className="hover:underline text-white/80"
                >
                  User Manual
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-200 mt-1" />
                <p>
                  2/181, AGS Colony, Phase 3, Mugalivakkam, Chennai - 600125
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-200" />
                <a href="tel:+917810099942" className="hover:underline">
                  +91 78100 99942
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-200" />
                <a
                  href="mailto:sales@jitglobalinfosystems.com"
                  className="hover:underline"
                >
                  sales@jitglobalinfosystems.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-blue-200" />
                <a
                  href="https://jitglobalinfosystems.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  jitglobalinfosystems.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-6 border-t border-white/20 text-center text-sm text-white/60">
          &copy; {currentYear} JIT Global Info Systems Pvt Limited. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
