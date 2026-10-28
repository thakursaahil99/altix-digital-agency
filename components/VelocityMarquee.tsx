"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Marquee row that speeds up, reverses and skews with scroll velocity. */
function Row({ children, baseVelocity }: { children: ReactNode; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [8, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x, skewX: skew }} className="flex flex-nowrap">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function VelocityMarquee({ rows }: { rows: string[][] }) {
  return (
    <section className="space-y-2 overflow-hidden py-16 sm:py-24">
      {rows.map((words, r) => (
        <Row key={r} baseVelocity={r % 2 ? 2 : -2}>
          {words.map((w, i) => (
            <span
              key={i}
              className={`mr-8 flex items-center gap-8 font-display text-6xl font-bold uppercase tracking-tight sm:text-8xl lg:text-9xl ${
                r % 2 ? "text-transparent [-webkit-text-stroke:1.5px_color-mix(in_oklab,var(--fg)_35%,transparent)]" : ""
              }`}
            >
              {w}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </Row>
      ))}
    </section>
  );
}
