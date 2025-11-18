"use client";

import { motion } from "framer-motion";
import { GraduationCap, ExternalLink } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const certificates = [
  {
    title: "Full Stack Robotics Engineer",
    issuer: "TVTC",
    year: "2024",
    description: "Comprehensive robotics engineering program covering design, assembly, ROS, and AI integration",
    color: "from-blue-500 to-cyan-500",
    link: "https://mnar.sa/certification/check/24092168315271812353319",
  },
  {
    title: "Robotics and Artificial Intelligence",
    issuer: "Smart Methods",
    year: "2024",
    description: "Advanced training in robotics systems and AI implementation",
    color: "from-purple-500 to-pink-500",
    link: "https://s-m.com.sa/smtc/td/ac/acceptance/robotics.php?email=d7.fx99@gmail.com",
  },
  {
    title: "Data Science and Machine Learning",
    issuer: "TVTC",
    year: "2024",
    description: "Comprehensive data science and machine learning certification",
    color: "from-green-500 to-teal-500",
    link: "https://mnar.sa/certification/check/9LAUNOPDN3LFUD5ITVKD",
  },
  {
    title: "MCIT Jr Data Scientist",
    issuer: "INE",
    year: "2025",
    description: "Ministry of Communications and IT certified data scientist program",
    color: "from-orange-500 to-red-500",
    link: "https://certs.ine.com/37d1b643-875f-4a41-86a7-c4f77e249ac2#acc.pd3njPve",
  },
  {
    title: "Data Science Bootcamp Diploma",
    issuer: "Le Wagon",
    year: "2025",
    description: "Intensive data science bootcamp covering Python, ML, and data analytics",
    color: "from-indigo-500 to-purple-500",
    link: "https://kitt.lewagon.com/schoolings/46132/public_diploma?token=cfe2ed6498504843710745125105efc0c3bf9758b6301f006ba76a9cc59929d3",
  },
  {
    title: "Data Science 2025 Q1",
    issuer: "Saudi Digital Academy",
    year: "2025",
    description: "Advanced data science program with hands-on projects and industry applications",
    color: "from-yellow-500 to-orange-500",
    link: "https://eu.credential.net/e970b79d-c2b2-4e98-b3ff-4c87408b01c2#acc.17ZyzK3x",
  },
];

export default function Certificates() {
  const { t } = useLanguage();
  
  return (
    <section id="certificates" className="py-12 relative overflow-hidden">
      <SectionPlanet planet="ice" size={460} position="left" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          title={t("certificatesTitle")} 
          subtitle={t("certificatesSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-lg text-space-ice/80 max-w-3xl mx-auto">
              {t("continuousLearning")}
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card-glow group relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <GraduationCap className="w-10 h-10 text-space-cyan" />
                    <span className="text-xs font-orbitron font-semibold text-space-cyan/70">
                      {cert.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-orbitron font-bold mb-2 group-hover:text-space-cyan transition-colors">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-space-cyan text-sm font-semibold mb-2">
                    {cert.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-space-ice/70 text-sm mb-4">
                    {cert.description}
                  </p>

                  {/* View Link */}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        className="flex items-center space-x-2 text-sm text-space-cyan hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span>{t("viewCertificate")}</span>
                        <ExternalLink size={14} />
                      </motion.button>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: t("totalCertificates"), value: "30+", emoji: "📜" },
              { label: t("institutions"), value: "10+", emoji: "🏛️" },
              { label: t("trainingHours"), value: "600+", emoji: "⏱️" },
              { label: t("specializations"), value: "8", emoji: "🎯" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-glow text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-2xl font-orbitron font-bold text-space-cyan mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-space-ice/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
