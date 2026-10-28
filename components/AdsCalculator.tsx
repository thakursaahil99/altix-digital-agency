"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion } from "motion/react";
import { ArrowUpRight, Megaphone, MousePointerClick } from "lucide-react";

type Platform = "google" | "meta";

const presets: Record<Platform, { cpc: number; cr: number }> = {
  google: { cpc: 28, cr: 3.5 },
  meta: { cpc: 12, cr: 1.8 },
};

// Typical gains we model for an optimised account; shown to visitors as an estimate.
const LIFT = { cpc: 0.75, cr: 1.4 };

const inr = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(2)}Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2)}L` : `₹${Math.round(n).toLocaleString("en-IN")}`;

function Num({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    const c = animate(prev.current, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    prev.current = value;
    return () => c.stop();
  }, [value, format]);
  return <span ref={ref}>{format(value)}</span>;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-display text-lg font-semibold">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="range mt-3 w-full"
        style={{ background: `linear-gradient(90deg, var(--accent) ${pct}%, color-mix(in oklab, var(--fg) 12%, transparent) ${pct}%)` }}
      />
    </label>
  );
}

export default function AdsCalculator({ initial = "google" }: { initial?: Platform }) {
  const [platform, setPlatform] = useState<Platform>(initial);
  const [budget, setBudget] = useState(100000);
  const [cpc, setCpc] = useState(presets[initial].cpc);
  const [cr, setCr] = useState(presets[initial].cr);
  const [aov, setAov] = useState(2500);

  const pick = (p: Platform) => {
    setPlatform(p);
    setCpc(presets[p].cpc);
    setCr(presets[p].cr);
  };

  const now = (() => {
    const clicks = budget / cpc;
    const conv = (clicks * cr) / 100;
    return { clicks, conv, revenue: conv * aov, roas: (conv * aov) / budget };
  })();
  const altix = (() => {
    const clicks = budget / (cpc * LIFT.cpc);
    const conv = (clicks * cr * LIFT.cr) / 100;
    return { clicks, conv, revenue: conv * aov, roas: (conv * aov) / budget };
  })();
  const max = Math.max(now.revenue, altix.revenue, 1);

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-surface lg:grid-cols-2">
      <div className="space-y-8 p-6 sm:p-10">
        <div className="flex rounded-full border border-white/10 bg-bg p-1">
          {(
            [
              ["google", "Google Ads", MousePointerClick],
              ["meta", "Meta Ads", Megaphone],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => pick(key)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors ${
                platform === key ? "text-black" : "text-muted hover:text-white"
              }`}
            >
              {platform === key && (
                <motion.span layoutId="calc-platform" className="absolute inset-0 rounded-full bg-lime" />
              )}
              <Icon size={16} className="relative" />
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>

        <Slider label="Monthly ad budget" value={budget} min={10000} max={1000000} step={10000} display={inr(budget)} onChange={setBudget} />
        <Slider label="Average cost per click" value={cpc} min={2} max={150} step={1} display={`₹${cpc}`} onChange={setCpc} />
        <Slider label="Conversion rate" value={cr} min={0.5} max={10} step={0.1} display={`${cr.toFixed(1)}%`} onChange={setCr} />
        <Slider label="Average order / deal value" value={aov} min={500} max={100000} step={500} display={inr(aov)} onChange={setAov} />
      </div>

      <div className="theme-dark relative flex flex-col justify-between gap-8 overflow-hidden bg-[#0b0b10] p-6 sm:p-10">
        <div className="orb orb-violet -right-32 -top-32 h-[380px] w-[380px]" />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.25em] text-white/50">Projected monthly revenue with Altix</p>
          <p className="mt-3 font-display text-5xl font-bold text-lime sm:text-6xl">
            <Num value={altix.revenue} format={inr} />
          </p>
          <p className="mt-2 text-white/60">
            vs <Num value={now.revenue} format={inr} /> today ·{" "}
            <span className="font-semibold text-lime">
              +<Num value={(altix.revenue / Math.max(now.revenue, 1) - 1) * 100} format={(n) => `${Math.round(n)}%`} />
            </span>
          </p>
        </div>

        <div className="relative space-y-4">
          {[
            ["Today", now.revenue, "bg-white/25"],
            ["With Altix", altix.revenue, "bg-lime"],
          ].map(([label, v, cls]) => (
            <div key={label as string}>
              <div className="mb-1.5 flex justify-between text-xs text-white/60">
                <span>{label}</span>
                <span>{inr(v as number)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`h-full rounded-full ${cls}`}
                  animate={{ width: `${((v as number) / max) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-3 gap-3">
          {[
            ["Clicks", <Num key="c" value={altix.clicks} format={(n) => Math.round(n).toLocaleString("en-IN")} />],
            ["Conversions", <Num key="v" value={altix.conv} format={(n) => Math.round(n).toLocaleString("en-IN")} />],
            ["ROAS", <Num key="r" value={altix.roas} format={(n) => `${n.toFixed(1)}x`} />],
          ].map(([label, node]) => (
            <div key={label as string} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/50">{label}</p>
              <p className="mt-1 font-display text-xl font-semibold">{node}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <Link
            href="/contact"
            className="btn-shine group flex items-center justify-center gap-2 rounded-full bg-lime py-4 font-semibold text-black transition-colors hover:bg-white"
          >
            Get my custom ads plan
            <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
          </Link>
          <p className="mt-3 text-center text-xs text-white/40">
            Illustrative estimate assuming ~25% lower CPC and ~40% higher conversion rate after optimisation. Actual
            results vary by industry.
          </p>
        </div>
      </div>
    </div>
  );
}
