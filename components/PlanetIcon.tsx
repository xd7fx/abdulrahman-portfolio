"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PlanetIconProps {
  planet: "terran" | "lava" | "ice" | "black_hole" | "baren";
  size?: number;
  className?: string;
}

const planetImages = {
  terran: "/planets/Terran.png",
  lava: "/planets/Lava.png",
  ice: "/planets/Ice.png",
  black_hole: "/planets/Black_hole.png",
  baren: "/planets/Baren.png",
};

export default function PlanetIcon({ planet, size = 40, className = "" }: PlanetIconProps) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.2, rotate: 360 }}
      transition={{ duration: 0.6 }}
      style={{
        filter: "drop-shadow(0 0 8px rgba(0, 191, 255, 0.6))",
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
  );
}
