"use client";

import { ParticleField } from "./ParticleField";

export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-paper" />

      {/* Soft drifting turquoise blobs */}
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <div className="blob blob-d" />

      {/* Floating filament threads */}
      <ParticleField />

      {/* Print head scanning line */}
      <div className="print-scan" />

      {/* Grain on top */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:var(--grain)] [background-size:160px_160px]" />
    </div>
  );
}
