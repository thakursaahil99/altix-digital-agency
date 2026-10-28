import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Altix Digital. Book a free strategy call for web, app, SEO or ads.",
};

const info = [
  { icon: Mail, label: "Email us", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Call us", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Visit us", value: site.address },
  { icon: Clock, label: "Working hours", value: "Mon – Sat, 10am – 7pm IST" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something great together."
        highlight={["great"]}
        text="Tell us about your goals. We'll reply within 24 hours with next steps — or a free audit if you'd like one."
      />

      <section className="pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {info.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime/10 text-accent transition-all duration-500 group-hover:bg-lime group-hover:text-black">
                    <item.icon size={22} />
                  </span>
                  <div>
                    <p className="text-sm text-muted">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium hover:text-accent">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.35}>
              <div className="theme-dark relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src="/images/business-meeting.jpg"
                  alt="Client meeting at the Altix office"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-6 left-6 right-6 font-display text-xl font-semibold">
                  Prefer a call? Book a free 30-min strategy session.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
