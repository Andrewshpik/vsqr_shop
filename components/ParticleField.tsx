"use client";

import { useEffect, useRef } from "react";

type Filament = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  angle: number;
  rot: number;
  alpha: number;
};

const COUNT = 110;
const ACCENT = "10, 112, 100";
const ACCENT_BRIGHT = "30, 166, 147";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const particles: Filament[] = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        len: 30 + Math.random() * 90,
        angle: Math.random() * Math.PI * 2,
        rot: (Math.random() - 0.5) * 0.004,
        alpha: 0.45 + Math.random() * 0.45,
      });
    }

    const mouse = { x: 0, y: 0 };
    function onMouse(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    let raf = 0;
    let running = true;
    let t = 0;

    function frame() {
      if (!running) return;
      t += 1;
      ctx!.clearRect(0, 0, w, h);

      const drift = reduced ? 0 : 1;
      const px = mouse.x * 12;
      const py = mouse.y * 12;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * drift;
        p.y += p.vy * drift;
        p.angle += p.rot * drift;
        if (p.x < -120) p.x = w + 120;
        if (p.x > w + 120) p.x = -120;
        if (p.y < -120) p.y = h + 120;
        if (p.y > h + 120) p.y = -120;

        const depth = (p.len - 20) / 70;
        const wobble = Math.sin((t + p.x * 0.6) * 0.008) * 0.06;
        const a = p.angle + wobble;
        const dx = Math.cos(a) * p.len * 0.5;
        const dy = Math.sin(a) * p.len * 0.5;

        const cx = p.x + px * depth;
        const cy = p.y + py * depth;

        const grad = ctx!.createLinearGradient(
          cx - dx,
          cy - dy,
          cx + dx,
          cy + dy,
        );
        grad.addColorStop(0, `rgba(${ACCENT}, 0)`);
        grad.addColorStop(0.5, `rgba(${ACCENT}, ${p.alpha})`);
        grad.addColorStop(1, `rgba(${ACCENT}, 0)`);

        ctx!.beginPath();
        ctx!.moveTo(cx - dx, cy - dy);
        ctx!.lineTo(cx + dx, cy + dy);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.6 + depth * 1.0;
        ctx!.lineCap = "round";
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.arc(cx, cy, 1.8 + depth * 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT_BRIGHT}, ${Math.min(1, p.alpha + 0.25)})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }
    frame();

    function onResize() {
      resize();
    }
    function onVis() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        frame();
      }
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    />
  );
}
