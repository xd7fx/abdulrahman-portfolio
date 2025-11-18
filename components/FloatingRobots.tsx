"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const robots = [
  {
    id: 1,
    image: "/ArmsUp.png",
    blinkImage: "/ArmsUpBlink.png",
    startY: "15%",
    duration: 35,
    delay: 0,
    size: 70,
  },
  {
    id: 2,
    image: "/ArmsUp.png",
    blinkImage: "/ArmsUpBlink.png",
    startY: "45%",
    duration: 40,
    delay: 25,
    size: 80,
  },
  {
    id: 3,
    image: "/ArmsUp.png",
    blinkImage: "/ArmsUpBlink.png",
    startY: "75%",
    duration: 38,
    delay: 50,
    size: 75,
  },
  {
    id: 4,
    image: "/ArmsUp.png",
    blinkImage: "/ArmsUpBlink.png",
    startY: "30%",
    duration: 42,
    delay: 15,
    size: 65,
  },
  {
    id: 5,
    image: "/ArmsUp.png",
    blinkImage: "/ArmsUpBlink.png",
    startY: "60%",
    duration: 37,
    delay: 40,
    size: 72,
  },
];

function FloatingRobot({ robot }: { robot: typeof robots[0] }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Random blink effect
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: robot.startY,
        left: "-10%",
      }}
      animate={{
        x: ["0vw", "110vw"],
        y: [0, -50, 0, 50, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        x: {
          duration: robot.duration,
          repeat: Infinity,
          ease: "linear",
          delay: robot.delay,
        },
        y: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: "drop-shadow(0 0 15px rgba(0, 191, 255, 0.4))",
        }}
      >
        <Image
          src={isBlinking ? robot.blinkImage : robot.image}
          alt="Flying Robot"
          width={robot.size}
          height={robot.size}
          className="pixelated"
        />
      </motion.div>
    </motion.div>
  );
}

export default function FloatingRobots() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-30">
      {robots.map((robot) => (
        <FloatingRobot key={robot.id} robot={robot} />
      ))}
    </div>
  );
}
