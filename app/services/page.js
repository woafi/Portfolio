"use client";

import { useRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import HeroBackground from "@/components/home/HeroBackground";

/* ─── Data ───────────────────────────────────────────────── */
const services = [
  {
    num: "01",
    title: "Web Development",
    desc: "Clean, performant websites built for every screen — from pixel-perfect landing pages to full-stack web apps.",
    tag: "Full-Stack · Next.js · React",
    href: "/contact",
  },
  {
    num: "02",
    title: "UI / UX Design",
    desc: "Interfaces that feel inevitable — intuitive flows, tight visual systems, and interactions people remember.",
    tag: "Figma · Design Systems · Motion",
    href: "/contact",
  },
  {
    num: "03",
    title: "APK Development",
    desc: "Cross-platform mobile apps that ship fast and run smooth, built with React Native from a single codebase.",
    tag: "React Native · Android · iOS",
    href: "/contact",
  },
];

/* ─── Animation variants ─────────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Magnetic tilt card ─────────────────────────────────── */
function TiltCard({ children, className }) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 22 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Single Service Card ────────────────────────────────── */
function ServiceCard({ service, index }) {
  return (
    <motion.div variants={cardVariants}>
      <TiltCard className="group relative h-full cursor-pointer overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d0d] p-8 transition-shadow duration-500 hover:shadow-[0_0_60px_-10px_rgba(0,255,153,0.25)] md:p-10">

        {/* Subtle corner glow on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#00ff99] opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-10"
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between">
          {/* Number */}
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00ff99]"
          >
            {service.num}
          </span>

          {/* CTA button */}
          <Link
            href={service.href}
            aria-label={`Contact about ${service.title}`}
            className="group/btn relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-400 hover:border-[#00ff99]/50 hover:bg-[#00ff99]/10 hover:text-[#00ff99]"
          >
            <BsArrowUpRight className="relative z-10 text-sm transition-transform duration-300 group-hover/btn:-translate-y-[1px] group-hover/btn:translate-x-[1px]" />
          </Link>
        </div>

        {/* Title */}
        <h2 className="mt-8 text-[32px] font-bold leading-[1.1] tracking-tight text-white transition-colors duration-300 group-hover:text-[#00ff99] md:text-[36px]">
          {service.title}
        </h2>

        {/* Desc */}
        <p className="mt-4 text-[15px] leading-relaxed text-white/45">
          {service.desc}
        </p>

        {/* Tag pill */}
        <div className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-white/35">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00ff99]" />
          {service.tag}
        </div>

        {/* Animated bottom border */}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#00ff99] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </TiltCard>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function Services() {
  return (
    <>
      {/* Import Syne from Google Fonts — add to your layout/globals instead if preferred */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>

      <section className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden py-24 lg:py-28">
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

        {/* Faint grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative mx-auto px-5">
          {/* Section header */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-8%" }}
            className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <motion.div variants={headingVariants}>
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#00ff99]">
                What I do
              </p>
              <h1 className="text-[42px] font-extrabold leading-[1.05] tracking-tight text-white md:text-[56px]">
                Services
              </h1>
            </motion.div>

            <motion.p
              variants={headingVariants}
              className="max-w-xs text-[14px] leading-relaxed text-white/40 md:text-right"
            >
              Turning ideas into fast, beautiful,
              <br className="hidden md:block" /> and maintainable digital products.
            </motion.p>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, i) => (
              <ServiceCard key={service.num} service={service} index={i} />
            ))}
          </motion.div>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-white/[0.06]" />
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full border border-[#00ff99]/30 bg-[#00ff99]/5 px-5 py-2.5 font-mono text-[12px] tracking-widest text-[#00ff99] uppercase transition-all duration-300 hover:border-[#00ff99]/70 hover:bg-[#00ff99]/10"
            >
              Let&apos;s work together
              <BsArrowUpRight className="text-xs transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </motion.div>
        </div>
      </section>
    </>
  );
}