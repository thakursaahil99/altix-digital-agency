import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SplitText from "./SplitText";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  text,
  crumbs = [],
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  text?: string;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
      <div className="grid-bg absolute inset-0" />
      <div className="orb orb-violet animate-float-a -right-40 -top-40 h-[560px] w-[560px]" />
      <div className="orb orb-lime animate-float-b -left-40 top-20 h-[420px] w-[420px]" />

      <div className="container-x relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/50">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.href} className="flex items-center gap-1.5">
                <ChevronRight size={14} />
                <Link href={c.href} className="hover:text-accent">
                  {c.label}
                </Link>
              </span>
            ))}
            <ChevronRight size={14} />
            <span className="text-accent">{eyebrow}</span>
          </nav>
        </Reveal>
        <SplitText
          as="h1"
          immediate
          delay={0.35}
          text={title}
          highlight={highlight}
          className="mt-8 max-w-5xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
        />
        {text && (
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{text}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
