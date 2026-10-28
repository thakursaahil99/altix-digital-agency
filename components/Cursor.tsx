"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      hovering = !!target;
      setLabel(target?.dataset.cursor ?? "");
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) {
        const s = hovering ? 1.8 : 1;
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${s})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full transition-[width,height,margin,background-color,border-color] duration-300 ease-out ${
          label ? "-ml-6 -mt-6 h-12 w-12 border border-transparent bg-lime" : "-ml-5 -mt-5 h-10 w-10 border border-white/40"
        }`}
      >
        {label && <span className="text-[6px] font-bold uppercase tracking-widest text-black">{label}</span>}
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-lime mix-blend-difference"
      />
    </>
  );
}
