"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Words to render with the gradient accent */
  highlight?: string[];
  /** Animate on mount instead of when scrolled into view */
  immediate?: boolean;
};

export default function SplitText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  highlight = [],
  immediate = false,
}: Props) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-40px" } };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className={`inline-block ${highlight.includes(word.replace(/[.,!?]/g, "")) ? "text-gradient" : ""}`}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
