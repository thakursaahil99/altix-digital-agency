import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

export default function WorkCardSmall({ project: p }: { project: Project }) {
  return (
    <Link href={`/work/${p.slug}`} data-cursor="Open" className="group block">
      <div className="theme-dark relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-accent">{p.client}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">{p.title}</h3>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-black transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
