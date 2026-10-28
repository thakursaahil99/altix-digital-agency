"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { scrollToTop } from "./SmoothScroll";
import { site } from "@/lib/data";

const whatsapp = `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi Altix! I'd like to discuss a project.",
)}`;

export default function FloatingActions() {
  const { scrollY, scrollYProgress } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const offset = useTransform(scrollYProgress, [0, 1], [126, 0]);

  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > 700));

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            onClick={() => {
              scrollToTop(false);
            }}
            aria-label="Back to top"
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-surface/90 shadow-lg backdrop-blur-md"
          >
            <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
              <motion.circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                strokeWidth="2"
                strokeDasharray="126"
                style={{ strokeDashoffset: offset, stroke: "var(--accent)" }}
              />
            </svg>
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 18 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl shadow-green-900/30"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25d366]" />
        <MessageCircle size={26} className="relative" fill="currentColor" strokeWidth={1.5} />
        <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-full bg-surface px-4 py-2 text-sm text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Chat with us
        </span>
      </motion.a>
    </div>
  );
}
