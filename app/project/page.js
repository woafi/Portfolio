"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const projects = [
  {
    num: "01",
    title: "Tech Gadget",
    description:
      "A modern, production-ready full-stack e-commerce web application for technology gadgets. Built with TypeScript throughout the entire stack, featuring a responsive React frontend and a robust Node.js backend with RESTful API architecture.",
    stack: [
      { name: "TypeScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "PostgreSQL" },
      { name: "Express.js" },
    ],
    image: "/assets/work/projectTechGadgets.png",
    live: "https://tech-gadget-five.vercel.app",
    github: "https://github.com/woafi/Tech-Gadget",
  },
  {
    num: "02",
    title: "MyChat",
    description:
      "A full-stack real-time messaging application built with the MERN stack, featuring secure authentication, file sharing, comprehensive notification system and responsive design.",
    stack: [
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "MongoDB" },
      { name: "Node.js" },
      { name: "Express.js" },
    ],
    image: "/assets/work/projectMyCHat.png",
    live: "https://my-chat-6blp.onrender.com/",
    github: "https://github.com/woafi/My-Chat",
  },
  {
    num: "03",
    title: "SecureNest",
    description:
      "A full-stack password manager built with TypeScript, featuring military-grade AES-256-GCM encryption, Firebase authentication, and a beautiful dark-mode UI with smooth animations.",
    stack: [
      { name: "TypeScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "PostgreSQL" },
      { name: "Express.js" },
    ],
    image: "/assets/work/projectSecureNest.png",
    live: "https://secure-nest-frontend-pi.vercel.app",
    github: "https://github.com/woafi/SecureNest",
  },
  {
    num: "04",
    title: "Portfolio",
    description:
      "A modern portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion, featuring EmailJS integration for contact form functionality.",
    stack: [
      { name: "Next.js" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
    image: "/assets/work/project-1.png",
    live: "https://portfolio-ten-lime-87.vercel.app/",
    github: "https://github.com/woafi/Portfolio",
  },
  {
    num: "05",
    title: "Todo List",
    description:
      "A React-based task management application that helps users organize and track their tasks efficiently with a clean interface and persistent storage.",
    stack: [{ name: "React" }, { name: "Tailwind CSS" }, { name: "JavaScript" }],
    image: "/assets/work/projectTodoList.png",
    live: "https://task-manger-ashy.vercel.app",
    github: "https://github.com/woafi/Todo-List",
  },
  {
    num: "06",
    title: "Web Music Player",
    description:
      "A Spotify-inspired web music player with play/pause, volume control, seek bar, and a responsive mobile-friendly hamburger menu.",
    stack: [{ name: "JavaScript" }, { name: "CSS" }, { name: "HTML" }],
    image: "/assets/work/project-4.png",
    live: "http://spotifywebplayer.42web.io/",
    github: "https://github.com/woafi/Web-Music-Player",
  },
  {
    num: "07",
    title: "CurrencyXchange",
    description:
      "A real-time currency converter leveraging a public API to fetch live exchange rates with a clean, intuitive UI.",
    stack: [{ name: "JavaScript" }, { name: "CSS" }, { name: "HTML" }],
    image: "/assets/work/project-5.png",
    live: "https://woafi.github.io/CurrencyXchange/index.html",
    github: "https://github.com/woafi/CurrencyXchange",
  },
  {
    num: "08",
    title: "Netflix Clone",
    description:
      "A pixel-perfect responsive Netflix homepage clone built to practice front-end fundamentals and replicate modern streaming UI patterns.",
    stack: [{ name: "CSS" }, { name: "HTML" }],
    image: "/assets/work/project-6.png",
    live: "https://woafi.github.io/Netflix-Clone/index.html",
    github: "https://github.com/woafi/Netflix-Clone",
  },
];

/* ─────────────────────────────────────────────
   SPOTLIGHT HOOK — tracks mouse for image glow
───────────────────────────────────────────── */
function useSpotlight() {
  const ref = useRef(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 120, damping: 20 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20 });

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  }, [rawX, rawY]);

  return { ref, x, y, handleMove };
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function CounterNum({ num }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={num}
        initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {num}
      </motion.span>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Project() {
  const reduce = useReducedMotion();
  const [activeTag, setActiveTag] = useState("All");
  const [project, setProject] = useState(projects[0]);
  const { ref: spotlightRef, x, y, handleMove } = useSpotlight();

  const filtered = useMemo(() => {
    if (activeTag === "All") return projects;
    return projects.filter((p) => p.stack.some((s) => s.name === activeTag));
  }, [activeTag]);

  useEffect(() => {
    setProject(filtered[0] ?? projects[0]);
  }, [filtered]);

  const handleSlideChange = (swiper) => {
    const current = filtered[swiper.activeIndex];
    if (current) setProject(current);
  };

  /* Spotlight CSS radial gradient */
  const spotlightBg = useTransform(
    [x, y],
    ([lx, ly]) =>
      `radial-gradient(480px circle at ${lx * 100}% ${ly * 100}%, rgba(0,255,153,0.07) 0%, transparent 70%)`
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
      className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden py-16 lg:px-0"
    >
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
      </div>
      {/* ── Background ambient blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[var(--accent-secondary)]/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-5 lg:px-0">

        {/* ── HEADER ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex flex-col gap-2">
            {/* Label with animated line */}
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="inline-block h-px w-8 bg-[var(--accent)]"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--accent)]">
                Selected Work
              </span>
            </div>
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Featured{" "}
              <span
                className="relative inline-block"
                style={{
                  WebkitTextStroke: "1px rgba(0,255,153,0.5)",
                  color: "transparent",
                }}
              >
                Projects
                {/* Underline swoosh */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[var(--accent)] to-transparent"
                />
              </span>
            </h1>
          </div>


        </motion.div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* ── LEFT: Project Info ── */}
          <div className="order-2 flex w-full flex-col lg:order-none lg:w-[48%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.num + activeTag}
                initial={reduce ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                {/* Big number */}
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-black leading-none text-white/[0.06]"
                    style={{
                      fontSize: "clamp(5rem, 12vw, 9rem)",
                      WebkitTextStroke: "1px rgba(0,255,153,0.15)",
                    }}
                  >
                    <CounterNum num={project.num} />
                  </span>
                  <motion.span
                    key={project.num + "-line"}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0 }}
                    className="mb-2 inline-block h-px flex-1 bg-gradient-to-r from-[var(--accent)]/40 to-transparent"
                  />
                </div>

                {/* Title */}
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={project.title}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="-mt-4 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl"
                  >
                    {project.title}
                  </motion.h2>
                </AnimatePresence>

                {/* Description */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={project.description}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="text-sm leading-relaxed text-white/50 md:text-[15px]"
                  >
                    {project.description}
                  </motion.p>
                </AnimatePresence>

                {/* Stack chips */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item, i) => (
                    <motion.span
                      key={item.name + i + project.num}
                      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.06 * i,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]"
                    >
                      {item.name}
                    </motion.span>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                {/* Action buttons */}
                <div className="flex items-center gap-5">
                  <TooltipProvider delayDuration={80}>
                    {[
                      {
                        href: project.live,
                        icon: <BsArrowUpRight className="text-xl" />,
                        label: "Live Demo",
                        rotate: "group-hover:rotate-12",
                      },
                      {
                        href: project.github,
                        icon: <BsGithub className="text-xl" />,
                        label: "Repository",
                        rotate: "group-hover:-rotate-6",
                      },
                    ].map(({ href, icon, label, rotate }) => (
                      <Tooltip key={label}>
                        <TooltipTrigger asChild>
                          <Link href={href} target="_blank">
                            <motion.div
                              whileHover={reduce ? {} : { y: -3, scale: 1.04 }}
                              whileTap={reduce ? {} : { scale: 0.93 }}
                              className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 shadow-[0_0_0_1px_rgba(0,255,153,0)] transition-[border-color,color,box-shadow] duration-300 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] hover:shadow-[0_0_24px_rgba(0,255,153,0.15)]"
                            >
                              <span className={`transition-transform duration-300 ${rotate}`}>
                                {icon}
                              </span>
                              {/* Corner accent */}
                              <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-[var(--accent)]/0 transition-colors duration-300 group-hover:bg-[var(--accent)]" />
                            </motion.div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-xs font-bold text-black">
                          {label}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>

                  {/* Project count indicator */}
                  <div className="ml-auto font-mono text-xs text-white/20">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={project.num}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.num} / {String(filtered.length).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Swiper Image Panel ── */}
          <div className="relative w-full lg:w-[52%]">
            <motion.div
              ref={spotlightRef}
              onMouseMove={handleMove}
              style={{ background: spotlightBg }}
              className="relative rounded-2xl"
            >
              {/* Glow border */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent-secondary)]/10 opacity-60" />

              <Swiper
                key={activeTag}
                spaceBetween={20}
                slidesPerView={1}
                className="relative z-10 overflow-hidden rounded-2xl lg:h-[480px]"
                onSlideChange={handleSlideChange}
              >
                {filtered.map((proj, index) => (
                  <SwiperSlide key={proj.title + index} className="w-full">
                    <div className="group relative flex h-[340px] items-center justify-center lg:h-[480px]">
                      {/* Image container */}
                      <div className="relative h-full w-full overflow-hidden bg-[#0a0a0a]">
                        <Image
                          src={proj.image}
                          fill
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] md:object-contain motion-reduce:group-hover:scale-100"
                          alt={`${proj.title} preview`}
                          sizes="(max-width: 1024px) 100vw, 52vw"
                        />
                        {/* Bottom gradient */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Slide label on hover */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute bottom-4 left-4 right-4 flex items-end justify-between"
                        >
                          <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                            {proj.title}
                          </span>
                          <span className="font-mono text-xs text-[var(--accent)]/70">
                            {proj.num}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                <WorkSliderBtns
                  containerStyle="flex gap-2 absolute right-3 bottom-3 z-20"
                  btnStyles="rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-white text-[18px] w-[40px] h-[40px] flex justify-center items-center transition-[transform,background-color,border-color] duration-200 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black active:scale-90"
                />
              </Swiper>

              {/* Progress dots */}
              <div className="mt-4 flex items-center justify-center gap-1.5">
                {filtered.map((proj) => (
                  <motion.div
                    key={proj.num}
                    animate={{
                      width: proj.num === project.num ? 24 : 6,
                      backgroundColor:
                        proj.num === project.num
                          ? "var(--accent)"
                          : "rgba(255,255,255,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="h-1.5 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}