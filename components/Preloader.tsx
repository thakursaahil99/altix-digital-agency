"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";

/** Intro shown once per browser session. */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("altix-intro") === "1";
      sessionStorage.setItem("altix-intro", "1");
    } catch {}
    if (seen) {
      setShow(false);
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setShow(false), 150),
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="theme-dark fixed inset-0 z-[90] flex flex-col justify-between bg-[#050507] p-6 sm:p-10"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
            <span>Altix Digital</span>
            <span>Web · Apps · SEO · Growth</span>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl font-bold tracking-tight sm:text-8xl"
            >
              Altix<span className="text-accent">.</span>
            </motion.h1>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="h-[2px] flex-1 overflow-hidden bg-white/10">
              <div className="h-full origin-left bg-lime" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
            <span className="font-display text-5xl font-semibold tabular-nums sm:text-7xl">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
