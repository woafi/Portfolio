"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

function Photo() {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const intro = { opacity: 0 };
  const introShow = {
    opacity: 1,
    transition: { duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="relative h-[298px] w-[298px] lg:h-[398px] lg:w-[398px]">
      <motion.div
        initial={intro}
        animate={introShow}
        className="relative h-full w-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-secondary)]/25 via-transparent to-[var(--accent)]/20 blur-2xl" />
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
          }}
          className="glow-ring absolute left-1/2 top-1/2 z-0 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.4, delay: 0.28, ease: "easeOut" },
          }}
          className="absolute left-1/2 top-1/2 z-0 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/10 bg-[var(--bg-elevated)] shadow-inner"
        >
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 to-transparent" />
          )}
          <Image
            src="/photo.jpg"
            priority
            quality={100}
            fill
            alt="Profile photo"
            className={`object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 200px, 498px"
            onLoadingComplete={() => setLoaded(true)}
          />
        </motion.div>

        <motion.svg
          className="absolute left-1/2 top-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-secondary)" />
              <stop offset="55%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-tertiary)" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="url(#ringGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={
              reduce
                ? { strokeDasharray: "4 250 22 22", rotate: 0 }
                : {
                    strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                    rotate: [120, 360],
                  }
            }
            transition={
              reduce
                ? { duration: 0.01 }
                : {
                    duration: 20,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }
            }
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

export default Photo;
