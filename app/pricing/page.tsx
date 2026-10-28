import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import PageHero from "@/components/PageHero";
import PricingPlans from "@/components/PricingPlans";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent packages for websites, SEO and growth marketing. No hidden fees, cancel anytime.",
};

const rows: [string, boolean | string, boolean | string, boolean | string][] = [
  ["Custom website", "5 pages", "15 pages", "Unlimited"],
  ["Headless CMS", false, true, true],
  ["Technical SEO setup", true, true, true],
  ["Monthly content", false, "8 articles", "Custom"],
  ["Google Ads management", false, true, true],
  ["Meta (Facebook & Instagram) Ads", false, true, true],
  ["Social media content", false, "12 posts/mo", "Custom"],
  ["Mobile app development", false, false, true],
  ["Dedicated account manager", false, true, true],
  ["Support", "1 month", "Ongoing", "24/7 SLA"],
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check size={18} className="mx-auto text-accent" />;
  if (v === false) return <Minus size={18} className="mx-auto text-white/20" />;
  return <span className="text-sm">{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing. Serious results."
        highlight={["Serious"]}
        text="Transparent packages for every stage. No lock-in contracts, no hidden fees — just senior talent focused on growing your business."
      />

      <section className="pb-24">
        <div className="container-x">
          <PricingPlans />
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading center eyebrow="Compare" title="What's in each plan." highlight={["each"]} />
          <Reveal className="mt-14 overflow-x-auto rounded-[2rem] border border-white/10">
            <table className="w-full min-w-[640px] text-center">
              <thead>
                <tr className="border-b border-white/10 bg-surface">
                  <th className="p-6 text-left font-display text-lg font-semibold">Features</th>
                  <th className="p-6 font-display text-lg font-semibold">Starter</th>
                  <th className="p-6 font-display text-lg font-semibold text-accent">Growth</th>
                  <th className="p-6 font-display text-lg font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, ...vals]) => (
                  <tr key={name} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                    <td className="p-5 text-left text-white/80">{name}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="p-5">
                        <Cell v={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Pricing questions." highlight={["Pricing"]} />
          <Reveal>
            <FAQ />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
