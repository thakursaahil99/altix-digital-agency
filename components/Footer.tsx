import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import Marquee from "./Marquee";
import NewsletterForm from "./NewsletterForm";
import { navLinks, services, site } from "@/lib/data";

const socials = ["LinkedIn", "Instagram", "X / Twitter", "Dribbble", "Behance"];

export default function Footer() {
  return (
    <footer className="theme-dark relative overflow-hidden border-t border-white/10 bg-[#050507] pt-20">
      <div className="orb orb-violet animate-float-a -bottom-60 -left-40 h-[600px] w-[600px]" />

      <Link href="/contact" className="group block" data-cursor="Talk">
        <Marquee duration={25} className="py-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-10 pr-10 font-display text-6xl font-semibold tracking-tight text-white/90 transition-colors group-hover:text-accent sm:text-8xl"
            >
              Let&apos;s build something great
              <span className="text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </Link>

      <div className="container-x relative mt-16 grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Altix Digital is a full-stack growth agency. We build websites and apps, rank them on Google and scale them
            with data-driven marketing.
          </p>
          <NewsletterForm />
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40">Company</h4>
          <ul className="mt-5 space-y-3">
            {[...navLinks.slice(1), { href: "/audit", label: "Free Website Audit" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40">Services</h4>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/80 transition-colors hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40">Get in touch</h4>
          <ul className="mt-5 space-y-4 text-white/80">
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-accent" />
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-accent" />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
              {site.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {socials.map((s) => (
            <a
              key={s}
              href="#"
              className="group inline-flex items-center gap-1 rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 transition-colors hover:border-accent hover:text-accent"
            >
              {s}
              <ArrowUpRight size={12} className="transition-transform group-hover:rotate-45" />
            </a>
          ))}
        </div>
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
