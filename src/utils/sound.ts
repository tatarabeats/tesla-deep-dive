/**
 * Lightweight sound effects via Web Audio API
 * No external files needed — pure synthesis
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (audioCtx) return audioCtx;
  try {
    audioCtx = new AudioContext();
    return audioCtx;
  } catch {
    return null;
  }
}

/** Play a short synthesized sound effect */
export function playSound(type: 'expand' | 'collapse', depth: number) {
  const ctx = getCtx();
  if (!ctx) return;

  // Resume context if suspended (autoplay policy)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  if (type === 'expand') {
    // Bright ascending chime — higher pitch for deeper nodes
    const baseFreq = 520 + depth * 80;
    playTone(ctx, now, baseFreq, 0.08, 0.12, 'sine');
    playTone(ctx, now + 0.06, baseFreq * 1.25, 0.06, 0.15, 'sine');
    playTone(ctx, now + 0.12, baseFreq * 1.5, 0.04, 0.2, 'sine');
  } else {
    // Soft descending tone
    const baseFreq = 440 + depth * 60;
    playTone(ctx, now, baseFreq * 1.2, 0.06, 0.1, 'sine');
    playTone(ctx, now + 0.05, baseFreq * 0.9, 0.04, 0.15, 'sine');
  }
}

function playTone(
  ctx: AudioContext,
  startTime: number,
  freq: number,
  volume: number,
  duration: number,
  waveform: OscillatorType,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = waveform;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}
