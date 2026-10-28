import SplitText from "./SplitText";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      </Reveal>
      <SplitText
        text={title}
        highlight={highlight}
        className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      />
      {text && (
        <Reveal delay={0.2}>
          <p className={`mt-6 text-lg leading-relaxed text-muted ${center ? "mx-auto max-w-2xl" : ""}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
