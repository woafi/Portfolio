"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { HiArrowRight, HiCheckCircle, HiXCircle } from "react-icons/hi";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+880) 131 593 9768",
    href: "tel:+8801315939768",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "woafisun@yahoo.com",
    href: "mailto:woafisun@yahoo.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    description: "Dhaka, Bangladesh",
    href: null,
  },
];

/* ─────────────────────────────────────────────
   MOUSE PARALLAX HOOK  (same pattern as Hero)
───────────────────────────────────────────── */
function useMouseParallax(strength = 18) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    const move = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      rawX.set(((e.clientX - cx) / cx) * strength);
      rawY.set(((e.clientY - cy) / cy) * strength);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY, strength]);

  return { x, y };
}

/* ─────────────────────────────────────────────
   SPOTLIGHT HOOK  (card-level mouse glow)
───────────────────────────────────────────── */
function useSpotlight() {
  const ref = useRef(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 140, damping: 22 });
  const y = useSpring(rawY, { stiffness: 140, damping: 22 });

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - r.left) / r.width);
      rawY.set((e.clientY - r.top) / r.height);
    },
    [rawX, rawY]
  );

  const spotBg = useTransform(
    [x, y],
    ([lx, ly]) =>
      `radial-gradient(520px circle at ${lx * 100}% ${ly * 100}%, rgba(0,255,153,0.06) 0%, transparent 65%)`
  );

  return { ref, onMouseMove, spotBg };
}

