import { useRef, useEffect } from "react";

/**
 * GlitchText — テキストをグリッチ（デジタルノイズ）エフェクト付きで表示
 * 最初はランダムな文字がバラバラに表示され、最終的に正しいテキストに収束する
 */
interface Props {
    text: string;
    /** 完了までの時間（ms） */
    duration?: number;
    /** 遅延（ms） */
    delay?: number;
    /** どの文字をハイライトするか */
    highlight?: string;
    /** ハイライト色 */
    highlightColor?: string;
    className?: string;
    style?: React.CSSProperties;
    /** 発動条件 */
    trigger?: boolean;
}

const GLITCH_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

export default function GlitchText({
    text,
    duration = 2000,
    delay = 0,
    highlight,
    highlightColor = "rgba(255, 100, 30, 0.95)",
    className = "",
    style,
    trigger = true,
}: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        if (!trigger || !ref.current) return;

        const el = ref.current;
        const chars = text.split("");
        const startTime = performance.now() + delay;
        const perCharDuration = duration / chars.length;

        const tick = (now: number) => {
            const elapsed = now - startTime;
            if (elapsed < 0) {
                el.textContent = "";
                animRef.current = requestAnimationFrame(tick);
                return;
            }

            let result = "";
            for (let i = 0; i < chars.length; i++) {
                const charStart = i * perCharDuration * 0.5;
                const charEnd = charStart + perCharDuration * 1.5;
                const progress = (elapsed - charStart) / (charEnd - charStart);

                if (progress >= 1) {
                    result += chars[i];
                } else if (progress > 0) {
                    // Random glitch character
                    if (Math.random() > progress * 0.7) {
                        result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    } else {
                        result += chars[i];
                    }
                } else {
                    result += " ";
                }
            }

            // Apply with highlight if needed
            if (highlight && result.includes(highlight)) {
                el.innerHTML = result.replace(
                    highlight,
                    `<span style="color:${highlightColor};text-shadow:0 0 20px ${highlightColor};font-weight:800">${highlight}</span>`,
                );
            } else {
                el.textContent = result;
            }

            if (elapsed < duration + delay) {
                animRef.current = requestAnimationFrame(tick);
            }
        };

        animRef.current = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(animRef.current);
    }, [trigger, text, duration, delay, highlight, highlightColor]);

    return (
        <span ref={ref} className={`glitch-text ${className}`} style={style}>
            {text}
        </span>
    );
}
