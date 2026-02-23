"""
Tesla Deep Dive — Ambient BGM Generator
8 chapter-specific procedural drone tracks.
Output: OGG Vorbis via ffmpeg (WAV intermediate)
"""

import numpy as np
import scipy.io.wavfile as wavfile
import subprocess, os, sys, tempfile

FFMPEG   = "D:/ffmpeg/ffmpeg.exe"
SAMPLE_RATE = 44100
DURATION    = 45        # seconds
OUT_DIR     = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
FADE_MS     = 1500      # constant for reference


# ─── synthesis helpers ───────────────────────────────────────────────────────

def drone(t, base_freq, harmonics,
          vibrato_rate=0.07, vibrato_depth=0.0015,
          lfo_rate=0.04,    lfo_depth=0.25,
          noise_amount=0.015):
    """Layered sine-wave drone with LFO modulation and noise texture."""
    sig = np.zeros(len(t), dtype=np.float64)
    for mult, amp, phase in harmonics:
        freq = base_freq * mult
        vib  = 1 + vibrato_depth * np.sin(2 * np.pi * vibrato_rate * t + phase)
        sig += amp * np.sin(2 * np.pi * freq * vib * t + phase)
    lfo  = 1.0 - lfo_depth * (0.5 + 0.5 * np.sin(2 * np.pi * lfo_rate * t))
    sig *= lfo
    sig += noise_amount * np.random.normal(0, 1, len(t))
    return sig


def add_pulse(t, freq, pulse_rate, amp=0.06):
    """Rhythmic sub-tick for mechanical chapters."""
    env = np.maximum(0, np.sin(2 * np.pi * pulse_rate * t)) ** 6
    return amp * env * np.sin(2 * np.pi * freq * t)


def make_loopable(sig, sr, fade_sec=3.0):
    """Crossfade tail → head for seamless loop."""
    n     = int(sr * fade_sec)
    fade  = np.linspace(0, 1, n)
    sig[:n]  = sig[:n] * fade + sig[-n:] * (1 - fade)
    sig[-n:] = sig[-n:] * fade[::-1]
    return sig


def normalize(sig, target=0.82):
    peak = np.max(np.abs(sig))
    if peak > 0:
        sig = sig / peak * target
    return (sig * 32767).astype(np.int16)


def save_ogg(filename, signal_i16):
    """Write WAV to temp file, encode to OGG via ffmpeg."""
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        tmp = f.name
    try:
        wavfile.write(tmp, SAMPLE_RATE, signal_i16)
        out = os.path.join(OUT_DIR, filename)
        result = subprocess.run(
            [FFMPEG, "-y", "-i", tmp,
             "-c:a", "libvorbis", "-q:a", "4",
             out],
            capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"  ✗ {filename} — ffmpeg error:\n{result.stderr[-400:]}")
            return
        size_kb = os.path.getsize(out) // 1024
        print(f"  ✓ {filename}  ({size_kb} KB)")
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def generate(filename, base_freq, harmonics, pulse=None, **kwargs):
    t   = np.linspace(0, DURATION, int(SAMPLE_RATE * DURATION), endpoint=False)
    sig = drone(t, base_freq, harmonics, **kwargs)
    if pulse:
        sig += add_pulse(t, *pulse)
    sig = make_loopable(sig, SAMPLE_RATE)
    sig = normalize(sig)
    save_ogg(filename, sig)


# ─── main ────────────────────────────────────────────────────────────────────

if not os.path.exists(FFMPEG):
    sys.exit(f"ffmpeg not found at {FFMPEG}")

np.random.seed(42)
print("Generating ambient BGM tracks...")

# PROLOGUE: Cosmic abyss — very low, slow, ominous
generate("bgm-prologue.ogg",
    base_freq=36,
    harmonics=[
        (1,   0.55, 0.0), (2,   0.30, 0.3), (3,   0.15, 1.1),
        (4,   0.08, 2.2), (5.5, 0.04, 0.7), (0.5, 0.20, 0.0),
    ],
    vibrato_rate=0.05, vibrato_depth=0.002,
    lfo_rate=0.025,   lfo_depth=0.30,   noise_amount=0.02,
)

