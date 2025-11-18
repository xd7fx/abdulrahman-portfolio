"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Zap } from "lucide-react";
import Image from "next/image";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const getProjects = (t: (key: string) => string) => [
  {
    title: t("yamamahTitle"),
    titleEn: "YAMAMAH Rescue Drone",
    emoji: "🚁",
    description: t("yamamahDesc"),
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
    tech: ["GPT-4 Vision", "n8n", "Raspberry Pi", "mmWave", "Weather AI", "Autonomous Control"],
    achievements: [
      t("yamamahAch1"),
      t("yamamahAch2"),
      t("yamamahAch3"),
      t("yamamahAch4"),
    ],
    github: "https://github.com/Rakan2008/yamama-rescue-drone",
    color: "from-space-cyan to-space-blue",
    logo: "/logos/yamama-logo.png",
    logoAlt: "YAMAMAH",
    logoSize: "w-25 h-9",
  },
  {
    title: t("footballTitle"),
    titleEn: "V-TAC — Tactical AI Coach",
    emoji: "⚽",
    description: t("footballDesc"),
    image: "/projects/vtac-main.jpg",
    tech: ["AutoGluon", "Streamlit", "Whisper", "Python", "ML Prediction", "Data Analytics"],
    achievements: [
      t("footballAch1"),
      t("footballAch2"),
      t("footballAch3"),
      t("footballAch4"),
    ],
    github: "https://github.com/xd7fx/V-TAC",
    demo: "#",
    color: "from-space-lava to-orange-600",
    logo: "/logos/sda-logo.png",
    logoAlt: "Saudi Digital Academy",
    logoSize: "w-15 h-12",
  },
  {
    title: t("heritageTitle"),
    titleEn: "Hekaya — Heritage Intelligence",
    emoji: "🕌",
    description: t("heritageDesc"),
    image: "/projects/hekaya-main.jpg",
    tech: ["YOLOv8", "Google Gemini", "LangChain", "Computer Vision", "Streamlit", "Cultural AI"],
    achievements: [
      t("heritageAch1"),
      t("heritageAch2"),
      t("heritageAch3"),
      t("heritageAch4"),
    ],
    github: "https://github.com/xd7fx/Hekaya",
    color: "from-purple-600 to-space-blue",
    logo: "/logos/sda-logo.png",
    logoAlt: "Saudi Digital Academy",
    logoSize: "w-20 h-12",
  },
  {
    title: t("selfDrivingTitle"),
    titleEn: "Self-Driving Car Using CV, ROS, and Jetson Nano",
    emoji: "🚗",
    description: t("selfDrivingDesc"),
    image: "/projects/self-driving.jpg",
    tech: ["OpenCV", "ROS", "Jetson Nano", "Computer Vision", "Arduino", "Python"],
    achievements: [
      t("selfDrivingAch1"),
      t("selfDrivingAch2"),
      t("selfDrivingAch3"),
      t("selfDrivingAch4"),
    ],
    github: "https://github.com/xd7fx/Self-Driving-Car-with-CV-and-Arduino",
    color: "from-green-500 to-teal-600",
  },
  {
    title: t("weatherIoTTitle"),
    titleEn: "IoT Weather Monitoring & Analytics System",
    emoji: "🌤️",
    description: t("weatherIoTDesc"),
    image: "/projects/weather-iot.jpg",
    tech: ["ESP32", "IoT", "ThingSpeak", "DHT Sensor", "AI Analytics", "Cloud Computing"],
    achievements: [
      t("weatherIoTAch1"),
      t("weatherIoTAch2"),
      t("weatherIoTAch3"),
      t("weatherIoTAch4"),
    ],
    demo: "https://lnkd.in/exKUhgUb",
    color: "from-sky-400 to-blue-600",
  },
  {
    title: t("mostadaamTitle"),
    titleEn: "Mostadaam: Sustainable Waste-to-Rewards Platform",
    emoji: "♻️",
    description: t("mostadaamDesc"),
    image: "/projects/mostadaam.jpg",
    tech: ["UI/UX Design", "Facial Recognition", "Barcode Scanning", "Nusuk Integration", "Figma", "Sustainability"],
    achievements: [
      t("mostadaamAch1"),
      t("mostadaamAch2"),
      t("mostadaamAch3"),
      t("mostadaamAch4"),
    ],
    demo: "https://www.figma.com/proto/AzwYCsQrkIerJjxhtHAAV4/مستدام?node-id=14-13&p=f&t=riyqkL2c9Cp1Jpt7-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    color: "from-green-400 to-emerald-600",
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const projects = getProjects(t);
  
  return (
    <section id="projects" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="black_hole" size={500} position="left" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader 
          title={t("projectsTitle")} 
          subtitle={t("projectsSubtitle")}
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glow group relative overflow-hidden"
              >
                {/* Project Image */}
                {project.image && (
                  <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40`} />
                    <div className="absolute top-2 right-2 text-3xl drop-shadow-2xl">
                      {project.emoji}
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-orbitron font-bold">{project.title}</h3>
                    {project.logo && (
                      <div className={`bg-white/90 rounded-lg p-0.5 backdrop-blur-sm ${project.logoSize || 'w-16 h-6'}`}>
                        <Image
                          src={project.logo}
                          alt={project.logoAlt || "Organization"}
                          width={80}
                          height={30}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-space-ice/80 mb-3 leading-relaxed text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4 space-y-2">
                    {project.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="text-sm text-space-cyan flex items-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-space-cyan" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-space-blue/30 border border-space-cyan/30 text-space-ice"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-space-navy/50 hover:bg-space-navy transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-space-cyan/20 hover:bg-space-cyan/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
