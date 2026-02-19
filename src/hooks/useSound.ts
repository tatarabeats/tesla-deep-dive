import { useCallback, useRef } from 'react';
import { useGame } from '../store/gameContext';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3,
) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

const sounds = {
  click: () => {
    playTone(800, 0.05, 'sine', 0.1);
  },
  explore: () => {
    playTone(523.25, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(659.25, 0.1, 'sine', 0.2), 80);
    setTimeout(() => playTone(783.99, 0.15, 'sine', 0.25), 160);
  },
  deeper: () => {
    playTone(440, 0.08, 'sine', 0.15);
    setTimeout(() => playTone(349.23, 0.1, 'sine', 0.15), 60);
    setTimeout(() => playTone(293.66, 0.15, 'sine', 0.2), 120);
  },
  levelUp: () => {
    const melody = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    melody.forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 0.2, 'sine', 0.25);
        playTone(freq * 0.5, 0.2, 'sine', 0.1);
      }, i * 100);
    });
  },
  branchComplete: () => {
    const notes = [523.25, 587.33, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 0.25, 'sine', 0.2);
        if (i === notes.length - 1) {
          playTone(freq * 1.5, 0.4, 'sine', 0.15);
        }
      }, i * 120);
    });
  },
  bookmark: () => {
    playTone(1046.5, 0.08, 'sine', 0.15);
    setTimeout(() => playTone(1318.51, 0.1, 'sine', 0.2), 60);
  },
};

export type SoundName = keyof typeof sounds;

export function useSound() {
  const { userProfile } = useGame();
  const lastPlayRef = useRef(0);

  const play = useCallback((name: SoundName) => {
    if (!userProfile.soundEnabled) return;
    const now = Date.now();
    if (now - lastPlayRef.current < 50) return;
    lastPlayRef.current = now;

    try {
      sounds[name]();
    } catch {
      // Audio context may fail silently
    }
  }, [userProfile.soundEnabled]);

  return { play };
}
