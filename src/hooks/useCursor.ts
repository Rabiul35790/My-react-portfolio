import { useEffect, useRef } from "react";

type CursorMode = "default" | "link" | "project";

export function useCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const pulse = pulseRef.current;

    if (!dot || !ring || !label || !pulse) {
      return;
    }

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let mode: CursorMode = "default";

    const renderMode = () => {
      ring.dataset.mode = mode;
      label.textContent = mode === "project" ? "VIEW" : "";
      dot.style.opacity = mode === "link" || mode === "project" ? "0" : "1";
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

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

    const click = () => {
      pulse.style.left = `${x}px`;
      pulse.style.top = `${y}px`;
      pulse.classList.remove("cursor-pulse-active");
      window.requestAnimationFrame(() => pulse.classList.add("cursor-pulse-active"));
    };

    const loop = () => {
      rx += (x - rx) * 0.17;
      ry += (y - ry) * 0.17;

      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

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

  return { dotRef, ringRef, labelRef, pulseRef };
}
