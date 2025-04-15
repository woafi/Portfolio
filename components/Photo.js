"use client";
import { motion } from "framer-motion";
import Image from "next/image";

function Photo() {
  return (
    <div className="relative w-[298px] h-[298px] lg:w-[398px] lg:h-[398px]"> {/* Outer container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.4, delay: 2, ease: "easeIn" },
        }}
        className="w-full h-full relative"
      >
        {/* Image container - now smaller with centered positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.4, delay: 2.4, ease: "easeInOut" }
          }}
          className="rounded-full w-[90%] h-[90%] overflow-hidden mix-blend-lighten absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
        >
          <Image
            src=""
            priority
            quality={100}
            fill
            alt="Profile photo"
            className="object-cover w-full h-full" // Changed to cover for better scaling
            sizes="(max-width: 768px) 200px, 498px"
          />
        </motion.div>

        {/* SVG Circle - positioned around the smaller image */}
        <motion.svg 
          className="absolute top-1/2 left-1/2 w-[100%] h-[100%] transform -translate-x-1/2 -translate-y-1/2 z-10" 
          fill="transparent" 
          viewBox="0 0 506 506" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle 
            cx="253" 
            cy="253" 
            r="250" 
            stroke="#00ff99" 
            strokeWidth="5" 
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}

export default Photo