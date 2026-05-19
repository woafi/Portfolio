"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export default function HeroBackground() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const smoothX = useSpring(mx, { stiffness: 90, damping: 28, mass: 0.12 });
  const smoothY = useSpring(my, { stiffness: 90, damping: 28, mass: 0.12 });

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, var(--glow-accent), transparent 62%)`;
  const spotlightCyan = useMotionTemplate`radial-gradient(380px circle at calc(${smoothX}px + 120px) calc(${smoothY}px - 80px), var(--glow-cyan), transparent 55%)`;

  useEffect(() => {
    if (reduce) return;
    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const init = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerenter", init);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerenter", init);
    };
  }, [mx, my, reduce]);

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(ellipse_90%_60%_at_100%_50%,rgba(167,139,250,0.08),transparent_50%),radial-gradient(ellipse_70%_50%_at_0%_80%,rgba(0,255,153,0.06),transparent_45%)]" />
      {!reduce && (
        <>
          <motion.div className="absolute inset-0 opacity-90" style={{ background: spotlight }} />
          <motion.div className="absolute inset-0 opacity-70 mix-blend-screen" style={{ background: spotlightCyan }} />
        </>
      )}
      <div
        className="motion-reduce-hide absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black, transparent)",
        }}
      />
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" />
      <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
    </div>
  );
}
