import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Case studies from Altix Digital — websites, apps, SEO and growth campaigns with measurable results.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Work that moves the needle."
        highlight={["needle."]}
        text="A selection of products we've built and brands we've grown. Every project starts with a goal and ends with a number."
      />
      <section className="pb-24">
        <div className="container-x">
          <WorkGrid />
        </div>
      </section>
      <CTASection />
    </>
  );
}
