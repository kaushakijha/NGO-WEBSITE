"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  speed?: number;
  maxSize?: number;
}

export default function ParticleField({
  className = "",
  particleCount = 40,
  speed = 0.3,
  maxSize = 4,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * maxSize + 1,
        speedX: (Math.random() - 0.5) * speed,
        speedY: -Math.random() * speed - 0.1,
        opacity: Math.random() * 0.6 + 0.1,
        hue: Math.random() > 0.5 ? 150 : 45, // green or gold
      });
    }
    particlesRef.current = particles;
  }, [particleCount, speed, maxSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        if (particlesRef.current.length === 0) {
          initParticles(canvas.width, canvas.height);
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Gentle sway
        p.x += Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.2;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const color = p.hue === 150
          ? `rgba(31, 169, 113, ${p.opacity})`
          : `rgba(212, 165, 55, ${p.opacity * 0.7})`;
        ctx.fillStyle = color;
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        const glowColor = p.hue === 150
          ? `rgba(31, 169, 113, ${p.opacity * 0.1})`
          : `rgba(212, 165, 55, ${p.opacity * 0.08})`;
        ctx.fillStyle = glowColor;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
