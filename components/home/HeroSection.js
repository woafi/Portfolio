"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import HeroBackground from "@/components/home/HeroBackground";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedName({ text }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className="text-gradient-accent">{text}</span>;
  }
  return (
    <span className="text-gradient-accent inline-flex flex-wrap justify-center gap-y-1 lg:justify-start">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.035, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function ScrollHint() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      className="mt-14 flex flex-col items-center justify-center gap-2 text-[var(--color-muted)] lg:mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      aria-hidden
    >
      <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <HiOutlineChevronDoubleDown className="text-2xl text-[var(--accent)]" />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 420], [0, reduce ? 0 : 55]);

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-85px)]">
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-15%] left-[-8%]  w-[600px] h-[600px] bg-[#00ff99]/[0.035] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-8%] w-[500px] h-[500px] bg-[#00aaff]/[0.03]  rounded-full blur-[100px]" />
        <div className="absolute top-[35%] left-[45%]  w-[320px] h-[320px] bg-[#7c3aed]/[0.03]  rounded-full blur-[90px]" />
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <HeroBackground />
      </div>
      <main className="container relative mx-auto px-5 md:px-0">
        <motion.div style={{ y }} className="will-change-transform">
          <div className="flex flex-col items-center justify-between gap-10 pb-16 pt-6 lg:flex-row lg:gap-6 lg:pb-24 lg:pt-8">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="glass-panel order-2 rounded-3xl px-6 py-8 text-center shadow-[var(--shadow-elevated)] lg:order-none lg:text-left lg:backdrop-blur-xl"
            >
              <motion.h1
                variants={item}
                className="mb-5 text-[42px] font-semibold leading-[1.08] tracking-tight sm:text-[52px] lg:text-[76px] lg:leading-[1.05]"
              >
                Hello I&apos;m
                <br />
                <AnimatedName text="Mohammad Woafi" />
              </motion.h1>
              <motion.p
                variants={item}
                className="mx-auto mb-9 max-w-[520px] text-[15px] leading-relaxed text-[var(--color-muted)] lg:mx-0 lg:text-base"
              >
                A passionate Computer Science and Engineering student with a deep interest in
                building scalable, full-stack web applications and solving complex problems through
                efficient Data Structures and Algorithms.
              </motion.p>
              <motion.div variants={item} className="flex flex-col items-center gap-8 lg:flex-row lg:items-center">
                <a download className="no-underline" href="/WoafiResume.pdf">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group uppercase tracking-[2px] hover:text-[var(--bg)] lg:cursor-pointer"
                  >
                    <span>Download CV</span>
                    <FiDownload className="text-xl transition-transform duration-300 group-hover:translate-y-0.5" />
                  </Button>
                </a>
                <div className="mb-2 lg:mb-0">
                  <Socials
                    containerStyle="flex gap-5"
                    iconStyle="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/60 text-[var(--accent)] shadow-[0_0_24px_rgba(0,255,153,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:shadow-[0_0_32px_rgba(0,255,153,0.35)]"
                  />
                </div>
              </motion.div>
            </motion.div>
            <div className="order-1 mb-2 lg:order-none lg:mb-0">
              <Photo />
            </div>
          </div>
        </motion.div>
        <Stats />
      </main>
    </div>
  );
}
