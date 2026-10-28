"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="mt-8 flex max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pl-5 focus-within:border-accent/50"
    >
      <input
        type="email"
        required
        placeholder="Your email for growth tips"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-black transition-transform hover:scale-110"
      >
        {done ? <Check size={18} /> : <ArrowRight size={18} />}
      </button>
    </form>
  );
}
