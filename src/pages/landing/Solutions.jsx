import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  BarChart3,
  Search,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

const Solutions = ({ onGetStartedClick }) => {
  const solutions = [
    {
      id: "devops-teams",
      icon: <Users className="h-12 w-12" />,
      title: "For DevOps Teams",
      description:
        "Automate your infrastructure workflows with tools built to accelerate delivery and reduce manual effort.",
      features: [
        "Centralized Configuration Management",
        "Automated Provisioning & Scaling",
        "Multi-Cloud Compatibility",
        "Role-based Access Controls",
        "Version-controlled Infrastructure",
        "Monitoring & Alert Integration",
      ],
    },
    {
      id: "management",
      icon: <Building className="h-12 w-12" />,
      title: "For Management",
      description:
        "Gain full visibility into your infrastructure with detailed reporting, cost tracking, and performance analytics.",
      features: [
        "Real-time Usage Dashboards",
        "Infrastructure Cost Optimization",
        "Compliance & Audit Reporting",
        "Team Productivity Metrics",
        "Forecasting & Resource Planning",
        "Executive Reports",
      ],
    },
    {
      id: "developers",
      icon: <Search className="h-12 w-12" />,
      title: "For Developers",
      description:
        "Empower engineers to deploy and manage environments with ease through self-service tools and automation.",
      features: [
        "Self-service Environment Provisioning",
        "Pre-approved Infrastructure Templates",
        "Automated Testing Pipelines",
        "Live Deployment Previews",
        "CLI & UI Access Options",
        "Feedback & Approval Flows",
      ],
    },
  ];

  const processes = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Define Infrastructure",
      description: "Use Terraform and Ansible to codify configurations",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Validate & Review",
      description: "Run automated checks and policy validations",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Provision Resources",
      description: "Deploy across environments with scheduling and tracking",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Monitor Usage",
      description: "Track performance, costs, and uptime metrics",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Optimize & Scale",
      description: "Continuously tune and scale resources as needed",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-br from-[#181ed4] via-[#3a47d5] to-[#6a82fb] text-white min-h-[60vh] py-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="block">
              Solutions for Every <span className="text-[#ffd700]">Team</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl">
            RID delivers tailored solutions for DevOps, developers, and
            management—simplifying infrastructure at scale.
          </p>
          <button
            onClick={onGetStartedClick}
            className="inline-flex items-center gap-2 bg-white text-[#181ed4] font-bold py-4 px-10 rounded-xl text-lg shadow-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section> */}

      {/* Solutions Grid */}
      <section className="py-5 pb-0 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              RID is designed to empower every stakeholder in the infrastructure
              lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-[#0026c0] p-8 text-white">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{solution.title}</h3>
                  <p className="text-white/90">{solution.description}</p>
                </div>

                <div className="p-8">
                  <ul className="space-y-4">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simplified Infrastructure Delivery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              RID walks you through each step—from defining infrastructure to
              managing costs—with automation at the core.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processes.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-[#0026c0] w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {process.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* CTA */}
      {/* <section className="pt-6 pb-6 bg-[#0026c0] text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Automate Your Infrastructure?
            </h2>

            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Discover how RID can streamline your DevOps processes and cut down
              provisioning time drastically.
            </p>
            <button
              onClick={onGetStartedClick}
              className="inline-flex items-center gap-2 bg-white text-[#181ed4] font-bold py-4 px-10 rounded-xl text-lg shadow-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300 mb-0"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default Solutions;
