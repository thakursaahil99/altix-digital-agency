import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Altix Digital home" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-lime">
        <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]" fill="none">
          <path d="M12 3 3 21h4.2L12 11.4 16.8 21H21L12 3Z" fill="#000" />
          <circle cx="12" cy="17" r="1.8" fill="#000" />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        Altix<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
