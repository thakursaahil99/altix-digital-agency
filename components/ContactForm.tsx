"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Send } from "lucide-react";

const interests = [
  "Website",
  "Mobile App",
  "SEO",
  "Google Ads",
  "Meta Ads",
  "Social Media",
  "UI/UX",
  "E-commerce",
];
const budgets = ["< ₹1L", "₹1L – 3L", "₹3L – 10L", "₹10L+"];

export default function ContactForm() {
  const [picked, setPicked] = useState<string[]>(["Website"]);
  const [budget, setBudget] = useState(budgets[1]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const toggle = (v: string) => setPicked((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Hook this up to your API route / form service (Formspree, Resend, etc.)
    setTimeout(() => setStatus("sent"), 1200);
  };

  const field =
    "peer w-full border-b border-white/15 bg-transparent pb-3 pt-6 text-lg outline-none transition-colors placeholder:text-transparent focus:border-accent";
  const label =
    "pointer-events-none absolute left-0 top-6 text-white/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[520px] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-lime text-black"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h3 className="mt-8 font-display text-3xl font-semibold">Message received!</h3>
            <p className="mt-3 max-w-sm text-muted">
              Thanks for reaching out. A strategist from our team will get back to you within 24 hours.
            </p>
            <button onClick={() => setStatus("idle")} className="mt-8 text-sm text-accent underline-offset-4 hover:underline">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={onSubmit} className="space-y-8">
            <div>
              <p className="mb-4 text-sm text-white/60">I&apos;m interested in…</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => toggle(i)}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      picked.includes(i) ? "bg-lime text-black" : "border border-white/15 text-white/70 hover:border-white/40"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="relative">
                <input id="name" required placeholder="Name" className={field} />
                <label htmlFor="name" className={label}>
                  Your name *
                </label>
              </div>
              <div className="relative">
                <input id="email" type="email" required placeholder="Email" className={field} />
                <label htmlFor="email" className={label}>
                  Email address *
                </label>
              </div>
              <div className="relative">
                <input id="company" placeholder="Company" className={field} />
                <label htmlFor="company" className={label}>
                  Company
                </label>
              </div>
              <div className="relative">
                <input id="phone" type="tel" placeholder="Phone" className={field} />
                <label htmlFor="phone" className={label}>
                  Phone
                </label>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm text-white/60">Project budget</p>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      budget === b ? "bg-ink text-bg" : "border border-white/15 text-white/70 hover:border-white/40"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea id="message" required rows={4} placeholder="Message" className={`${field} resize-none`} />
              <label htmlFor="message" className={label}>
                Tell us about your project *
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-shine group flex w-full items-center justify-center gap-3 rounded-full bg-lime py-5 font-semibold text-black transition-colors hover:bg-ink hover:text-bg disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
