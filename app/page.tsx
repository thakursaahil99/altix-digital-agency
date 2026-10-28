import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gauge, Rocket, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import Counter from "@/components/Counter";
import FAQ from "@/components/FAQ";
import HeroVisual from "@/components/HeroVisual";
import HorizontalWork from "@/components/HorizontalWork";
import AdsSpotlight from "@/components/AdsSpotlight";
import Marquee from "@/components/Marquee";
import ParallaxImage from "@/components/ParallaxImage";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServicesList from "@/components/ServicesList";
import SplitText from "@/components/SplitText";
import Testimonials from "@/components/Testimonials";
import TiltCard from "@/components/TiltCard";
import { clients, posts, stats } from "@/lib/data";

const reasons = [
  { icon: Gauge, title: "Performance obsessed", text: "Every site we ship scores 90+ on Lighthouse. Speed is a feature — and a ranking factor." },
  { icon: Target, title: "Revenue, not vanity", text: "We report on leads, sales and pipeline. Impressions don't pay salaries." },
  { icon: Users, title: "One senior squad", text: "Designers, engineers, SEOs and marketers in one team — no hand-offs, no gaps." },
  { icon: ShieldCheck, title: "Transparent always", text: "Live dashboards, weekly demos and fixed quotes. You always know where things stand." },
];

