"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import TiltCard from "./TiltCard";

const filters = ["All", "Web", "App", "SEO", "Growth", "Design"] as const;

export default function WorkGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              filter === f ? "text-black" : "border border-white/10 text-white/70 hover:text-white"
            }`}
          >
            {filter === f && (
              <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-lime" />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 === 1 ? "md:mt-16" : ""}
            >
              <TiltCard max={6} className="rounded-[2rem]">
                <Link href={`/work/${p.slug}`} data-cursor="Open" className="group block">
                  <div className="theme-dark relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
                    <div className="absolute left-5 top-5 flex gap-2">
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full bg-black/50 px-3 py-1 text-xs backdrop-blur-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 flex translate-y-4 gap-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {p.results.map((r) => (
                        <div key={r.label}>
                          <p className="font-display text-2xl font-semibold text-accent">{r.value}</p>
                          <p className="text-xs text-white/70">{r.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4 px-1">
                    <div>
                      <p className="text-sm text-muted">
                        {p.client} · {p.category} · {p.year}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold transition-colors group-hover:text-accent">
                        {p.title}
                      </h3>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-lime group-hover:text-black">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
