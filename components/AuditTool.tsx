"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "motion/react";
import { AlertTriangle, ArrowUpRight, Globe, Laptop, Loader2, Smartphone, Zap } from "lucide-react";

type Result = {
  url: string;
  strategy: "mobile" | "desktop";
  scores: { performance: number; accessibility: number; bestPractices: number; seo: number };
  metrics: { label: string; value: string; score: number }[];
  opportunities: { title: string; savings: string }[];
  screenshot: string | null;
};

const steps = [
  "Connecting to Google PageSpeed…",
  "Loading your site on a simulated device…",
  "Measuring Core Web Vitals…",
  "Checking SEO & accessibility…",
  "Finding quick wins…",
];

const tone = (s: number) => (s >= 90 ? "#22c55e" : s >= 50 ? "#f59e0b" : "#ef4444");

function Gauge({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const inView = useInView(num, { once: true });
  const C = 2 * Math.PI * 42;

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (num.current) num.current.textContent = String(Math.round(v));
        if (ref.current) ref.current.style.strokeDashoffset = String(C - (C * v) / 100);
      },
    });
    return () => c.stop();
  }, [inView, value, delay, C]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-white/10" />
          <circle
            ref={ref}
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            stroke={tone(value)}
            strokeDasharray={C}
            strokeDashoffset={C}
          />
        </svg>
        <span
          ref={num}
          className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold"
          style={{ color: tone(value) }}
        >
          0
        </span>
      </div>
      <p className="mt-3 text-sm font-medium">{label}</p>
    </div>
  );
}

export default function AuditTool() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const run = async (target = url, mode = strategy) => {
    if (!target.trim()) return;
    setStatus("loading");
    setStep(0);
    setError("");
    try {
      const res = await fetch(`/api/audit?url=${encodeURIComponent(target.trim())}&strategy=${mode}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setResult(json);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  };

  // Auto-run when arriving from the home page teaser (/audit?url=…)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("url");
    if (q) {
      setUrl(q);
      run(q, "mobile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== "loading") return;
    const id = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 5000);
    return () => clearInterval(id);
  }, [status]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface p-6 sm:p-10">
      <div className="orb orb-lime -right-40 -top-40 h-[420px] w-[420px]" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
        className="relative flex flex-col gap-3 lg:flex-row"
      >
        <label className="flex flex-1 items-center gap-3 rounded-full border border-white/15 bg-bg px-5 focus-within:border-accent">
          <Globe size={20} className="shrink-0 text-muted" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourwebsite.com"
            aria-label="Website address"
            className="h-14 min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-white/30"
          />
        </label>
        <div className="flex gap-3">
          <div className="flex rounded-full border border-white/15 bg-bg p-1">
            {(["mobile", "desktop"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setStrategy(m)}
                aria-label={m}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  strategy === m ? "bg-ink text-bg" : "text-muted hover:text-white"
                }`}
              >
                {m === "mobile" ? <Smartphone size={18} /> : <Laptop size={18} />}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-shine flex flex-1 items-center justify-center gap-2 rounded-full bg-lime px-8 font-semibold text-black transition-colors hover:bg-ink hover:text-bg disabled:opacity-60 lg:flex-none"
          >
            {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
            Audit my site
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative mt-10 flex flex-col items-center py-10 text-center"
          >
            <div className="relative h-24 w-24">
              <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-accent" />
              <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-accent [animation-delay:1s]" />
              <span className="absolute inset-4 flex items-center justify-center rounded-full bg-lime text-black">
                <Zap size={28} />
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 font-display text-xl font-medium"
              >
                {steps[step]}
              </motion.p>
            </AnimatePresence>
            <p className="mt-2 text-sm text-muted">A real Lighthouse audit takes 20–40 seconds.</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative mt-8 flex items-start gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5"
          >
            <AlertTriangle className="mt-0.5 shrink-0 text-amber-500" size={20} />
            <div>
              <p className="font-medium">{error}</p>
              <p className="mt-1 text-sm text-muted">
                Prefer a human review?{" "}
                <Link href="/contact" className="text-accent underline-offset-4 hover:underline">
                  Request a free manual audit
                </Link>
                .
              </p>
            </div>
          </motion.div>
        )}

        {status === "done" && result && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10"
          >
            <p className="text-sm text-muted">
              Results for <span className="font-medium text-white">{result.url}</span> · {result.strategy}
            </p>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px]">
              <div>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <Gauge value={result.scores.performance} label="Performance" delay={0} />
                  <Gauge value={result.scores.seo} label="SEO" delay={0.15} />
                  <Gauge value={result.scores.accessibility} label="Accessibility" delay={0.3} />
                  <Gauge value={result.scores.bestPractices} label="Best Practices" delay={0.45} />
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {result.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-bg px-4 py-3"
                    >
                      <span className="flex items-center gap-2 text-sm text-muted">
                        <span className="h-2 w-2 rounded-full" style={{ background: tone(m.score * 100) }} />
                        {m.label}
                      </span>
                      <span className="font-display font-semibold">{m.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {result.screenshot && (
                <motion.div
                  initial={{ opacity: 0, rotate: 4, y: 30 }}
                  animate={{ opacity: 1, rotate: 0, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/15 bg-bg shadow-2xl"
                >
                  <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.screenshot} alt={`Screenshot of ${result.url}`} className="w-full" />
                </motion.div>
              )}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  {result.opportunities.length ? "Top quick wins we'd fix first" : "Your site is in great shape!"}
                </h3>
                <ul className="mt-4 space-y-2">
                  {result.opportunities.map((o) => (
                    <li key={o.title} className="flex items-center justify-between gap-4 border-b border-white/10 py-3">
                      <span>{o.title}</span>
                      {o.savings && <span className="shrink-0 text-sm text-accent">{o.savings}</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-4 font-semibold text-black transition-colors hover:bg-ink hover:text-bg"
              >
                Get a free fix plan
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
