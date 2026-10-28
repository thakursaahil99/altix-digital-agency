"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Gauge, Globe, Search, ShieldCheck, Zap } from "lucide-react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

const checks = [
  { icon: Zap, label: "Page speed" },
  { icon: Search, label: "SEO health" },
  { icon: Gauge, label: "Core Web Vitals" },
  { icon: ShieldCheck, label: "Best practices" },
];

/** Home-page hook into the /audit tool: type a URL, jump straight into a live audit. */
export default function AuditTeaser() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-lime p-8 text-black sm:p-14 lg:p-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-spin-slow rounded-full border-[40px] border-black/5" />
          <div className="pointer-events-none absolute -bottom-32 right-40 h-72 w-72 animate-spin-rev rounded-full border-2 border-dashed border-black/15" />

          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-lime">
                  Free tool · 30 seconds
                </span>
              </Reveal>
              <SplitText
                text="How fast is your website, really?"
                className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
              />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-lg text-lg text-black/70">
                  Get a real Google Lighthouse report for your site — speed, SEO and Core Web Vitals — plus the quick
                  wins we&apos;d fix first.
                </p>
              </Reveal>
              <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
                {checks.map((c) => (
                  <span key={c.label} className="flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-medium">
                    <c.icon size={16} /> {c.label}
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (url.trim()) router.push(`/audit?url=${encodeURIComponent(url.trim())}`);
                }}
                className="theme-dark rounded-[2rem] bg-black p-3 shadow-2xl shadow-black/30"
              >
                <label className="flex items-center gap-3 rounded-full bg-white/10 px-5 text-white">
                  <Globe size={20} className="shrink-0 text-white/50" />
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    placeholder="yourwebsite.com"
                    aria-label="Website address"
                    className="h-14 min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/40"
                  />
                </label>
                <button
                  type="submit"
                  className="btn-shine mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-lime py-4 font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  <Zap size={18} /> Run free audit
                </button>
                <p className="mt-3 pb-1 text-center text-xs text-white/40">No sign-up needed · Powered by Google PageSpeed</p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