# CH1 SPACE: Ethereal — wider harmonics, lighter
generate("bgm-ch1.ogg",
    base_freq=55,
    harmonics=[
        (1,   0.50, 0.0), (2,   0.25, 0.4), (3,   0.12, 0.8),
        (4,   0.06, 1.6), (6,   0.04, 2.0), (0.5, 0.15, 0.0),
    ],
    vibrato_rate=0.08, vibrato_depth=0.0018,
    lfo_rate=0.035,   lfo_depth=0.22,   noise_amount=0.012,
)

# CH2 ENERGY: Industrial — richer harmonics, slightly brighter
generate("bgm-ch2.ogg",
    base_freq=82.4,
    harmonics=[
        (1,   0.45, 0.0), (2,   0.28, 0.5), (3,   0.18, 1.0),
        (4,   0.10, 1.5), (5,   0.06, 2.0), (7,   0.03, 0.3),
    ],
    vibrato_rate=0.09, vibrato_depth=0.001,
    lfo_rate=0.05,    lfo_depth=0.20,   noise_amount=0.025,
)

# CH3 AI/BRAIN: Unsettling electronic — dissonant intervals
generate("bgm-ch3.ogg",
    base_freq=65.4,
    harmonics=[
        (1,    0.40, 0.0), (1.5,  0.18, 0.6), (2,    0.20, 1.2),
        (2.83, 0.10, 0.9), (4,    0.08, 0.0), (5,    0.05, 1.8),
        (0.75, 0.12, 0.4),
    ],
    vibrato_rate=0.12, vibrato_depth=0.002,
    lfo_rate=0.06,    lfo_depth=0.28,   noise_amount=0.018,
)

# CH4 AUTOMATION: Mechanical — rhythmic pulse, precise
generate("bgm-ch4.ogg",
    base_freq=73.4,
    harmonics=[
        (1,  0.42, 0.0), (2,  0.25, 0.0), (3,  0.15, 0.0),
        (4,  0.08, 0.0), (6,  0.04, 0.0),
    ],
    vibrato_rate=0.06, vibrato_depth=0.001,
    lfo_rate=0.08,    lfo_depth=0.15,   noise_amount=0.010,
    pulse=(73.4 * 3, 0.5, 0.06),
)

# CH5 TRANSPORT: Urban tension — faster modulation, tighter
generate("bgm-ch5.ogg",
    base_freq=98.0,
    harmonics=[
        (1,    0.45, 0.0), (1.33, 0.12, 0.8), (2,   0.20, 0.3),
        (3,    0.10, 0.6), (4,   0.06, 1.2),
    ],
    vibrato_rate=0.14, vibrato_depth=0.0012,
    lfo_rate=0.07,    lfo_depth=0.20,   noise_amount=0.015,
)

# CH6 FINANCE: Modern smooth — clean, slightly major feel
generate("bgm-ch6.ogg",
    base_freq=110.0,
    harmonics=[
        (1,    0.42, 0.0), (2,    0.22, 0.2), (3,    0.10, 0.5),
        (4,    0.06, 1.0), (1.25, 0.08, 0.3),
    ],
    vibrato_rate=0.07, vibrato_depth=0.001,
    lfo_rate=0.04,    lfo_depth=0.18,   noise_amount=0.010,
)

# EPILOGUE: Resolved, hopeful — slightly brighter
generate("bgm-epilogue.ogg",
    base_freq=130.8,
    harmonics=[
        (1,   0.38, 0.0), (2,   0.22, 0.0), (3,   0.12, 0.0),
        (4,   0.07, 0.0), (1.5, 0.10, 0.2), (0.5, 0.18, 0.0),
    ],
    vibrato_rate=0.06, vibrato_depth=0.001,
    lfo_rate=0.03,    lfo_depth=0.15,   noise_amount=0.008,
)

print("\nAll tracks generated.")
