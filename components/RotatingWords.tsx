"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function RotatingWords({
  words,
  interval = 2200,
  delay = 0,
}: {
  words: string[];
  interval?: number;
  delay?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative inline-flex overflow-hidden pb-[0.12em] align-top [perspective:600px]"
    >
      {/* invisible longest word reserves width so the layout never jumps */}
      <span className="invisible">{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0, rotateX: -80 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-100%", opacity: 0, rotateX: 80 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient absolute left-0 top-0"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
