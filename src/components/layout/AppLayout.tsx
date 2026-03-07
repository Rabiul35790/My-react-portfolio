import type { ReactNode } from "react";
import { BackgroundLayers } from "../effects/BackgroundLayers";
import { CustomCursor } from "../effects/CustomCursor";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <BackgroundLayers />
      <CustomCursor />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