const tech = [
  "Next.js",
  "React",
  "Node.js",
  "Flutter",
  "React Native",
  "Shopify",
  "Figma",
  "Google Ads",
  "Meta Ads",
  "YouTube Ads",
  "LinkedIn Ads",
  "GA4",
  "Ahrefs",
  "AWS",
  "Vercel",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="grid-bg absolute inset-0" />
        <div className="orb orb-violet animate-float-a -right-60 -top-40 h-[700px] w-[700px]" />
        <div className="orb orb-lime animate-float-b -left-60 top-40 h-[560px] w-[560px]" />
        <div className="orb orb-cyan animate-float-a bottom-0 left-1/3 h-[400px] w-[400px]" />

        <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-sm">
                <span className="rounded-full bg-lime px-2.5 py-0.5 text-xs font-semibold text-black">New</span>
                <span className="text-white/70">AI-powered SEO audits are live</span>
                <Sparkles size={14} className="text-accent" />
              </span>
            </Reveal>

            <SplitText
              as="h1"
              immediate
              delay={0.3}
              text="We build, rank & scale digital brands."
              highlight={["rank", "scale"]}
              className="mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl xl:text-[5.5rem]"
            />

            <Reveal delay={0.6}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Altix is a full-stack digital agency. We design and engineer lightning-fast websites and apps, push them
                to page one of Google, and scale them with performance marketing.
              </p>
            </Reveal>

            <Reveal delay={0.75} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/contact">Start your project</Button>
              <Button href="/work" variant="ghost">
                View case studies
              </Button>
            </Reveal>

            <Reveal delay={0.9} className="mt-12 flex items-center gap-5">
              <div className="flex -space-x-3">
                {["p-woman1", "p-man1", "p-woman2", "p-man2"].map((p) => (
                  <Image
                    key={p}
                    src={`/images/${p}.jpg`}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full border-2 border-bg object-cover"
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold">
                  4.9/5 <span className="text-accent">★★★★★</span>
                </p>
                <p className="text-muted">from 180+ happy clients</p>
              </div>
            </Reveal>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="border-y border-white/10 py-10">
        <p className="mb-8 text-center text-xs uppercase tracking-[0.3em] text-white/40">
          Trusted by fast-growing teams
        </p>
        <Marquee duration={35}>
          {clients.map((c) => (
            <span
              key={c}
              className="mx-10 font-display text-3xl font-semibold tracking-tight text-white/30 transition-colors hover:text-white"
            >
              {c}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ABOUT / INTRO */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <ParallaxImage
              src="/images/office-team.jpg"
              alt="The Altix team in a strategy session"
              className="aspect-[4/5] rounded-[2rem] border border-white/10"
            />
            <Reveal delay={0.3} className="absolute -bottom-8 -right-4 sm:-right-8">
              <div className="glass rounded-3xl bg-surface/90 p-6 backdrop-blur-md">
                <p className="font-display text-5xl font-bold text-accent">
                  <Counter value={8} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-muted">Years building
                  <br />
                  digital products</p>
              </div>
            </Reveal>
          </div>

          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="A growth partner that writes code and moves numbers."
              highlight={["code", "numbers."]}
              text="Most agencies either build beautiful websites or run marketing. We do both — under one roof, with one strategy. That means your site is engineered to rank, your ads land on pages built to convert, and every decision is backed by data."
            />
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="border-l-2 border-accent/60 pl-5">
                    <p className="font-display text-4xl font-semibold sm:text-5xl">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-sm text-muted">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="Everything you need to win online."
              highlight={["win"]}
            />
            <Reveal>
              <Button href="/services" variant="ghost">
                All services
              </Button>
            </Reveal>
          </div>
          <div className="mt-16">
            <ServicesList />
          </div>
        </div>
      </section>

      {/* GOOGLE ADS / META ADS / SOCIAL */}
      <AdsSpotlight />

      {/* WORK (horizontal scroll) */}
      <HorizontalWork />

      {/* WHY US */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Why Altix"
            title="Built different. Measured by results."
            highlight={["results."]}
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <TiltCard className="h-full rounded-3xl">
                  <div className="group h-full rounded-3xl border border-white/10 bg-surface p-8 transition-colors hover:border-accent/40">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime/10 text-accent transition-all duration-500 group-hover:rotate-12 group-hover:bg-lime group-hover:text-black">
                      <r.icon size={26} strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-8 font-display text-xl font-semibold">{r.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{r.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="orb orb-violet -right-40 top-20 h-[500px] w-[500px]" />
        <div className="container-x relative grid gap-16 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title="A simple process with zero surprises."
              highlight={["zero"]}
              text="Clear milestones, weekly demos and one dedicated point of contact. From the first call to post-launch growth, you always know what's next."
            />
            <Reveal delay={0.3} className="mt-10 overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="/images/presentation.jpg"
                alt="Strategy workshop with a client"
                width={1400}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[16/10] object-cover"
              />
            </Reveal>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="py-10">
        <Marquee duration={40}>
          {tech.map((t) => (
            <span
              key={t}
              className="mx-3 flex items-center gap-3 rounded-full border border-white/10 bg-surface px-6 py-3 text-lg text-white/80"
            >
              <span className="h-2 w-2 rounded-full bg-lime" />
              {t}
            </span>
          ))}
        </Marquee>
        <div className="mt-4">
          <Marquee duration={45}>
            {[...tech].reverse().map((t) => (
              <span
                key={t}
                className="mx-3 flex items-center gap-3 rounded-full border border-white/10 px-6 py-3 text-lg text-white/50"
              >
                <Rocket size={16} className="text-cyan" />
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Client love"
              title="Don't take our word for it."
              highlight={["word"]}
              text="We've helped 180+ startups and enterprises grow. Here's what a few of them have to say."
            />
          </div>
          <Reveal>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Insights" title="Fresh from the growth lab." highlight={["growth"]} />
            <Reveal>
              <Button href="/blog" variant="ghost">
                Read the blog
              </Button>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <Link href="/blog" className="group block" data-cursor="Read">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-black">
                      {p.category}
                    </span>
                  </div>
                  <p className="mt-5 text-sm text-muted">
                    {p.date} · {p.read} read
                  </p>
                  <h3 className="mt-2 flex items-start justify-between gap-4 font-display text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
                    {p.title}
                    <ArrowUpRight size={20} className="mt-1 shrink-0 transition-transform group-hover:rotate-45" />
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions? Answered."
            highlight={["Answered."]}
            text="Can't find what you're looking for? Drop us a line and we'll reply within a day."
          />
          <Reveal>
            <FAQ />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
