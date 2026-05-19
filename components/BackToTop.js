"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IoArrowUp } from "react-icons/io5";

export default function BackToTop() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    setVisible(window.scrollY > 640);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: reduce ? 0.01 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduce ? undefined : { scale: 1.06, y: -2 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          onClick={scrollUp}
          className="fixed bottom-6 right-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--accent)] shadow-[var(--shadow-glow)] backdrop-blur-md md:bottom-10 md:right-10"
          aria-label="Back to top"
        >
          <IoArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
