import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insights",
  description: "Guides and playbooks on web development, SEO, paid ads and growth from the Altix Digital team.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Playbooks from the growth lab."
        highlight={["growth"]}
        text="Practical, no-fluff guides on development, SEO, ads and design — written by the people doing the work."
      />

      <section className="pb-16">
        <div className="container-x">
          <Reveal>
            <Link
              href="/blog"
              data-cursor="Read"
              className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-surface lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="w-fit rounded-full bg-lime px-3 py-1 text-xs font-semibold text-black">
                  Featured · {featured.category}
                </span>
                <h2 className="mt-6 font-display text-3xl font-semibold leading-tight transition-colors group-hover:text-accent sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-lg text-muted">{featured.excerpt}</p>
                <p className="mt-8 flex items-center gap-2 text-sm text-white/50">
                  <Clock size={14} /> {featured.read} read · {featured.date}
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.1}>
              <TiltCard max={6} className="h-full rounded-3xl">
                <Link
                  href="/blog"
                  data-cursor="Read"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 theme-dark rounded-full bg-black/60 px-3 py-1 text-xs backdrop-blur-sm">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-6 text-sm text-white/50">
                      <span>
                        {p.date} · {p.read}
                      </span>
                      <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45 group-hover:text-accent" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
