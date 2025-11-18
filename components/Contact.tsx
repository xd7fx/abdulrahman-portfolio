"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { useState } from "react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="baren" size={420} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader 
          title={t("contactTitle")} 
          subtitle={t("contactSubtitle")}
        />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-lg text-space-ice/80 max-w-2xl mx-auto">
              {t("contactDescription")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="card-glow">
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-space-cyan">
                  {t("contactInfo")}
                </h3>

                <div className="space-y-4">
                  {/* Email */}
                  <motion.a
                    href="mailto:abdulrahman.alnashri9@gmail.com"
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-space-navy/30 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-space-cyan/20 flex items-center justify-center group-hover:bg-space-cyan/30 transition-colors">
                      <Mail className="w-6 h-6 text-space-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-space-ice/70">{t("email")}</p>
                      <p className="font-semibold">abdulrahman.alnashri9@gmail.com</p>
                    </div>
                  </motion.a>

                  {/* Location */}
                  <motion.div
                    className="flex items-center space-x-4 p-4 rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-space-cyan/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-space-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-space-ice/70">{t("location")}</p>
                      <p className="font-semibold">{t("saudiArabia")}</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card-glow">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-space-cyan">
                  {t("connectWithMe")}
                </h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/XD7FX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-space-navy/50 flex items-center justify-center hover:bg-space-cyan/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/abdulrahman-alnashri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-space-navy/50 flex items-center justify-center hover:bg-space-cyan/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="card-glow">
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-space-cyan">
                  {t("sendMessage")}
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-space-navy/50 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus:ring-2 focus:ring-space-cyan/50 transition-all"
                      placeholder={t("yourName")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-space-navy/50 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus:ring-2 focus:ring-space-cyan/50 transition-all"
                      placeholder={t("yourEmail")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t("message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-space-navy/50 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus:ring-2 focus:ring-space-cyan/50 transition-all resize-none"
                      placeholder={t("yourMessage")}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={18} />
                    <span>{t("send")}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
