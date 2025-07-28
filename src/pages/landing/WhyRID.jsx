import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Shield,
  Zap,
  ServerCog,
  FileStack,
  Settings2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const WhyRID = ({ onGetStartedClick }) => {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Rapid Deployment",
      description:
        "Automate time-consuming infra tasks like EC2 provisioning and network setup.",
      stat: "70% faster setup",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Reliable & Consistent",
      description:
        "Avoid manual errors with reusable templates and predictable workflows.",
      stat: "100% reproducibility",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Cost Efficient",
      description:
        "Smart lifecycle management like EC2 start/stop scheduling reduces waste.",
      stat: "30% cost savings",
    },
    {
      icon: <ServerCog className="h-8 w-8" />,
      title: "Infra as Code",
      description:
        "Manage complex configurations with tools like Terraform and Ansible.",
      stat: "Fully codified setup",
    },
  ];

  const features = [
    {
      category: "Automation & Provisioning",
      items: [
        "EC2 provisioning with disk mount",
        "Security group & VPC configuration",
        "Start/stop scheduling for EC2",
        "Custom network setup (subnets, routing)",
      ],
    },
    {
      category: "Templates & Reusability",
      items: [
        "Reusable Terraform modules",
        "Config-driven deployment",
        "Infra blueprint standardization",
        "Rollback-safe infrastructure changes",
      ],
    },
    {
      category: "Observability & Control",
      items: [
        "Audit-friendly logging",
        "Scripted repeatable deployments",
        "Dashboards for job visibility",
        "Alerts & notifications",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      {/* <section className="relative bg-gradient-to-br from-[#181ed4] via-[#3a47d5] to-[#6a82fb] text-white py-24 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Why Choose <span className="text-[#ffd700]">RID?</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl">
            Automate your cloud infrastructure with speed, consistency, and
            reliability using RID — the DevOps platform that scales with you.
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
       */}

      {/* Benefits */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for DevOps Efficiency
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              RID eliminates manual overhead and enforces infrastructure best
              practices across environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-[#0026c0] w-16 h-16 rounded-full flex items-center justify-center text-white mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="text-2xl font-bold text-[#0026c0]">
                  {benefit.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-1 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What RID Automates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              From provisioning to teardown — RID handles the heavy lifting for
              your infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {feature.category}
                </h3>
                <ul className="space-y-4">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {/* <section className="py-20 bg-[#0026c0] text-white">
        <div className="px-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Automate Your Infrastructure?
            </h2>
            <p className="text-xl mb-8 max-w-2xl text-white/90">
              Get started with RID and eliminate the hassle of repetitive cloud
              infrastructure tasks.
            </p>
            <button
              onClick={onGetStartedClick}
              className="inline-flex items-center gap-2 bg-white text-[#181ed4] font-bold py-4 px-10 rounded-xl text-lg shadow-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300"
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

export default WhyRID;
