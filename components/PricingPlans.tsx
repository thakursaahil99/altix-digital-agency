"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { plans } from "@/lib/data";
import TiltCard from "./TiltCard";

export default function PricingPlans() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <div className="relative flex rounded-full border border-white/10 bg-surface p-1.5">
          {[false, true].map((y) => (
            <button
              key={String(y)}
              onClick={() => setYearly(y)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                yearly === y ? "text-black" : "text-white/70"
              }`}
            >
              {yearly === y && (
                <motion.span
                  layoutId="billing"
                  className="absolute inset-0 rounded-full bg-lime"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {y ? "Yearly" : "Monthly"}
                {y && <span className="ml-2 text-xs opacity-70">-16%</span>}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const price = yearly ? plan.price.yearly : plan.price.monthly;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard max={6} className="h-full rounded-[2rem]">
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-8 sm:p-10 ${
                    plan.highlight ? "border-accent bg-lime text-black" : "border-white/10 bg-surface"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute right-6 top-6 rounded-full bg-black px-3 py-1 text-xs font-semibold text-lime">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
                  <p className={`mt-2 text-sm ${plan.highlight ? "text-black/70" : "text-muted"}`}>{plan.description}</p>
                  <div className="mt-8 flex items-end gap-1">
                    {price ? (
                      <>
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-display text-5xl font-bold tracking-tight"
                        >
                          ₹{price.toLocaleString("en-IN")}
                        </motion.span>
                        <span className={`pb-2 text-sm ${plan.highlight ? "text-black/60" : "text-muted"}`}>/mo</span>
                      </>
                    ) : (
                      <span className="font-display text-5xl font-bold tracking-tight">Custom</span>
                    )}
                  </div>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check size={18} className={`shrink-0 ${plan.highlight ? "text-black" : "text-accent"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`group mt-auto flex items-center justify-center gap-2 rounded-full py-4 pt-4 text-sm font-semibold transition-colors ${
                      plan.highlight ? "bg-black text-lime hover:bg-black/80" : "bg-white/5 hover:bg-lime hover:text-black"
                    }`}
                    style={{ marginTop: "2.5rem" }}
                  >
                    {price ? "Get started" : "Talk to sales"}
                    <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                  </Link>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
