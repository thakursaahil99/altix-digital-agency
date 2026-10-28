import Image from "next/image";
import Button from "./Button";
import SplitText from "./SplitText";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface px-6 py-20 text-center sm:px-16">
          <Image
            src="/images/network.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg" />
          <div className="orb orb-lime animate-float-a -left-32 -top-32 h-[420px] w-[420px]" />
          <div className="orb orb-violet animate-float-b -bottom-32 -right-32 h-[420px] w-[420px]" />

          <div className="relative">
            <Reveal>
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Ready when you are</span>
            </Reveal>
            <SplitText
              text="Let's turn your idea into growth."
              highlight={["growth"]}
              className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
                Book a free 30-minute strategy call. We&apos;ll audit your site, spot quick wins and map out a plan —
                no strings attached.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Book a free call</Button>
              <Button href="/work" variant="ghost">
                See our work
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
