import React from "react";
import { ArrowRight } from "lucide-react";

const Home = ({ onGetStartedClick }) => {
  return (
    <div>
      {/* Hero Section - Centered */}
      <section className="relative bg-gradient-to-br from-[#181ed4] via-[#3a47d5] to-[#6a82fb] text-white py-20 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-1 leading-tight">
            <span className="block">
              Accelerate <span className="text-[#ffd700]">Infrastructure</span>
            </span>
            <span className="block">
              with <span className="text-[#ffd700]">RID</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl">
            A DevOps automation platform for rapid, consistent, and
            cost-effective infrastructure deployment.
          </p>
          <button
            onClick={onGetStartedClick}
            className="inline-flex items-center gap-2 bg-white text-[#181ed4] font-bold py-4 px-10 rounded-xl text-lg shadow-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
