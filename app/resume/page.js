"use client";
import { useState, useRef } from "react";
import {
  FaJs, FaJava, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt,
} from "react-icons/fa";
import {
  SiNextdotjs, SiExpress, SiTailwindcss, SiMongodb, SiMysql,
  SiVercel, SiPostman, SiTypescript, SiPostgresql, SiRender,
  SiPython, SiDjango, SiPrisma,
} from "react-icons/si";
import { MdOutlineDataObject } from "react-icons/md";
import { BsDatabaseFillGear } from "react-icons/bs";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

import HeroBackground from "@/components/home/HeroBackground";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */

const about = {
  title: "About Me",
  description:
    "I am a Computer Science and Engineering (CSE) student and a Full-Stack Web Developer with a strong focus on building scalable, secure, and production-ready web applications. Currently expanding my backend expertise with Python and Django, while strengthening problem-solving and data structures skills through topic-wise LeetCode practice. My goal is to grow into a well-rounded developer who consistently writes clean, maintainable, secure, and high-performance code.",
  info: [
    { fieldName: "Name", fieldValue: "Mohammad Woafi" },
    { fieldName: "Phone", fieldValue: "+8801315939768" },
    { fieldName: "Nationality", fieldValue: "Bangladeshi" },
    { fieldName: "Email", fieldValue: "woafisun@yahoo.com" },
    { fieldName: "Language", fieldValue: "English, Bengali" },
  ],
};

const experience = {
  title: "My Experience",
  description:
    "I am a Full-Stack Web Developer with hands-on experience building dynamic, responsive, and production-ready web applications. I specialise in backend development using Node.js & Express.js and frontend development with React and Next.js. I work extensively with PostgreSQL and MongoDB for database design, using Prisma ORM to build efficient, type-safe, and scalable data layers.",
  items: [
    {
      company: "Freelance",
      position: "Full-Stack Developer",
      duration: "2024 – Present",
    },
  ],
};

const education = {
  title: "My Education",
  items: [
    {
      institution: "Bangladesh Institute of Science and Technology",
      degree: "BSc in CSE",
      duration: "2022 – Present",
      grade: "CGPA 3.1",
    },
    {
      institution: "Government Keshab Chandra College, Jhenaidah",
      degree: "HSC",
      duration: "2018 – 2020",
      grade: "GPA 5.00",
    },
    {
      institution: "Jhenaidah Government Boys School",
      degree: "SSC",
      duration: "2016 – 2018",
      grade: "GPA 5.00",
    },
  ],
};

