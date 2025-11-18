"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const navigationPlanets = [
  {
    id: "home",
    name: "Home",
    planet: "/planets/Terran.png",
    href: "#home",
    position: { top: "10%", left: "50%" },
    size: 80,
  },
  {
    id: "about",
    name: "About",
    planet: "/planets/Ice.png",
    href: "#about",
    position: { top: "25%", left: "20%" },
    size: 70,
  },
  {
    id: "projects",
    name: "Projects",
    planet: "/planets/Black_hole.png",
    href: "#projects",
    position: { top: "45%", left: "70%" },
    size: 90,
  },
  {
    id: "achievements",
    name: "Achievements",
    planet: "/planets/Lava.png",
    href: "#achievements",
    position: { top: "65%", left: "30%" },
    size: 75,
  },
  {
    id: "certificates",
    name: "Certificates",
    planet: "/planets/Ice.png",
    href: "#certificates",
    position: { top: "80%", left: "60%" },
    size: 65,
  },
  {
    id: "contact",
    name: "Contact",
    planet: "/planets/Baren.png",
    href: "#contact",
    position: { top: "90%", left: "40%" },
    size: 60,
  },
];

export default function SpaceNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-space-cyan to-space-blue shadow-lg shadow-space-cyan/50 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-3xl">🚀</span>
        </motion.div>
      </motion.button>

      {/* Space Navigation Overlay */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="absolute inset-0 bg-space-dark/95 backdrop-blur-md pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Title */}
            <motion.div
              className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-orbitron font-bold glow-text mb-2">
                Navigate The Galaxy
              </h2>
              <p className="text-space-ice/70">Click on a planet to travel</p>
            </motion.div>

            {/* Planets Navigation */}
            <div className="absolute inset-0 pointer-events-none">
              {navigationPlanets.map((planet, index) => (
                <motion.a
                  key={planet.id}
                  href={planet.href}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    top: planet.position.top,
                    left: planet.position.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 * index, type: "spring" }}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setHoveredPlanet(planet.id)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  whileHover={{ scale: 1.3 }}
                >
                  {/* Planet Orbit Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-space-cyan/30"
                    style={{
                      width: planet.size + 40,
                      height: planet.size + 40,
                      left: -20,
                      top: -20,
                    }}
                    animate={{
                      rotate: 360,
                      scale: hoveredPlanet === planet.id ? 1.2 : 1,
                    }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 0.3 },
                    }}
                  />

                  {/* Planet Image */}
                  <motion.div
                    animate={{
                      rotate: 360,
                      y: [0, -10, 0],
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    style={{
                      filter: hoveredPlanet === planet.id 
                        ? "drop-shadow(0 0 30px rgba(0, 191, 255, 0.8))"
                        : "drop-shadow(0 0 15px rgba(0, 191, 255, 0.4))",
                    }}
                  >
                    <Image
                      src={planet.planet}
                      alt={planet.name}
                      width={planet.size}
                      height={planet.size}
                      className="pixelated"
                    />
                  </motion.div>

                  {/* Planet Name Label */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: hoveredPlanet === planet.id ? 1 : 0.7,
                      y: hoveredPlanet === planet.id ? 0 : -10,
                    }}
                  >
                    <span className="text-sm font-orbitron font-semibold text-space-cyan">
                      {planet.name}
                    </span>
                  </motion.div>

                  {/* Connection Lines to other planets */}
                  {index < navigationPlanets.length - 1 && (
                    <svg
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      style={{
                        width: "200%",
                        height: "200%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <motion.line
                        x1="50%"
                        y1="50%"
                        x2={`${(parseFloat(navigationPlanets[index + 1].position.left) - parseFloat(planet.position.left)) * 5}%`}
                        y2={`${(parseFloat(navigationPlanets[index + 1].position.top) - parseFloat(planet.position.top)) * 5}%`}
                        stroke="rgba(0, 191, 255, 0.2)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>

            {/* Instructions */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-space-ice/50 text-sm">
                Press ESC or click outside to close
              </p>
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  );
}
