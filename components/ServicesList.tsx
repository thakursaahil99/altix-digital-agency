"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

/** Large service rows; on desktop a preview image follows the pointer. */
export default function ServicesList() {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!preview.current || !wrap.current || e.pointerType !== "mouse") return;
    const r = wrap.current.getBoundingClientRect();
    preview.current.style.transform = `translate3d(${e.clientX - r.left - 160}px, ${e.clientY - r.top - 110}px, 0)`;
  };

  return (
    <div ref={wrap} className="relative" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <div
        ref={preview}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[220px] w-[320px] overflow-hidden rounded-2xl transition-[opacity,transform] duration-300 ease-out lg:block"
        style={{ opacity: active === null ? 0 : 1 }}
      >
        {services.map((s, i) => (
          <Image
            key={s.slug}
            src={s.image}
            alt=""
            fill
            sizes="320px"
            className={`object-cover transition-all duration-500 ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
          />
        ))}
      </div>

      <ul className="border-t border-white/10">
        {services.map((s, i) => (
          <li key={s.slug} onPointerEnter={() => setActive(i)}>
            <Link
              href={`/services/${s.slug}`}
              data-cursor="View"
              className="group relative flex items-center gap-6 overflow-hidden border-b border-white/10 py-8 sm:py-10"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              <span className="relative w-10 text-sm text-white/40 transition-colors group-hover:text-black/60">
                0{i + 1}
              </span>
              <span className="relative flex-1 font-display text-3xl font-semibold tracking-tight transition-all duration-500 group-hover:translate-x-4 group-hover:text-black sm:text-5xl">
                {s.title}
              </span>
              <span className="relative hidden max-w-xs text-sm text-muted transition-colors group-hover:text-black/70 md:block">
                {s.short}
              </span>
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-black group-hover:bg-black group-hover:text-lime">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
