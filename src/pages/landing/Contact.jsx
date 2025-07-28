import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const Contact = ({ onGetStartedClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", company: "", message: "" });
    setSent(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+91 78100 99942",
      href: "tel:+917810099942",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "sales@jitglobalinfosystems.com",
      href: "mailto:sales@jitglobalinfosystems.com",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      content:
        "2/181, AGS Colony, Phase – 3, 1st floor, 4th Avenue, Mugalivakkam, Chennai - 600125",
      href: "https://maps.google.com/?q=2/181, AGS Colony, Phase – 3, 1st floor, 4th Avenue, Mugalivakkam, Chennai - 600125",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM IST",
      href: null,
    },
  ];

  const faqs = [
    {
      question: "How long does it take to deploy infrastructure using RID?",
      answer:
        "With RID, deployments can be completed in minutes instead of days, depending on the complexity and scale of your infrastructure.",
    },
    {
      question: "Is RID suitable for both small teams and large enterprises?",
      answer:
        "Yes, RID is designed to scale seamlessly—whether you're a startup managing a few services or an enterprise deploying across multiple regions.",
    },
    {
      question: "What kind of infrastructure can RID automate?",
      answer:
        "RID supports provisioning and managing cloud infrastructure including compute, storage, networking, and more using Terraform and Ansible.",
    },
    {
      question: "Do you offer onboarding or technical support?",
      answer:
        "Absolutely! We offer hands-on onboarding, detailed documentation, and technical support to ensure smooth adoption of RID.",
    },
  ];

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => setSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#181ed4] via-[#3a47d5] to-[#6a82fb] text-white min-h-[30vh] overflow-hidden pt-10">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none "></div>
        <div className="relative z-10 max-w-4xl px-6 mt-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6  leading-tight">
            <span className="block">
              Get in <span className="text-[#ffd700]">Touch</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl">
            Ready to streamline your infrastructure? Let’s discuss how RID can
            help your organization deploy faster, smarter, and with zero manual
            hassle.
          </p>
          {/* <button
            onClick={onGetStartedClick}
            className="inline-flex items-center gap-2 bg-white text-[#181ed4] font-bold py-4 px-10 rounded-xl text-lg shadow-lg hover:bg-[#181ed4] hover:text-white transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button> */}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Success Message Animation */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={sent ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
              style={{ pointerEvents: "none", minHeight: sent ? 48 : 0 }}
            >
              {sent && (
                <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-xl shadow flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Message sent successfully!
                </div>
              )}
            </motion.div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  We're here to help you succeed. Reach out to us through any of
                  these channels.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg flex items-start space-x-4"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600">
              We'd love to meet you in person. Find us at our Chennai office.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            // className="bg-white rounded-2xl p-8 shadow-lg"// makes map bigger
            className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"
          >
            {/* <div className="aspect-video rounded-lg overflow-hidden"> */}
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full border-0"
                src="//www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62196.768313956745!2d80.10512322578349!3d13.01668419934817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260f659e58a4d%3A0xcec861492324f54a!2sChennai%2C%20Tamil%20Nadu%20600116!5e0!3m2!1sen!2sin!4v1753175886554!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get quick answers to common questions about RID and our services.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
