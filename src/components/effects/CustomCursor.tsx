import { useEffect, useRef } from "react";

type CursorState = "default" | "interactive";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  '[data-cursor="interactive"]',
].join(", ");

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!finePointer.matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) {
      return;
    }

    let rafId = 0;
    let state: CursorState = "default";
    let pressed = false;
    let visible = false;

    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.5;
    let ringX = pointerX;
    let ringY = pointerY;

    const show = () => {
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hide = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const updateVisualState = () => {
      const ringScale = state === "interactive" ? (pressed ? 1.08 : 1.16) : pressed ? 0.92 : 1;
      const dotScale = pressed ? 0.82 : 1;

      ring.dataset.state = state;
      ring.style.setProperty("--cursor-ring-scale", String(ringScale));
      dot.style.setProperty("--cursor-dot-scale", String(dotScale));
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!visible) {
        show();
      }

      const interactiveTarget = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
      state = interactiveTarget ? "interactive" : "default";
      updateVisualState();
    };

    const onPointerDown = () => {
      pressed = true;
      updateVisualState();
    };

    const onPointerUp = () => {
      pressed = false;
      updateVisualState();
    };

    const onMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        hide();
      }
    };

    const animate = () => {
      const ringLerp = 0.17;
      ringX += (pointerX - ringX) * ringLerp;
      ringY += (pointerY - ringY) * ringLerp;

      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%) scale(var(--cursor-dot-scale))`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(var(--cursor-ring-scale))`;

      rafId = window.requestAnimationFrame(animate);
    };

    dot.style.opacity = "0";
    ring.style.opacity = "0";
    updateVisualState();
    rafId = window.requestAnimationFrame(animate);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("blur", hide);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", hide);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div aria-hidden className="custom-cursor">
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
