import { useEffect, useRef } from "react";

type CursorMode = "default" | "link" | "project";

export function useCursor() {
  const crossRef = useRef<HTMLDivElement | null>(null);
  const lineXRef = useRef<HTMLDivElement | null>(null);
  const lineYRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) {
      return;
    }

    const cross = crossRef.current;
    const lineX = lineXRef.current;
    const lineY = lineYRef.current;
    const label = labelRef.current;
    const pulse = pulseRef.current;

    if (!cross || !lineX || !lineY || !label || !pulse) {
      return;
    }

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    const deadZone = 6;
    const followEase = 0.065;
    let mode: CursorMode = "default";

    const renderMode = () => {
      cross.dataset.mode = mode;
      label.textContent = mode === "project" ? "VIEW" : "";
    };

    const move = (event: PointerEvent) => {
      const dx = Math.abs(event.clientX - x);
      const dy = Math.abs(event.clientY - y);

      if (dx > deadZone || dy > deadZone) {
        x = event.clientX;
        y = event.clientY;
      }

      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('[data-cursor="project"]')) {
        mode = "project";
      } else if (target?.closest("a,button,[data-cursor='interactive']")) {
        mode = "link";
      } else {
        mode = "default";
      }

      renderMode();
    };

    const click = (event: PointerEvent) => {
      pulse.style.left = `${event.clientX}px`;
      pulse.style.top = `${event.clientY}px`;
      pulse.classList.remove("cursor-pulse-active");
      window.requestAnimationFrame(() => pulse.classList.add("cursor-pulse-active"));
    };

    const loop = () => {
      rx += (x - rx) * followEase;
      ry += (y - ry) * followEase;

      cross.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      lineX.style.transform = `translate3d(0, ${ry}px, 0)`;
      lineY.style.transform = `translate3d(${rx}px, 0, 0)`;

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
    };
  }, []);

  return { crossRef, lineXRef, lineYRef, labelRef, pulseRef };
}
