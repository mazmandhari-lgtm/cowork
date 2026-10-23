"use client";

import { useRef, type PointerEvent } from "react";

export function useTiltCard<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  function handlePointerMove(e: PointerEvent<T>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--tilt-x", `${(py - 0.5) * -8}deg`);
    el.style.setProperty("--tilt-y", `${(px - 0.5) * 8}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--img-x", `${(px - 0.5) * -14}px`);
    el.style.setProperty("--img-y", `${(py - 0.5) * -14}px`);
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }

  return { ref, handlePointerMove, handlePointerLeave };
}
