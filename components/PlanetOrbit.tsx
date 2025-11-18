"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Planet {
  name: string;
  image: string;
  size: number;
  orbitRadius: number;
  duration: number;
  delay: number;
}

const planets: Planet[] = [
  {
    name: "Terran",
    image: "/planets/Terran.png",
    size: 60,
    orbitRadius: 150,
    duration: 20,
    delay: 0,
  },
  {
    name: "Lava",
    image: "/planets/Lava.png",
    size: 50,
    orbitRadius: 200,
    duration: 25,
    delay: 5,
  },
  {
    name: "Ice",
    image: "/planets/Ice.png",
    size: 55,
    orbitRadius: 250,
    duration: 30,
    delay: 10,
  },
  {
    name: "Black Hole",
    image: "/planets/Black_hole.png",
    size: 70,
    orbitRadius: 300,
    duration: 35,
    delay: 15,
  },
  {
    name: "Baren",
    image: "/planets/Baren.png",
    size: 45,
    orbitRadius: 180,
    duration: 22,
    delay: 8,
  },
];

export default function PlanetOrbit() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {planets.map((planet) => (
        <motion.div
          key={planet.name}
          className="absolute top-1/2 left-1/2"
          style={{
            width: planet.size,
            height: planet.size,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: planet.duration,
            repeat: Infinity,
            ease: "linear",
            delay: planet.delay,
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              left: planet.orbitRadius,
              top: -planet.size / 2,
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: planet.duration,
              repeat: Infinity,
              ease: "linear",
              delay: planet.delay,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.3 }}
              className="relative cursor-pointer"
              style={{
                width: planet.size,
                height: planet.size,
                filter: "drop-shadow(0 0 10px rgba(0, 191, 255, 0.5))",
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
        </motion.div>
      ))}
    </div>
  );
}
