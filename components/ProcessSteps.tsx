"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { process } from "@/lib/data";

/** Vertical timeline whose line fills as you scroll. */
export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-0 left-6 top-0 w-px bg-white/10 sm:left-8" />
      <motion.div style={{ scaleY }} className="absolute bottom-0 left-6 top-0 w-px origin-top bg-accent sm:left-8" />

      <ol className="space-y-14">
        {process.map((p, i) => (
          <motion.li
            key={p.step}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-8 pl-0"
          >
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg font-display text-sm font-semibold text-accent sm:h-16 sm:w-16 sm:text-base">
              {p.step}
            </span>
            <div className="pt-2 sm:pt-4">
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{p.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
