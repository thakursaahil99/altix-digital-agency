import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  const styles =
    variant === "primary"
      ? "bg-lime text-black hover:bg-ink hover:text-bg"
      : "border border-white/15 text-white hover:border-white/40 hover:bg-white/5";

  return (
    <Magnetic>
      <Link
        href={href}
        className={`btn-shine group inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2 text-sm font-semibold transition-colors duration-300 ${styles} ${className}`}
      >
        {children}
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
            variant === "primary" ? "bg-black text-lime" : "bg-white/10"
          }`}
        >
          <ArrowUpRight size={18} />
        </span>
      </Link>
    </Magnetic>
  );
}
