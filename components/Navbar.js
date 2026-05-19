import React from "react";
import Link from "next/link";
import Navlink from "@/components/Navblink";
import MobileNav from "./MobileNav";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--bg)_72%,transparent)]">
      <div className="container mx-auto flex items-center justify-between px-5 py-4 md:px-0 md:py-5">
        <Link href="/" className="group">
          <div className="text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:scale-[1.02] md:text-4xl">
            <span className="accent">W</span>
            <span>oafi</span>
            <span className="text-[var(--color-muted)]">.</span>
          </div>
        </Link>
        <div className="hidden md:block">
          <Navlink />
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
