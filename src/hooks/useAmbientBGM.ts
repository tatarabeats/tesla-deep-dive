import { useState, useEffect, useRef, useCallback } from "react";

export function useAmbientBGM() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/bgm.mp3`);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleFirstScroll = () => {
      if (startedRef.current) return;
      const audio = audioRef.current;
      if (!audio || isMuted) return;
      audio.play().catch(() => {});
      startedRef.current = true;
    };

    window.addEventListener("scroll", handleFirstScroll, {
      once: true,
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleFirstScroll);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        audio.pause();
      } else {
        if (startedRef.current) {
          audio.play().catch(() => {});
        }
      }
      return next;
    });
  }, []);

  return { isMuted, toggleMute };
}
