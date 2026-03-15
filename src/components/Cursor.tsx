import { memo } from "react";
import { useCursor } from "../hooks/useCursor";

function CursorBase() {
  const { crossRef, lineXRef, lineYRef, labelRef, pulseRef } = useCursor();

  return (
    <>
      <div ref={lineXRef} className="cursor-line-x" />
      <div ref={lineYRef} className="cursor-line-y" />
      <div ref={crossRef} className="cursor-cross">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={pulseRef} className="cursor-pulse" />
    </>
  );
}

export const Cursor = memo(CursorBase);
