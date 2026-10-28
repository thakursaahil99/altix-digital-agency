import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import CTASection from "@/components/CTASection";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import ParallaxImage from "@/components/ParallaxImage";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import { projects, services } from "@/lib/data";
import WorkCardSmall from "@/components/WorkCardSmall";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.title, description: s.short, openGraph: { images: [s.image] } };
}

const categoryFor: Record<string, string> = {
  "web-development": "Web",
  "app-development": "App",
  seo: "SEO",
  "google-ads": "Growth",
  "meta-ads": "Growth",
  "social-media-marketing": "Growth",
  "growth-marketing": "Growth",
  "ui-ux-design": "Design",
  ecommerce: "Growth",
};

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const cat = categoryFor[slug];
  const related = [...projects.filter((p) => p.category === cat), ...projects.filter((p) => p.category !== cat)].slice(0, 2);
  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={service.title}
        crumbs={[{ href: "/services", label: "Services" }]}
        title={service.title}
        text={service.description}
      />

      <section className="pb-24">
        <div className="container-x">
          <ParallaxImage
            src={service.image}
            alt={service.title}
            priority
            sizes="100vw"
            className="aspect-[16/9] rounded-[2rem] border border-white/10 sm:aspect-[21/9]"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {service.outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.1}>
                <div className="rounded-3xl border border-white/10 bg-surface p-8">
                  <p className="font-display text-5xl font-semibold text-accent">{o.value}</p>
                  <p className="mt-2 text-muted">{o.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow="What's included"
            title="Everything handled, end to end."
            highlight={["end"]}
            text="A dedicated squad covers strategy, execution and reporting, so you can focus on running your business."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {service.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.06}>
                <li className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-black">
                    <Check size={16} />
                  </span>
                  <span className="pt-1 font-medium">{f}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-white/40">Tools & tech we use</p>
        </div>
        <Marquee duration={25}>
          {service.stack.concat(service.stack).map((t, i) => (
            <span key={i} className="mx-6 font-display text-4xl font-semibold text-white/20 sm:text-6xl">
              {t} <span className="text-accent">/</span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Case studies" title="Proof, not promises." highlight={["Proof,"]} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <WorkCardSmall project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <h2 className="font-display text-3xl font-semibold">Explore other services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-surface p-5 transition-colors hover:border-accent hover:bg-lime hover:text-black"
              >
                <span className="flex items-center gap-3">
                  <ServiceIcon name={s.icon} size={20} />
                  <span className="font-medium">{s.title}</span>
                </span>
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
