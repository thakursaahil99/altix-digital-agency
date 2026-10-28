"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { navLinks, site } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
    setScrolled(y > 30);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 pt-4"
      >
        <div className="container-x">
          <nav
            className={`flex items-center justify-between rounded-full px-3 py-2 pl-5 transition-[background-color,border-color] duration-500 ${
              scrolled || open ? "border border-white/10 bg-bg/85 backdrop-blur-md" : "border border-transparent"
            }`}
          >
            <Logo />

            <ul className="hidden items-center gap-1 xl:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href) ? "text-bg" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden sm:block">
                <Magnetic>
                  <Link
                    href="/contact"
                    className="btn-shine group flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-ink hover:text-bg"
                  >
                    Start a project
                    <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                  </Link>
                </Magnetic>
              </div>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 xl:hidden"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-32 xl:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between font-display text-4xl font-semibold ${
                        isActive(link.href) ? "text-accent" : "text-white"
                      }`}
                    >
                      {link.label}
                      <span className="text-sm text-white/30">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-1 text-sm text-muted"
            >
              <p>{site.email}</p>
              <p>{site.phone}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
