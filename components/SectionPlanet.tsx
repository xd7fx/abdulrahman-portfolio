"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SectionPlanetProps {
  planet: "terran" | "lava" | "ice" | "black_hole" | "baren";
  size?: number;
  position?: "left" | "right" | "center";
}

const planetImages = {
  terran: "/planets/Terran.png",
  lava: "/planets/Lava.png",
  ice: "/planets/Ice.png",
  black_hole: "/planets/Black_hole.png",
  baren: "/planets/Baren.png",
};

export default function SectionPlanet({ 
  planet, 
  size = 400, 
  position = "right" 
}: SectionPlanetProps) {
  
  const positionClasses = {
    right: "right-[-10%] md:right-[-5%]",
    left: "left-[-10%] md:left-[-5%]",
    center: "left-1/2 -translate-x-1/2"
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} top-1/2 -translate-y-1/2 pointer-events-none opacity-20 z-0`}
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      whileInView={{ opacity: 0.2, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: 360,
        }}
        transition={{
          y: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }
        }}
        style={{
          filter: "drop-shadow(0 0 50px rgba(0, 191, 255, 0.3))",
        }}
      >
        <Image
          src={planetImages[planet]}
          alt={planet}
          width={size}
          height={size}
          className="pixelated"
        />
      </motion.div>
    </motion.div>
  );
}
