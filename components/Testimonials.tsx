"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[index];

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const id = setTimeout(() => go(1), 7000);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface p-8 sm:p-14">
      <div className="orb orb-cyan -right-40 -top-40 h-[400px] w-[400px]" />
      <Quote size={64} className="relative text-accent/80" strokeWidth={1.2} />

      <div className="relative mt-6 min-h-[220px] sm:min-h-[180px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-5 font-display text-2xl font-medium leading-snug sm:text-3xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <Image src={t.image} alt={t.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mt-10 flex items-center justify-between">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-10 bg-accent" : "w-4 bg-white/20"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-lime text-black transition-transform hover:scale-105"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
