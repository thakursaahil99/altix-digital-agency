"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import Button from "./Button";

function Card({ p }: { p: (typeof projects)[number] }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      data-cursor="Open"
      className="theme-dark group relative block h-[60vh] max-h-[560px] min-h-[380px] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 sm:w-[60vw] lg:w-[42vw]"
    >
      <Image
        src={p.image}
        alt={p.title}
        fill
        sizes="(max-width: 768px) 80vw, 42vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute left-6 top-6 flex gap-2">
        <span className="rounded-full bg-black/50 px-3 py-1 text-xs backdrop-blur-sm">{p.category}</span>
        <span className="rounded-full bg-black/50 px-3 py-1 text-xs backdrop-blur-sm">{p.year}</span>
      </div>
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-accent">{p.client}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{p.title}</h3>
          <p className="mt-2 max-w-md text-sm text-white/70">{p.summary}</p>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime text-black transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight size={20} />
        </span>
      </div>
    </Link>
  );
}

/** Vertical scroll drives a horizontal track on desktop; plain swipe row on mobile. */
export default function HorizontalWork() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance.current);

  useEffect(() => {
    const measure = () => {
      if (track.current) distance.current = Math.max(0, track.current.scrollWidth - window.innerWidth + 64);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      <section ref={ref} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x mb-10 flex items-end justify-between">
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Selected work</span>
              <h2 className="mt-4 font-display text-6xl font-semibold tracking-tight">
                Results we&apos;re <span className="text-gradient">proud of</span>
              </h2>
            </div>
            <Button href="/work" variant="ghost">
              All case studies
            </Button>
          </div>
          <motion.div ref={track} style={{ x }} className="flex gap-6 pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
            {projects.map((p) => (
              <Card key={p.slug} p={p} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:hidden">
        <div className="container-x">
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Selected work</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            Results we&apos;re <span className="text-gradient">proud of</span>
          </h2>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]">
          {projects.map((p) => (
            <div key={p.slug} className="snap-center">
              <Card p={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
