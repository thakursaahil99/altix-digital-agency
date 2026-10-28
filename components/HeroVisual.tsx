"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Search, TrendingUp, Zap } from "lucide-react";

/**
 * Layered "3D" hero scene built from plain DOM + CSS transforms (no WebGL),
 * so it stays smooth on low-end laptops. The whole stack tilts toward the pointer.
 */
export default function HeroVisual() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      if (stage.current) {
        stage.current.style.transform = `rotateX(${current.y * -8}deg) rotateY(${current.x * 12}deg)`;
      }
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const pop = (delay: number) => ({
    initial: { opacity: 0, scale: 0.8, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1200px]">
      {/* Orbit rings */}
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-[12%] animate-spin-rev rounded-full border border-white/10">
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-lime shadow-[0_0_20px_#c8ff2e]" />
      </div>
      <div className="absolute inset-[26%] animate-spin-slow rounded-full border border-white/5">
        <span className="absolute -bottom-1 left-1/2 h-2 w-2 rounded-full bg-cyan" />
      </div>

      <div
        ref={stage}
        className="absolute inset-0 transition-transform duration-75 [transform-style:preserve-3d]"
      >
        {/* Main photo card */}
        <motion.div
          {...pop(0.5)}
          className="theme-dark absolute inset-[14%] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60"
        >
          <Image
            src="/images/hero-team.jpg"
            alt="Altix team collaborating on a project"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 480px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/60">Live projects</p>
              <p className="font-display text-2xl font-semibold">32 in progress</p>
            </div>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-lime" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-lime" />
            </span>
          </div>
        </motion.div>

        {/* Traffic chart card */}
        <div className="absolute -left-2 top-[8%] w-[52%] sm:-left-8" style={{ transform: "translateZ(80px)" }}>
          <motion.div {...pop(0.8)} className="glass rounded-2xl bg-surface/90 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Organic traffic</span>
              <span className="flex items-center gap-1 rounded-full bg-lime/15 px-2 py-0.5 text-[11px] font-semibold text-accent">
                <TrendingUp size={12} /> 312%
              </span>
            </div>
            <svg viewBox="0 0 200 70" className="mt-3 w-full">
              <defs>
                <linearGradient id="hv-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" style={{ stopColor: "var(--accent)" }} stopOpacity="0.35" />
                  <stop offset="100%" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 62 L25 55 L50 58 L75 44 L100 47 L125 30 L150 33 L175 14 L200 6 L200 70 L0 70Z" fill="url(#hv-fill)" />
              <path
                className="draw-path"
                d="M0 62 L25 55 L50 58 L75 44 L100 47 L125 30 L150 33 L175 14 L200 6"
                fill="none"
                style={{ stroke: "var(--accent)" }}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Search rank card */}
        <div className="absolute -right-2 top-[30%] w-[50%] sm:-right-10" style={{ transform: "translateZ(120px)" }}>
          <motion.div {...pop(1)} className="glass rounded-2xl bg-surface/90 p-4">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-[11px] text-white/70">
              <Search size={12} /> best digital agency
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-accent">#1</span>
              <div className="text-[11px] leading-tight text-white/60">
                Google ranking
                <br />
                <span className="text-white">altixdigital.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance gauge card */}
        <div className="absolute bottom-[4%] left-[6%] w-[44%]" style={{ transform: "translateZ(60px)" }}>
          <motion.div {...pop(1.2)} className="glass flex items-center gap-3 rounded-2xl bg-surface/90 p-4">
            <svg viewBox="0 0 36 36" className="h-14 w-14 shrink-0 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="94.2"
                className="gauge-fill"
              />
            </svg>
            <div>
              <p className="flex items-center gap-1 text-[11px] text-white/60">
                <Zap size={12} className="text-cyan" /> Performance
              </p>
              <p className="font-display text-2xl font-semibold">98/100</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
