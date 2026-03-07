import { memo } from "react";
import { useCursor } from "../hooks/useCursor";

function CursorBase() {
  const { dotRef, ringRef, labelRef, pulseRef } = useCursor();

  return (
    <>
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={pulseRef} className="cursor-pulse" />
    </>
  );
}

export const Cursor = memo(CursorBase);
