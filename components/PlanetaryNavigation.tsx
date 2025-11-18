"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Rocket } from "lucide-react";
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
  const planets = planetsData;
  const [currentPlanet, setCurrentPlanet] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateToPlanet = (index: number) => {
    if (index === currentPlanet || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentPlanet(index);
    
    // Scroll to section
    const section = document.getElementById(planets[index].section);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const nextPlanet = () => {
    const next = (currentPlanet + 1) % planets.length;
    navigateToPlanet(next);
  };

  const prevPlanet = () => {
    const prev = (currentPlanet - 1 + planets.length) % planets.length;
    navigateToPlanet(prev);
  };

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
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextPlanet();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevPlanet();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPlanet]);

  return (
    <>
      {/* Desktop Navigation - Right Side */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center space-y-4">
        {/* Planet Navigator */}
        <div className="relative">
          {/* Current Planet Display */}
          <motion.div
            className="relative w-24 h-24 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            animate={{ rotate: 360 }}
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
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-space-navy/90 backdrop-blur-md rounded-lg p-3 border border-space-cyan/30 min-w-[200px]"
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
            onClick={prevPlanet}
            className="w-10 h-10 rounded-full bg-space-navy/80 backdrop-blur-sm border border-space-cyan/30 flex items-center justify-center hover:bg-space-cyan/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-space-cyan">↑</span>
          </motion.button>
          <motion.button
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
          <div>↑↓</div>
          <div>{t("navigate")}</div>
        </motion.div>
      </div>

      {/* Mobile Navigation - Bottom Horizontal */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 z-[90] px-2">
        <div className="bg-space-navy/90 backdrop-blur-md rounded-full p-2 border border-space-cyan/30 flex items-center justify-between gap-2 max-w-sm mx-auto">
          {/* Previous Button */}
          <motion.button
            onClick={prevPlanet}
            className="w-8 h-8 rounded-full bg-space-navy/80 border border-space-cyan/30 flex items-center justify-center flex-shrink-0"
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-space-cyan text-sm">←</span>
          </motion.button>

          {/* All Planets Horizontal */}
          <div className="flex items-center gap-1 flex-1 justify-center">
            {planetsData.map((planet, index) => (
              <motion.button
                key={planet.id}
                onClick={() => navigateToPlanet(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  currentPlanet === index
                    ? "ring-2 ring-space-cyan"
                    : "opacity-40"
                }`}
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

          {/* Next Button */}
          <motion.button
            onClick={nextPlanet}
            className="w-8 h-8 rounded-full bg-space-navy/80 border border-space-cyan/30 flex items-center justify-center flex-shrink-0"
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-space-cyan text-sm">→</span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
