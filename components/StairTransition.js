'use client';
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { stairTransitionDuration } from "@/lib/transitionTiming";
import Stairs from "./Stairs";

function StairTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) {
    return null;
  }

  return (
    <AnimatePresence mode="wait" initial={false} propagate>
      <motion.div
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 flex h-screen w-screen overflow-hidden"
        initial="initial"
        animate="animate"
        exit={{
          opacity: [1, 1],
          transition: { duration: stairTransitionDuration },
        }}
        style={{ contain: "layout paint" }}
      >
        <Stairs />
      </motion.div>
    </AnimatePresence>
  );
}

export default StairTransition;
