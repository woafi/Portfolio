"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const links = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "projects", path: "/project" },
];

function Navblink() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8">
      {links.map((link) => {
        const active = link.path === pathname;
        return (
          <Link
            href={link.path}
            key={link.path}
            className={`relative capitalize transition-colors duration-300 ${
              active ? "text-[var(--accent)]" : "text-[var(--color-muted)] accentHover"
            }`}
          >
            {link.name}
            {active && (
              <motion.span
                layoutId="desktop-nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[var(--accent-secondary)] via-[var(--accent)] to-[var(--accent-tertiary)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </Link>
        );
      })}
      <Link href="/contact" className="hidden md:block">
        <Button className="cursor-pointer shadow-[0_10px_36px_rgba(0,255,153,0.18)]">Contact</Button>
      </Link>
    </div>
  );
}

export default Navblink;
