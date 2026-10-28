import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Megaphone, MousePointerClick, Share2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const channels = [
  {
    href: "/services/google-ads",
    icon: MousePointerClick,
    title: "Google Ads",
    text: "Search, Shopping, YouTube & Performance Max — show up the moment buyers search.",
    image: "/images/ads-analytics.jpg",
    stats: [
      ["6.1x", "ROAS"],
      ["-42%", "CPA"],
    ],
  },
  {
    href: "/services/meta-ads",
    icon: Megaphone,
    title: "Meta Ads",
    text: "Facebook & Instagram campaigns with Reels creatives, Advantage+ and Conversions API.",
    image: "/images/social.jpg",
    stats: [
      ["5.4x", "ROAS"],
      ["-38%", "CPL"],
    ],
  },
  {
    href: "/services/social-media-marketing",
    icon: Share2,
    title: "Social Media",
    text: "Content, community and influencer campaigns that grow an audience that buys.",
    image: "/images/social-phone.jpg",
    stats: [
      ["10x", "Followers"],
      ["8.2%", "Engagement"],
    ],
  },
];

export default function AdsSpotlight() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="orb orb-cyan -left-40 top-10 h-[500px] w-[500px]" />
      <div className="container-x relative">
        <SectionHeading
          center
          eyebrow="Performance marketing"
          title="Paid ads that actually pay back."
          highlight={["pay", "back."]}
          text="Google Ads and Meta Ads certified specialists managing ₹40Cr+ in ad spend. Every campaign is tracked to revenue — not clicks."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.1}>
              <TiltCard max={7} className="h-full rounded-[2rem]">
                <Link
                  href={c.href}
                  data-cursor="Explore"
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-surface transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                    <div className="absolute right-4 top-4 flex gap-2">
                      {c.stats.map(([v, l]) => (
                        <span key={l} className="theme-dark rounded-full bg-black/60 px-3 py-1 text-xs backdrop-blur-sm">
                          <b className="text-accent">{v}</b> {l}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7 pt-2">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime text-black transition-transform duration-500 group-hover:-rotate-12">
                      <c.icon size={22} />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold">{c.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                      Learn more <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
