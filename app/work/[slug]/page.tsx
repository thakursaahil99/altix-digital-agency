import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import Counter from "@/components/Counter";
import PageHero from "@/components/PageHero";
import ParallaxImage from "@/components/ParallaxImage";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: { images: [p.image] } };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  return (
    <>
      <PageHero eyebrow={p.client} crumbs={[{ href: "/work", label: "Work" }]} title={p.title} text={p.summary} />

      <section className="pb-16">
        <div className="container-x">
          <Reveal className="mb-10 grid gap-6 border-y border-white/10 py-8 sm:grid-cols-4">
            {[
              ["Client", p.client],
              ["Category", p.category],
              ["Year", p.year],
              ["Stack", p.tags.join(", ")],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs uppercase tracking-widest text-white/40">{k}</p>
                <p className="mt-2 font-medium">{v}</p>
              </div>
            ))}
          </Reveal>
          <ParallaxImage
            src={p.image}
            alt={p.title}
            priority
            sizes="100vw"
            className="aspect-[16/9] rounded-[2rem] border border-white/10"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-accent">The challenge</span>
            <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">{p.challenge}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Our solution</span>
            <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">{p.solution}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] bg-lime p-10 text-black sm:p-16">
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">The results</p>
            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              {p.results.map((r, i) => {
                const num = parseFloat(r.value.replace(/[^\d.]/g, ""));
                const isPlain = /^\d+$/.test(r.value);
                return (
                  <Reveal key={r.label} delay={i * 0.1}>
                    <p className="font-display text-6xl font-bold tracking-tight sm:text-7xl">
                      {isPlain ? <Counter value={num} /> : r.value}
                    </p>
                    <p className="mt-2 text-lg font-medium text-black/70">{r.label}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-4 sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="group rounded-3xl border border-white/10 bg-surface p-8 transition-colors hover:border-accent/50"
          >
            <span className="flex items-center gap-2 text-sm text-muted">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Previous project
            </span>
            <p className="mt-3 font-display text-2xl font-semibold group-hover:text-accent">{prev.title}</p>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group rounded-3xl border border-white/10 bg-surface p-8 text-right transition-colors hover:border-accent/50"
          >
            <span className="flex items-center justify-end gap-2 text-sm text-muted">
              Next project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
            <p className="mt-3 font-display text-2xl font-semibold group-hover:text-accent">{next.title}</p>
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
