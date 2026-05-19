"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransitionTiming, transitionEase } from "@/lib/transitionTiming";

function PageTransition({ children }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: reduce ? 0 : pageTransitionTiming.enterDelay,
            duration: reduce ? 0.01 : pageTransitionTiming.enterDuration,
            ease: transitionEase,
          },
        }}
        exit={
          reduce
            ? undefined
            : {
                opacity: 0,
                y: -8,
                transition: {
                  duration: pageTransitionTiming.exitDuration,
                  ease: transitionEase,
                },
              }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
