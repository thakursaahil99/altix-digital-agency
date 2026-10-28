import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import PageHero from "@/components/PageHero";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import TiltCard from "@/components/TiltCard";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, app development, SEO, growth marketing, UI/UX design and e-commerce — all under one roof at Altix Digital.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full-stack services for full-funnel growth."
        highlight={["full-funnel"]}
        text="Pick one service or bring us in end-to-end. Either way, you get a senior team that thinks about design, technology and marketing together."
      />

      <section className="pb-24">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.1}>
              <TiltCard max={8} className="h-full rounded-[2rem]">
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="Explore"
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-surface transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                    <span className="absolute bottom-4 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-black transition-transform duration-500 group-hover:-rotate-12">
                      <ServiceIcon name={s.icon} size={26} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-4">
                    <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
                    <p className="mt-3 leading-relaxed text-muted">{s.short}</p>
                    <ul className="mt-6 space-y-2">
                      {s.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                          <Check size={16} className="text-accent" /> {f}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-accent">
                      Explore service
                      <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Process"
              title="How every engagement runs."
              highlight={["engagement"]}
              text="Whether it's a 4-week website or a year-long growth retainer, the rhythm is the same: understand deeply, plan clearly, build in the open and keep improving."
            />
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Good questions." highlight={["Good"]} />
          <Reveal>
            <FAQ />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
