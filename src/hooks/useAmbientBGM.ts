import { useState, useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// Scroll positions aligned with ScrollStory.tsx bgHue breakpoints
const BREAKS = [0, 0.15, 0.3, 0.5, 0.65, 0.8, 0.9, 1.0] as const;

const TRACKS = [
  "bgm-prologue.ogg",
  "bgm-ch1.ogg",
  "bgm-ch2.ogg",
  "bgm-ch3.ogg",
  "bgm-ch4.ogg",
  "bgm-ch5.ogg",
  "bgm-ch6.ogg",
  "bgm-epilogue.ogg",
] as const;

const VOLUME = 0.12;
const FADE_MS = 1500;
const STEP_MS = 50;
const FADE_STEPS = FADE_MS / STEP_MS;

function getChapter(progress: number): number {
  for (let i = BREAKS.length - 2; i >= 0; i--) {
    if (progress >= BREAKS[i]) return i;
  }
  return 0;
}

export function useAmbientBGM() {
  const [isMuted, setIsMuted] = useState(false);
  const currentRef = useRef<HTMLAudioElement | null>(null);
  const chapterRef = useRef<number>(-1);
  const isMutedRef = useRef(false);
  const startedRef = useRef(false);

  const { scrollYProgress } = useScroll();

  // Keep muted ref in sync for use inside callbacks
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  function fadeOut(audio: HTMLAudioElement) {
    const start = audio.volume;
    let step = 0;
    const id = setInterval(() => {
      step++;
      audio.volume = Math.max(0, start * (1 - step / FADE_STEPS));
      if (step >= FADE_STEPS) {
        clearInterval(id);
        audio.pause();
        audio.src = "";
      }
    }, STEP_MS);
  }

  function fadeIn(audio: HTMLAudioElement) {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(v + VOLUME / FADE_STEPS, VOLUME);
      audio.volume = v;
      if (v >= VOLUME) clearInterval(id);
    }, STEP_MS);
  }

  function switchToChapter(ch: number) {
    if (ch === chapterRef.current) return;

    const old = currentRef.current;
    if (old) fadeOut(old);

    const base = import.meta.env.BASE_URL;
    const next = new Audio(`${base}audio/${TRACKS[ch]}`);
    next.loop = true;
    currentRef.current = next;
    chapterRef.current = ch;

    if (!isMutedRef.current && startedRef.current) {
      next.volume = 0;
      next.play().catch(() => {});
      fadeIn(next);
    }
  }

  // First scroll → start prologue track
  useEffect(() => {
    const handler = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      if (isMutedRef.current) return;

      const base = import.meta.env.BASE_URL;
      const audio = new Audio(`${base}audio/${TRACKS[0]}`);
      audio.loop = true;
      audio.volume = 0;
      currentRef.current = audio;
      chapterRef.current = 0;
      audio.play().catch(() => {});
      fadeIn(audio);
    };

    window.addEventListener("scroll", handler, { once: true, passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Chapter change detection via scroll progress
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!startedRef.current) return;
    switchToChapter(getChapter(v));
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const a = currentRef.current;
      if (a) {
        a.pause();
        a.src = "";
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      isMutedRef.current = next;
      const a = currentRef.current;
      if (!a) return next;
      if (next) {
        a.pause();
      } else if (startedRef.current) {
        a.play().catch(() => {});
      }
      return next;
    });
  }, []);

  return { isMuted, toggleMute };
}
