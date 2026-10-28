import type { Metadata } from "next";
import { Accessibility, Gauge, Search, ShieldCheck } from "lucide-react";
import AuditTool from "@/components/AuditTool";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "Free Website Audit",
  description:
    "Run a free, instant Google Lighthouse audit of your website. See your performance, SEO, accessibility and Core Web Vitals scores in 30 seconds.",
};

const checks = [
  {
    icon: Gauge,
    title: "Performance",
    text: "How fast your pages load and become usable — the #1 driver of bounce rate and conversions.",
  },
  {
    icon: Search,
    title: "SEO",
    text: "Crawlability, meta tags, structured data and mobile-friendliness that Google looks for.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    text: "Contrast, labels and navigation so every visitor — and every screen reader — can use your site.",
  },
  {
    icon: ShieldCheck,
    title: "Best practices",
    text: "HTTPS, safe libraries, console errors and modern web standards that build trust.",
  },
];

export default function AuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free audit"
        title="See your website through Google's eyes."
        highlight={["Google's"]}
        text="Enter any URL to run a real Lighthouse audit — the same engine Google uses. Get your scores, Core Web Vitals and the top fixes in about 30 seconds."
      />

      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <AuditTool />
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading center eyebrow="What we check" title="Four scores that decide your growth." highlight={["growth."]} />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {checks.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <TiltCard className="h-full rounded-3xl">
                  <div className="h-full rounded-3xl border border-white/10 bg-surface p-8">
                    <c.icon size={30} strokeWidth={1.5} className="text-accent" />
                    <h3 className="mt-6 font-display text-xl font-semibold">{c.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{c.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
