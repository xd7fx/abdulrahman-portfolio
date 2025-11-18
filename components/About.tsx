"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Eye, Zap, Wrench, Database } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const skills = [
  {
    category: "AI & ML",
    icon: <Cpu className="w-6 h-6" />,
    items: ["Python", "AutoGluon", "TensorFlow", "CNN/RNN", "ViT", "YOLOv8", "Statistics", "Time Series"],
  },
  {
    category: "Robotics",
    icon: <Wrench className="w-6 h-6" />,
    items: ["ROS", "Jetson Nano", "Arduino", "Motor Control", "Sensors", "CV Pipelines"],
  },
  {
    category: "Computer Vision",
    icon: <Eye className="w-6 h-6" />,
    items: ["OpenCV", "YOLO", "Object Detection", "Lane Detection", "Emotion Recognition"],
  },
  {
    category: "MLOps & Systems",
    icon: <Zap className="w-6 h-6" />,
    items: ["LangChain", "Whisper", "GPT Integration", "Streamlit", "n8n", "SQL"],
  },
  {
    category: "Development",
    icon: <Code className="w-6 h-6" />,
    items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Git", "Linux"],
  },
  {
    category: "Data Science",
    icon: <Database className="w-6 h-6" />,
    items: ["Pandas", "NumPy", "Power BI", "Jupyter", "Data Analysis", "Optimization"],
  },
];

export default function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="ice" size={450} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader 
          title={t("aboutTitle")} 
          subtitle={t("aboutSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card-glow mb-12"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-space-ice/90 leading-relaxed mb-4">
                {t("aboutBio")}
              </p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-orbitron font-bold text-center mb-8 text-space-cyan">
              {t("technicalArsenalTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  className="card-glow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-space-cyan">{skill.icon}</div>
                    <h4 className="text-xl font-orbitron font-semibold">{skill.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs rounded-full bg-space-blue/30 border border-space-cyan/30 text-space-ice"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Education */}
            <motion.div
              className="card-glow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">🎓</span>
                <h3 className="text-xl font-orbitron font-bold text-space-cyan">
                  {t("educationTitle")}
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-space-ice">{t("bscAI")}</h4>
                  <p className="text-sm text-space-cyan">{t("universityOfJeddah")}</p>
                  <p className="text-xs text-space-ice/70 mt-1">{t("gpa")}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-space-ice">{t("dataBootcamp")}</h4>
                  <p className="text-sm text-space-cyan">{t("leWagonSDA")}</p>
                </div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              className="card-glow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">💼</span>
                <h3 className="text-xl font-orbitron font-bold text-space-cyan">
                  {t("experienceTitle")}
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-space-ice">{t("exp1Title")}</h4>
                  <p className="text-sm text-space-cyan">{t("exp1Company")}</p>
                  <p className="text-xs text-space-ice/70 mt-1">{t("exp1Period")}</p>
                  <p className="text-xs text-space-ice/50">{t("exp1Location")}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-space-ice">{t("exp2Title")}</h4>
                  <p className="text-sm text-space-cyan">{t("exp2Company")}</p>
                  <p className="text-xs text-space-ice/70 mt-1">{t("exp2Period")}</p>
                  <p className="text-xs text-space-ice/50">{t("exp2Location")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: t("bestEngineer2024"),
                subtitle: t("smartMethods"),
                emoji: "🌟",
              },
              {
                title: t("wro2025"),
                subtitle: t("technicalSupervisor"),
                emoji: "🥇",
              },
              {
                title: t("sdaChampion"),
                subtitle: t("weekFive"),
                emoji: "🏆",
              },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="card-glow text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-3">{highlight.emoji}</div>
                <h4 className="text-lg font-orbitron font-semibold text-space-cyan mb-1">
                  {highlight.title}
                </h4>
                <p className="text-sm text-space-ice/70">{highlight.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
