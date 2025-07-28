import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, Globe, Zap, Heart, Target } from "lucide-react";

const AboutUs = ({ onGetStartedClick }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Expert DevOps Team",
      description:
        "Engineers with deep cloud and infrastructure knowledge powering every automation pipeline.",
    },
    {
      icon: Award,
      title: "Consistent Delivery",
      description:
        "RID ensures reproducible, high-quality infrastructure deployments with zero manual drift.",
    },
    {
      icon: Globe,
      title: "Cloud-Agnostic Reach",
      description:
        "Deploy across AWS, GCP, or on-prem seamlessly using a unified infrastructure blueprint.",
    },
    {
      icon: Zap,
      title: "Lightning-Fast Provisioning",
      description:
        "Automate EC2 provisioning, disk setup, networking, and security — all in minutes.",
    },
    {
      icon: Heart,
      title: "Cost Optimization",
      description:
        "Stop unused resources, automate scheduling, and avoid cloud bill surprises.",
    },
    {
      icon: Target,
      title: "Outcome-Focused",
      description:
        "Every script, template, and module in RID is built for business outcomes — not just infra.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#181ed4]">
            Who We Are
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            RID (Rapid Infra Deployment) is a DevOps automation platform focused
            on building scalable, consistent, and cost-efficient infrastructure
            using smart templates and zero-touch provisioning.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 border rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-[#181ed4]/10 text-[#181ed4]">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