/* ─────────────────────────────────────────────
   FLOATING BACKGROUND ORBS
───────────────────────────────────────────── */
function BackgroundOrbs({ mouseX, mouseY }) {
  const reduce = useReducedMotion();
  const ox1 = useTransform(mouseX, (v) => v * -0.6);
  const oy1 = useTransform(mouseY, (v) => v * -0.6);
  const ox2 = useTransform(mouseX, (v) => v * 0.4);
  const oy2 = useTransform(mouseY, (v) => v * 0.4);

  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ x: ox1, y: oy1 }}
        className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[var(--accent)]/[0.055] blur-[110px]"
      />
      <motion.div
        style={{ x: ox2, y: oy2 }}
        className="absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full bg-[var(--accent-secondary)]/[0.05] blur-[100px]"
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent)/20 1px,transparent 1px),linear-gradient(90deg,var(--accent)/20 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   TILT CARD — micro tilt on hover
───────────────────────────────────────────── */
function TiltCard({ children, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rawRx = useMotionValue(0);
  const rawRy = useMotionValue(0);
  const rx = useSpring(rawRx, { stiffness: 200, damping: 20 });
  const ry = useSpring(rawRy, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rawRx.set(-py * 6);
    rawRy.set(px * 6);
  };
  const onLeave = () => { rawRx.set(0); rawRy.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED LABEL — floats up on focus/fill
───────────────────────────────────────────── */
function FloatField({ label, name, type = "text", autoComplete, required }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const active = focused || filled;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setFilled(!!e.target.value); }}
        className={`peer w-full rounded-xl border px-4 pb-3 pt-6 text-sm text-white outline-none transition-[border-color,box-shadow] duration-200 bg-white/[0.04] backdrop-blur-sm
          ${active
            ? "border-[var(--accent)]/50 shadow-[0_0_0_3px_rgba(0,255,153,0.08)]"
            : "border-white/10 hover:border-white/20"
          }`}
      />
      <motion.label
        animate={active ? { y: -10, scale: 0.78, color: "var(--accent)" } : { y: 0, scale: 1, color: "rgba(255,255,255,0.35)" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="pointer-events-none absolute left-4 top-4 origin-left text-sm font-medium"
      >
        {label}
      </motion.label>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
function Contact() {
  const reduce = useReducedMotion();
  const [selectedService, setSelectedService] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const form = useRef(null);
  const { x: mouseX, y: mouseY } = useMouseParallax(20);
  const { ref: spotRef, onMouseMove: spotMove, spotBg } = useSpotlight();

  /* Parallax layers */
  const formX = useTransform(mouseX, (v) => v * -0.35);
  const formY = useTransform(mouseY, (v) => v * -0.35);
  const infoX = useTransform(mouseX, (v) => v * 0.5);
  const infoY = useTransform(mouseY, (v) => v * 0.5);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        alert('Message sent successfully!');
                if (form.current) {
                    form.current.reset();
                }
        setSelectedService("");
        setTimeout(() => setStatus("idle"), 5200);
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4500);
      });
  };

  /* container stagger */
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: reduce ? 0 : 0.15 },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
      className="relative py-10 lg:py-16"
    >
      <BackgroundOrbs mouseX={mouseX} mouseY={mouseY} />

      <div className="container mx-auto px-5 lg:px-0">

        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="inline-block h-px w-8 bg-[var(--accent)]"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--accent)]">
              Get in touch
            </span>
          </div>
          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
            Let&apos;s{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(0,255,153,0.55)",
                color: "transparent",
              }}
            >
              Connect
            </span>
          </h1>
        </motion.div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">

          {/* ── FORM PANEL ── */}
          <motion.div
            style={reduce ? {} : { x: formX, y: formY }}
            className="order-2 w-full lg:order-none lg:w-[58%]"
          >
            <motion.div
              ref={spotRef}
              onMouseMove={spotMove}
              style={{ background: spotBg }}
              className="relative overflow-hidden rounded-2xl"
            >
              {/* Glow border */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--accent)]/15 via-transparent to-[var(--accent-secondary)]/10" />

              <form
                ref={form}
                onSubmit={sendEmail}
                className="relative z-10 flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md md:p-10"
              >
                {/* Heading */}
                <div>
                  <h3 className="text-3xl font-black tracking-tight">
                    Let&apos;s work{" "}
                    <span className="text-[var(--accent)]">together</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">
                    Drop me a message — I&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                {/* Status toasts */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent)]"
                      role="status"
                    >
                      <HiCheckCircle className="shrink-0 text-xl" />
                      Message sent — I&apos;ll reply soon!
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                      role="alert"
                    >
                      <HiXCircle className="shrink-0 text-xl" />
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Fields */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-4"
                >
                  <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FloatField label="Your name" name="name" autoComplete="name" required />
                    <FloatField label="Email address" name="email" type="email" autoComplete="email" required />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <input type="hidden" name="service" value={selectedService} />
                    <Select
                      onValueChange={setSelectedService}
                      value={selectedService || undefined}
                    >
                      <SelectTrigger
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/50 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-white/20 focus:border-[var(--accent)]/50 focus:shadow-[0_0_0_3px_rgba(0,255,153,0.08)] focus:text-white data-[state=open]:border-[var(--accent)]/50"
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-[#0d1117] backdrop-blur-xl">
                        <SelectGroup>
                          <SelectLabel className="text-white/40">Services</SelectLabel>
                          <SelectItem value="Web Development" className="text-white/80 focus:bg-[var(--accent)]/10 focus:text-[var(--accent)]">
                            Web Development
                          </SelectItem>
                          <SelectItem value="UI/UX Design" className="text-white/80 focus:bg-[var(--accent)]/10 focus:text-[var(--accent)]">
                            UI/UX Design
                          </SelectItem>
                          <SelectItem value="APK Development" className="text-white/80 focus:bg-[var(--accent)]/10 focus:text-[var(--accent)]">
                            APK Development
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      className="min-h-[160px] resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white placeholder:text-white/30 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-white/20 focus:border-[var(--accent)]/50 focus:shadow-[0_0_0_3px_rgba(0,255,153,0.08)] focus:outline-none"
                    />
                  </motion.div>

                  {/* Submit row */}
                  <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-1 ">
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={reduce ? {} : { scale: 1.03 }}
                      whileTap={reduce ? {} : { scale: 0.97 }}
                      className="group cursor-pointer relative flex items-center gap-2 overflow-hidden rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(0,255,153,0.2)] transition-[box-shadow,opacity] duration-300 hover:shadow-[0_0_45px_rgba(0,255,153,0.35)] disabled:opacity-60"
                    >
                      {/* Shimmer */}
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="relative ">
                        {status === "sending" ? "Sending…" : "Send message"}
                      </span>
                      {status !== "sending" && (
                        <HiArrowRight className="relative text-base transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                      {status === "sending" && (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="relative inline-block h-4 w-4 rounded-full border-2 border-black/30 border-t-black"
                        />
                      )}
                    </motion.button>

                    <Link
                      href="/project"
                      className="group flex items-center gap-1.5 text-sm font-semibold text-white/35 transition-colors duration-200 hover:text-[var(--accent)]"
                    >
                      View projects
                      <HiArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* ── INFO CARDS ── */}
          <motion.div
            style={reduce ? {} : { x: infoX, y: infoY }}
            className="order-1 flex w-full flex-col justify-center gap-5 lg:order-none lg:w-[42%]"
          >
            {/* Intro text */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <p className="text-sm leading-relaxed text-white/40">
                Available for freelance projects and full-time opportunities. Let&apos;s
                build something great together.
              </p>
            </motion.div>

            {info.map((item, index) => (
              <TiltCard key={item.title}>
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 0.45,
                    delay: reduce ? 0 : index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_0_36px_rgba(0,255,153,0.08)]">
                    {/* Hover glow bg */}
                    <div className="absolute inset-0 -z-0 bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/0 transition-all duration-500 group-hover:from-[var(--accent)]/[0.04] group-hover:to-transparent" />

                    <div className="relative flex items-center gap-4">
                      {/* Icon */}
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_20px_rgba(0,255,153,0.1)] transition-[box-shadow,border-color] duration-300 group-hover:border-[var(--accent)]/40 group-hover:shadow-[0_0_30px_rgba(0,255,153,0.2)]">
                        <span className="text-lg">{item.icon}</span>
                        {/* Corner dot */}
                        <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-[var(--accent)]/0 transition-colors duration-300 group-hover:bg-[var(--accent)]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                          {item.title}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="truncate text-base font-bold text-white transition-colors duration-200 hover:text-[var(--accent)]"
                          >
                            {item.description}
                          </a>
                        ) : (
                          <span className="text-base font-bold text-white">
                            {item.description}
                          </span>
                        )}
                      </div>

                      {/* Arrow indicator */}
                      {item.href && (
                        <HiArrowRight className="shrink-0 text-sm text-white/10 transition-[color,transform] duration-300 group-hover:-rotate-45 group-hover:text-[var(--accent)]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}

            {/* Availability badge */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--accent)]/15 bg-[var(--accent)]/[0.06] px-5 py-3.5"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-sm font-medium text-white/70">
                Available for new projects
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

export default Contact;