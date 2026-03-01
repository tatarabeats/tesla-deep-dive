import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
  pulse: number;
}

interface Props {
  /** Number of particles */
  count?: number;
  /** Base color hue (0-360) */
  hue?: number;
  /** Speed multiplier */
  speed?: number;
  /** Connect nearby particles with lines */
  connectDistance?: number;
  /** Interactive — particles react to mouse */
  interactive?: boolean;
  /** Style variant */
  variant?: "stars" | "nebula" | "fire" | "electric" | "rain";
  /** Additional class */
  className?: string;
}

export default function ParticleField({
  count = 120,
  hue = 200,
  speed = 0.3,
  connectDistance = 100,
  interactive = true,
  variant = "stars",
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const scrollSpeedRef = useRef(0);
  const lastScrollRef = useRef(0);

  const createParticle = useCallback(
    (w: number, h: number): Particle => {
      const baseSpeed = speed * 0.5;
      switch (variant) {
        case "fire":
          return {
            x: Math.random() * w,
            y: h + Math.random() * 100,
            vx: (Math.random() - 0.5) * baseSpeed,
            vy: -Math.random() * baseSpeed * 4 - 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            hue: hue + Math.random() * 40 - 20,
            life: 0,
            maxLife: 100 + Math.random() * 150,
            pulse: Math.random() * Math.PI * 2,
          };
        case "electric":
          return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * baseSpeed * 3,
            vy: (Math.random() - 0.5) * baseSpeed * 3,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.9 + 0.1,
            hue: hue + Math.random() * 60 - 30,
            life: 0,
            maxLife: 200 + Math.random() * 200,
            pulse: Math.random() * Math.PI * 2,
          };
        case "nebula":
          return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * baseSpeed * 0.3,
            vy: (Math.random() - 0.5) * baseSpeed * 0.3,
            size: Math.random() * 6 + 2,
            opacity: Math.random() * 0.3 + 0.05,
            hue: hue + Math.random() * 80 - 40,
            life: 0,
            maxLife: 500 + Math.random() * 500,
            pulse: Math.random() * Math.PI * 2,
          };
        case "rain":
          return {
            x: Math.random() * w,
            y: -10,
            vx: (Math.random() - 0.5) * baseSpeed * 0.5,
            vy: Math.random() * baseSpeed * 6 + 2,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            hue: hue + Math.random() * 20 - 10,
            life: 0,
            maxLife: 150 + Math.random() * 100,
            pulse: 0,
          };
        default: // stars
          return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * baseSpeed,
            vy: (Math.random() - 0.5) * baseSpeed,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.7 + 0.3,
            hue: hue + Math.random() * 30 - 15,
            life: Math.random() * 300,
            maxLife: 300 + Math.random() * 300,
            pulse: Math.random() * Math.PI * 2,
          };
      }
    },
    [hue, speed, variant],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(w, h),
    );

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (interactive) {
      canvas.addEventListener("mousemove", handleMouse);
    }

    // Track scroll velocity
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScrollRef.current);
      scrollSpeedRef.current = Math.min(delta / 10, 3); // Normalized 0-3
      lastScrollRef.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);
      timeRef.current += 0.016;

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scrollBoost = 1 + scrollSpeedRef.current;
      // Decay scroll speed over time
      scrollSpeedRef.current *= 0.92;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.pulse += 0.02;

        // Life cycle
        if (p.life > p.maxLife) {
          particles[i] = createParticle(cw, ch);
          continue;
        }

        // Movement (boosted by scroll speed)
        p.x += p.vx * scrollBoost;
        p.y += p.vy * scrollBoost;

        // Mouse interaction
        if (interactive && mx > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (variant !== "fire" && variant !== "rain") {
          if (p.x < -10) p.x = cw + 10;
          if (p.x > cw + 10) p.x = -10;
          if (p.y < -10) p.y = ch + 10;
          if (p.y > ch + 10) p.y = -10;
        } else {
          if (p.y < -20 || p.y > ch + 20) {
            particles[i] = createParticle(cw, ch);
            continue;
          }
        }

        // Fading based on lifecycle
        const lifeFrac = p.life / p.maxLife;
        const fadeIn = Math.min(lifeFrac * 5, 1);
        const fadeOut = lifeFrac > 0.8 ? 1 - (lifeFrac - 0.8) / 0.2 : 1;
        const pulseFactor = 0.7 + 0.3 * Math.sin(p.pulse);
        const alpha = p.opacity * fadeIn * fadeOut * pulseFactor;

        // Draw — with scroll-speed streak effect
        ctx.beginPath();
        if (variant === "rain") {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2, p.y + p.vy * 2);
          ctx.strokeStyle = `hsla(${p.hue}, 70%, 70%, ${alpha})`;
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        } else if (scrollSpeedRef.current > 0.3) {
          // Streak/meteor effect during fast scroll
          const streakLen = scrollSpeedRef.current * 8;
          ctx.globalCompositeOperation = "lighter";
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 75%, ${alpha * 0.4})`;
          ctx.lineWidth = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * streakLen, p.y - p.vy * streakLen);
          ctx.stroke();
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 80%, 85%, ${alpha * 0.8})`;
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        } else {
          // Normal glow circle
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${alpha * 0.6})`;
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        }

        // Connection lines
        if (connectDistance > 0 && variant !== "rain" && variant !== "fire") {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectDistance) {
              const lineAlpha =
                (1 - dist / connectDistance) * 0.15 * alpha;
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${p.hue}, 60%, 60%, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouse);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count, hue, speed, connectDistance, interactive, variant, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-field ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: interactive ? "auto" : "none",
        zIndex: 1,
      }}
    />
  );
}
