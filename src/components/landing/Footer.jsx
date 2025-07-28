import React from "react";
import { Mail, Phone, Globe, MapPin, Briefcase } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#181ed4] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Intro */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-[#181ed4]" />
              </div>
              <span className="text-2xl font-bold text-[#181ed4] bg-white px-2 py-1 rounded">
                RID
              </span>
            </div>
            <p className="text-white max-w-md mb-6">
              Streamlining infrastructure with intelligent automation and
              effortless environment provisioning. Built by JIT Global Info
              Systems to power modern DevOps teams.
            </p>
            <div className="flex space-x-4">
              {/* Social icons (optional, currently commented out) */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              {/* <li>
                <a
                  href="#products"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Products
                </a>
              </li> */}
              <li>
                <a
                  href="#contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-400 text-sm">
                  2/181, AGS Colony, Phase – 3, 1st floor, 4th Avenue,
                  Mugalivakkam, Chennai - 600125
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+917810099942"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  +91 78100 99942
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:sales@jitglobalinfosystems.com"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  sales@jitglobalinfosystems.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a
                  href="https://jitglobalinfosystems.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  jitglobalinfosystems.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; {currentYear} JIT Global Info Systems Pvt Limited. All
              Rights Reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
