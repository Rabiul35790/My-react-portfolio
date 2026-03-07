export function BackgroundLayers() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-bg-primary" />

      <div className="absolute -top-40 left-[-12%] h-[34rem] w-[34rem] rounded-full bg-accent-primary/18 blur-3xl" />
      <div className="absolute right-[-14%] top-[12%] h-[32rem] w-[32rem] rounded-full bg-accent-secondary/14 blur-3xl" />
      <div className="absolute bottom-[-20%] left-[40%] h-[30rem] w-[30rem] rounded-full bg-accent-primary/10 blur-3xl" />

      <div className="app-grid-texture absolute inset-0 opacity-40" />
      <div className="app-vignette absolute inset-0" />
      <div className="app-noise-texture absolute inset-0 opacity-[0.06]" />
    </div>
  );
}