const skills = {
  title: "My Skills",
  items: [
    {
      category: "Languages",
      technologies: [
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
        { name: "Java", icon: <FaJava />, color: "#ED8B00" },
        { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
        { name: "Python", icon: <SiPython />, color: "#3776AB" },
      ],
    },
    {
      category: "Frameworks / Libraries",
      technologies: [
        { name: "React / React Native", icon: <FaReact />, color: "#61DAFB" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Express", icon: <SiExpress />, color: "#aaaaaa" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38BDF8" },
        { name: "Django", icon: <SiDjango />, color: "#44b78b" },
      ],
    },
    {
      category: "Databases",
      technologies: [
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      ],
    },
    {
      category: "Tools & DevOps",
      technologies: [
        { name: "Git & GitHub", icon: <FaGitAlt />, color: "#F05032" },
        { name: "Vercel", icon: <SiVercel />, color: "#ffffff" },
        { name: "Render", icon: <SiRender />, color: "#46E3B7" },
        { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
        { name: "Prisma ORM", icon: <SiPrisma />, color: "#5a67d8" },
      ],
    },
    {
      category: "Concepts",
      technologies: [
        { name: "Data Structures & Algorithms", icon: <MdOutlineDataObject />, color: "#00ff99" },
        { name: "REST APIs", icon: <BsDatabaseFillGear />, color: "#00ff99" },
      ],
    },
  ],
};

/* ─────────────────────────────────────────────────────────
   TABS CONFIG
───────────────────────────────────────────────────────── */

const TABS = [
  { value: "about", label: "About Me", badge: "Bio" },
  { value: "experience", label: "Experience", badge: "Work" },
  { value: "education", label: "Education", badge: "Edu" },
  { value: "skills", label: "Skills", badge: "Stack" },
];

/* ─────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25, ease: "easeIn" } },
};

/* ─────────────────────────────────────────────────────────
   SHARED SUB-COMPONENTS
───────────────────────────────────────────────────────── */

function AccentDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff99] opacity-60" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff99]" />
    </span>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-[#00ff99] to-transparent" />
        <span className="text-[#00ff99] text-xs uppercase tracking-[0.2em] font-semibold">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.08] bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
        {title}
      </h2>
    </motion.div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [5, -5]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-5, 5]), { stiffness: 280, damping: 28 });

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TechPill({ name, icon, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      type="button"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.07, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 bg-white/[0.05] border border-white/10 hover:border-[#00ff99]/40 px-4 py-2.5 rounded-full text-base cursor-pointer transition-colors duration-300 select-none"
      style={{ boxShadow: hovered ? `0 0 20px ${color}28` : "none" }}
    >
      <motion.span
        className="text-2xl shrink-0"
        animate={{ color: hovered ? color : "#9ca3af" }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.span>
      <span className={`text-sm font-medium transition-colors duration-200 ${hovered ? "text-white" : "text-white/55"}`}>
        {name}
      </span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────
   TAB PANELS
───────────────────────────────────────────────────────── */

function AboutPanel() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8">
      <SectionHeading eyebrow="Portfolio" title={about.title} />

      <motion.p variants={itemVariants} className="text-white/60 leading-relaxed text-base lg:text-lg max-w-2xl">
        {about.description}
      </motion.p>

      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {about.info.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-[#00ff99]/30 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
          >
            <AccentDot />
            <span className="text-white/50 text-base shrink-0">{item.fieldName}:</span>
            <span className="text-white font-medium text-base truncate">{item.fieldValue}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function ExperiencePanel() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8">
      <SectionHeading eyebrow="Career" title={experience.title} />

      <motion.p variants={itemVariants} className="text-white/60 leading-relaxed text-base lg:text-lg max-w-2xl">
        {experience.description}
      </motion.p>

      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {experience.items.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <TiltCard>
              <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-[#00ff99]/40 transition-colors duration-300 group">
                <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#00ff99]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex flex-col gap-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[#00ff99] font-bold text-xl">{item.company}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/25 uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                  <p className="text-white text-2xl font-semibold leading-snug">{item.position}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <AccentDot />
                    <span className="text-white/55 text-base">{item.duration}</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-2 flex flex-col gap-1 pl-3 border-l border-white/10">
        <p className="text-white/40 text-sm uppercase tracking-widest">Timeline</p>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00ff99] ring-4 ring-[#00ff99]/20 shrink-0" />
          <div>
            <p className="text-white/85 text-base font-medium">Freelance Full-Stack Developer</p>
            <p className="text-white/45 text-sm">2024 – Present</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EducationPanel() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8">
      <SectionHeading eyebrow="Academic" title={education.title} />

      <motion.div variants={containerVariants} className="flex flex-col gap-4">
        {education.items.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <TiltCard>
              <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-[#00ff99]/40 transition-colors duration-300 group">
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#00ff99]/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 relative z-10">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[#00ff99] font-bold text-base uppercase tracking-wide">
                      {item.degree}
                    </span>
                    <p className="text-white font-semibold text-lg leading-snug max-w-md">
                      {item.institution}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <AccentDot />
                      <span className="text-white/50 text-base">{item.duration}</span>
                    </div>
                  </div>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="self-start px-4 py-2 rounded-full text-sm font-bold bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/30 shrink-0 cursor-default"
                  >
                    {item.grade}
                  </motion.span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function SkillsPanel() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8">
      <SectionHeading eyebrow="Stack" title={skills.title} />

      <motion.div variants={containerVariants} className="flex flex-col gap-4">
        {skills.items.map((group, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.08] hover:border-[#00ff99]/20 transition-colors duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-4 bg-[#00ff99]" />
              <h3 className="text-xs font-semibold text-[#00ff99] uppercase tracking-[0.18em]">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.technologies.map((tech, j) => (
                <TechPill key={j} name={tech.name} icon={tech.icon} color={tech.color} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */

export default function Resume() {
  const [activeTab, setActiveTab] = useState("about");
  const contentRef = useRef(null);

  const handleTabClick = (value) => {
    setActiveTab(value);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "about": return <AboutPanel />;
      case "experience": return <ExperiencePanel />;
      case "education": return <EducationPanel />;
      case "skills": return <SkillsPanel />;
      default: return <AboutPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

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
        <HeroBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 container mx-auto max-w-6xl px-5 lg:px-10 py-16 lg:py-28"
      >

        {/* ─── LAYOUT ─── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── SIDEBAR NAV ── */}
          <motion.nav
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            aria-label="Resume sections"
            className="flex flex-row flex-wrap lg:flex-col gap-2 lg:gap-1 lg:w-52 xl:w-60 shrink-0"
          >
            {TABS.map(({ value, label, badge }) => {
              const isActive = activeTab === value;
              return (
                <button
                  key={value}
                  onClick={() => handleTabClick(value)}
                  className="relative group flex items-center justify-between w-auto lg:w-full px-4 py-3.5 rounded-xl text-base font-medium cursor-pointer overflow-hidden text-left"
                  style={{ outline: "none", background: "none", border: "none" }}
                >
                  {/* animated background fill */}
                  <motion.span
                    className="absolute inset-0 rounded-xl"
                    initial={false}
                    animate={{
                      backgroundColor: isActive
                        ? "rgba(0,255,153,0.09)"
                        : "rgba(255,255,255,0.0)",
                    }}
                    transition={{ duration: 0.22 }}
                  />
                  {/* hover layer */}
                  <span className="absolute inset-0 rounded-xl bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  {/* left border accent */}
                  <motion.span
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#00ff99]"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.22 }}
                  />

                  {/* label */}
                  <motion.span
                    className="relative z-10 truncate"
                    animate={{ color: isActive ? "#00ff99" : "rgba(255,255,255,0.48)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {label}
                  </motion.span>

                  {/* badge — desktop only */}
                  <motion.span
                    className="relative z-10 hidden lg:inline-flex ml-2 shrink-0 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full leading-none"
                    initial={false}
                    animate={{
                      backgroundColor: isActive ? "rgba(0,255,153,0.15)" : "rgba(255,255,255,0.05)",
                      color: isActive ? "#00ff99" : "rgba(255,255,255,0.3)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {badge}
                  </motion.span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="hidden lg:block h-px mt-5 bg-gradient-to-r from-white/10 to-transparent" />
            {/* Stack hint */}
            <div className="hidden lg:flex flex-col gap-1.5 mt-4 text-xs text-white/30 leading-relaxed select-none">
              <span>⚡ React · Next.js · Node.js</span>
              <span>🗄 PostgreSQL · MongoDB</span>
              <span>🔧 Prisma · Express · Django</span>
            </div>
          </motion.nav>

          {/* ── CONTENT PANEL ── */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex-1 min-w-0"
          >
            <div className="max-h-[72vh] lg:max-h-none overflow-y-auto lg:overflow-visible pr-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Shimmer keyframe ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>
    </div>
  );
}
