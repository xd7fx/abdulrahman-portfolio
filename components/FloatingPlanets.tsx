"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const planets = [
  {
    name: "Terran",
    image: "/planets/Terran.png",
    size: 150,
    position: { top: "10%", right: "5%" },
    rotation: 20,
  },
  {
    name: "Lava",
    image: "/planets/Lava.png",
    size: 180,
    position: { top: "30%", left: "3%" },
    rotation: 25,
  },
  {
    name: "Ice",
    image: "/planets/Ice.png",
    size: 160,
    position: { top: "50%", right: "8%" },
    rotation: 30,
  },
  {
    name: "Black Hole",
    image: "/planets/Black_hole.png",
    size: 200,
    position: { top: "70%", left: "5%" },
    rotation: 35,
  },
  {
    name: "Baren",
    image: "/planets/Baren.png",
    size: 140,
    position: { top: "85%", right: "10%" },
    rotation: 22,
  },
];

export default function FloatingPlanets() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {planets.map((planet, index) => (
        <motion.div
          key={planet.name}
          className="absolute"
          style={{
            ...planet.position,
            width: planet.size,
            height: planet.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.8, delay: index * 0.2 },
            scale: { duration: 0.8, delay: index * 0.2 },
          }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: 360,
            }}
            transition={{
              y: {
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: planet.rotation,
                repeat: Infinity,
                ease: "linear",
              }
            }}
            style={{
              filter: "drop-shadow(0 0 20px rgba(0, 191, 255, 0.4))",
            }}
          >
            <Image
              src={planet.image}
              alt={planet.name}
              width={planet.size}
              height={planet.size}
              className="pixelated"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
