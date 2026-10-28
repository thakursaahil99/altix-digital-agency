import type { Metadata } from "next";
import Image from "next/image";
import { Award, HeartHandshake, Lightbulb, Rocket } from "lucide-react";
import CTASection from "@/components/CTASection";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import ParallaxImage from "@/components/ParallaxImage";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { stats, team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Altix Digital — a team of engineers, designers, SEOs and marketers building growth for ambitious brands.",
};

const values = [
  { icon: Lightbulb, title: "Curiosity first", text: "We ask why five times before we write a line of code or a single ad." },
  { icon: Rocket, title: "Ship fast, learn faster", text: "Small releases, real data, constant iteration. Momentum beats perfection." },
  { icon: HeartHandshake, title: "Radical ownership", text: "We treat your business like ours. Your KPIs are our KPIs." },
  { icon: Award, title: "Craft matters", text: "Pixel-perfect design and clean code aren't extras — they're the baseline." },
];

const timeline = [
  { year: "2018", title: "Founded in Gurugram", text: "Started as a 3-person web studio building sites for local startups." },
  { year: "2020", title: "SEO & growth practice", text: "Launched our marketing arm after clients asked us to bring them traffic too." },
  { year: "2022", title: "Mobile apps", text: "Added React Native & Flutter teams and shipped our first 1M-download app." },
  { year: "2024", title: "Going global", text: "Opened partnerships across the UAE, UK and US with clients in 12 countries." },
  { year: "2026", title: "AI-native agency", text: "Built AI into everything — from SEO audits to automated ad testing." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We're the team behind the growth."
        highlight={["growth."]}
        text="Altix Digital is a 40-person crew of engineers, designers, SEOs and growth marketers. Since 2018 we've helped 180+ brands build products people love and grow them into category leaders."
      />

      <section className="pb-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <ParallaxImage src="/images/team-laptops.jpg" alt="Team working together" priority className="aspect-[4/5] rounded-[2rem] md:col-span-1" />
          <ParallaxImage src="/images/workspace.jpg" alt="Altix studio workspace" className="aspect-[4/5] rounded-[2rem] md:col-span-2 md:aspect-auto" speed={10} />
        </div>
      </section>

      <section className="border-y border-white/10 py-16">
        <div className="container-x grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-5xl font-semibold text-accent sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Our mission"
            title="Make world-class digital growth accessible."
            highlight={["world-class"]}
            text="Big brands have in-house teams of engineers, designers and marketers. We give ambitious startups and SMEs that same firepower — senior talent, proven playbooks and the latest tech — without the overhead."
          />
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="/images/startup.jpg"
                alt="Founders discussing a product roadmap"
                width={1400}
                height={933}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/3] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading center eyebrow="Our values" title="What drives us every day." highlight={["drives"]} />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <TiltCard className="h-full rounded-3xl">
                  <div className="h-full rounded-3xl border border-white/10 bg-surface p-8">
                    <v.icon size={32} strokeWidth={1.4} className="text-accent" />
                    <h3 className="mt-8 font-display text-xl font-semibold">{v.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Our journey" title="From a tiny studio to a global crew." highlight={["global"]} />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-5">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08} className="h-full">
                <div className="group h-full bg-bg p-8 transition-colors hover:bg-surface">
                  <p className="font-display text-4xl font-bold text-white/20 transition-colors group-hover:text-accent">
                    {t.year}
                  </p>
                  <h3 className="mt-6 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Leadership"
            title="The people you'll work with."
            highlight={["people"]}
            text="No bait-and-switch. The senior team you meet on the first call is the team that works on your project."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 0.1}>
                <div className="theme-dark group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="font-display text-2xl font-semibold">{m.name}</h3>
                    <p className="text-accent">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <Marquee duration={30}>
          {["Engineers", "Designers", "SEO Nerds", "Growth Hackers", "Strategists", "Storytellers"].map((w) => (
            <span key={w} className="mx-8 flex items-center gap-8 font-display text-5xl font-semibold text-white/15 sm:text-7xl">
              {w} <span className="text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      <CTASection />
    </>
  );
}
