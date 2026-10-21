"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Planet {
  id: string;
  nameKey: string;
  descKey: string;
  image: string;
  color: string;
  section: string;
}

const planetsData: Planet[] = [
  {
    id: "terran",
    nameKey: "terranStation",
    descKey: "homeBase",
    image: "/planets/Terran.png",
    color: "from-blue-500 to-cyan-500",
    section: "home",
  },
  {
    id: "ice",
    nameKey: "iceWorld",
    descKey: "aboutSubtitle",
    image: "/planets/Ice.png",
    color: "from-cyan-400 to-blue-300",
    section: "about",
  },
  {
    id: "black_hole",
    nameKey: "darkMatter",
    descKey: "projectsSubtitle",
    image: "/planets/Black_hole.png",
    color: "from-purple-600 to-indigo-900",
    section: "projects",
  },
  {
    id: "lava",
    nameKey: "lavaPlanet",
    descKey: "achievementsSubtitle",
    image: "/planets/Lava.png",
    color: "from-orange-500 to-red-600",
    section: "achievements",
  },
  { id: "mentoring", nameKey: "mentorshipTitle", descKey: "mentorshipSubtitle", image: "/planets/Terran.png", color: "from-space-cyan to-space-blue", section: "mentorship" },
  {
    id: "ice2",
    nameKey: "crystalMoon",
    descKey: "certificatesSubtitle",
    image: "/planets/Ice.png",
    color: "from-blue-300 to-purple-400",
    section: "certificates",
  },
  {
    id: "terran2",
    nameKey: "workStation",
    descKey: "workWithMeSubtitle",
    image: "/planets/Terran.png",
    color: "from-green-500 to-teal-500",
    section: "work",
  },
  {
    id: "baren",
    nameKey: "outpost",
    descKey: "contactSubtitle",
    image: "/planets/Baren.png",
    color: "from-gray-500 to-gray-700",
    section: "contact",
  },
];

export default function PlanetaryNavigation() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const planets = planetsData;
  const [currentPlanet, setCurrentPlanet] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateToPlanet = useCallback((index: number) => {
    if (index === currentPlanet || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPlanet(index);
    const section = document.getElementById(planets[index].section);
    if (section) section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [currentPlanet, isTransitioning, planets, reduceMotion]);

  const nextPlanet = useCallback(() => {
    navigateToPlanet((currentPlanet + 1) % planets.length);
  }, [currentPlanet, navigateToPlanet, planets.length]);

  const prevPlanet = useCallback(() => {
    navigateToPlanet((currentPlanet - 1 + planets.length) % planets.length);
  }, [currentPlanet, navigateToPlanet, planets.length]);

  // Auto-detect current section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning) return;
      
      const sections = planets.map(p => document.getElementById(p.section));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentPlanet(i);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransitioning, planets]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.defaultPrevented || !e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target;
      if (target instanceof HTMLElement && target.closest('input, textarea, select, button, a, [contenteditable], [role="combobox"], [role="listbox"]')) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextPlanet();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevPlanet();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextPlanet, prevPlanet]);

  return (
    <>
      {/* Desktop Navigation - Right Side */}
      <div className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center space-y-4">
        {/* Planet Navigator */}
        <div className="relative group">
          {/* Current Planet Display */}
          <motion.div
            className="relative w-24 h-24 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-space-cyan/20 to-space-blue/20 blur-xl" />
            <Image
              src={planetsData[currentPlanet].image}
              alt={t(planetsData[currentPlanet].nameKey)}
              width={96}
              height={96}
              className="pixelated relative z-10"
              style={{
                filter: "drop-shadow(0 0 20px rgba(0, 191, 255, 0.6))",
              }}
            />
          </motion.div>

          {/* Planet Info */}
          <motion.div
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-space-navy/90 backdrop-blur-md rounded-lg p-3 border border-space-cyan/30 w-52 pointer-events-none !opacity-0 group-hover:!opacity-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={currentPlanet}
          >
            <h3 className="font-orbitron font-bold text-space-cyan text-sm mb-1">
              {t(planetsData[currentPlanet].nameKey)}
            </h3>
            <p className="text-xs text-space-ice/70">
              {t(planetsData[currentPlanet].descKey)}
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-space-cyan animate-pulse" />
              <span className="text-xs text-space-cyan">
                {currentPlanet + 1} / {planetsData.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex flex-col space-y-2">
          <motion.button
            aria-label={t("previousSection")}
            onClick={prevPlanet}
            className="w-10 h-10 rounded-full bg-space-navy/80 backdrop-blur-sm border border-space-cyan/30 flex items-center justify-center hover:bg-space-cyan/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-space-cyan">↑</span>
          </motion.button>
          <motion.button
            aria-label={t("nextSection")}
            onClick={nextPlanet}
            className="w-10 h-10 rounded-full bg-space-navy/80 backdrop-blur-sm border border-space-cyan/30 flex items-center justify-center hover:bg-space-cyan/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-space-cyan">↓</span>
          </motion.button>
        </div>

        {/* All Planets Mini Map */}
        <div className="flex flex-col space-y-2 mt-4 p-2 bg-space-navy/60 backdrop-blur-sm rounded-lg border border-space-cyan/20">
          {planetsData.map((planet, index) => (
            <motion.button
              key={planet.id}
              aria-label={t(planet.nameKey)}
              onClick={() => navigateToPlanet(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                currentPlanet === index
                  ? "ring-2 ring-space-cyan ring-offset-2 ring-offset-space-dark"
                  : "opacity-50 hover:opacity-100"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src={planet.image}
                alt={t(planet.nameKey)}
                width={32}
                height={32}
                className="pixelated"
              />
            </motion.button>
          ))}
        </div>

        {/* Keyboard Hint */}
        <motion.div
          className="text-xs text-space-ice/50 text-center mt-2 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div>Alt + ↑↓</div>
          <div>{t("navigate")}</div>
        </motion.div>
      </div>

    </>
  );
}
