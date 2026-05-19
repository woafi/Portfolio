"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Resume", path: "/resume" },
  { name: "Projects", path: "/project" },
  { name: "Contact", path: "/contact" },
];

const listVariants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 14 },
};

function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 p-2 transition-colors hover:border-[var(--accent)]/40">
        <CiMenuFries className="text-[30px] accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col border-l border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] backdrop-blur-2xl">
        <div className="mb-28 mt-28 text-center text-2xl">
          <Link href="/" onClick={() => setOpen(false)}>
            <div className="text-3xl font-semibold">
              <span className="accent">W</span>
              <span>oafi</span>
              <span className="text-[var(--color-muted)]">.</span>
            </div>
          </Link>
        </div>
        <motion.nav
          className="flex flex-col items-center justify-center gap-8"
          variants={listVariants}
          initial="closed"
          animate={open ? "open" : "closed"}
        >
          {links.map((link) => {
            const active = link.path === pathname;
            return (
              <motion.div key={link.path} variants={itemVariants} className="w-full text-center">
                <Link
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`relative inline-block text-lg capitalize transition-colors ${
                    active ? "text-[var(--accent)]" : "text-[var(--color-muted)] accentHover"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="mobile-nav-underline"
                      className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-12 rounded-full bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
