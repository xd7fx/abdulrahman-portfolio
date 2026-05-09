"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SectionPlanetProps {
  planet: "terran" | "lava" | "ice" | "black_hole" | "baren";
  size?: number;
  position?: "left" | "right" | "center";
  /**
   * Vertical anchor for the planet. Defaults to "center" (the planet is
   * vertically centered in the section). Use "top" / "bottom" when the
   * section is short enough that the centered planet gets clipped — this
   * lifts or lowers it so the visible portion sits cleanly inside the
   * section's bounds.
   */
  verticalAlign?: "top" | "center" | "bottom";
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
  position = "right",
  verticalAlign = "center",
}: SectionPlanetProps) {

  const positionClasses = {
    right: "right-[-20%] md:right-[-5%]",
    left: "left-[-20%] md:left-[-5%]",
    center: "left-1/2 -translate-x-1/2"
  };

  const verticalClasses = {
    top: "top-[15%] -translate-y-1/2",
    center: "top-1/2 -translate-y-1/2",
    bottom: "top-[85%] -translate-y-1/2",
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} ${verticalClasses[verticalAlign]} pointer-events-none opacity-20 z-0`}
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
