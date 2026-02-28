import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
    /** Target value like "96%", "$1.6B", "374億トン", "5日" */
    value: string;
    /** Duration of count-up in ms */
    duration?: number;
    /** Color */
    color?: string;
    /** Label below the number */
    label?: string;
}

export default function CountUp({
    value,
    duration = 2000,
    color = "#fff",
    label,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (!isInView) return;

        // Extract numeric part and suffix/prefix
        const match = value.match(/^([^\d]*)([\d,\.]+)(.*)$/);
        if (!match) {
            setDisplay(value);
            return;
        }

        const prefix = match[1];
        const numStr = match[2].replace(/,/g, "");
        const suffix = match[3];
        const target = parseFloat(numStr);
        const hasDecimal = numStr.includes(".");
        const decimalPlaces = hasDecimal ? numStr.split(".")[1].length : 0;
        const hasComma = match[2].includes(",");

        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            let formatted: string;
            if (hasDecimal) {
                formatted = current.toFixed(decimalPlaces);
            } else {
                const rounded = Math.round(current);
                formatted = hasComma ? rounded.toLocaleString() : String(rounded);
            }

            setDisplay(`${prefix}${formatted}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    }, [isInView, value, duration]);

    return (
        <div ref={ref} className="count-up">
            <span className="count-up__value" style={{ color }}>
                {display}
            </span>
            {label && <span className="count-up__label">{label}</span>}
        </div>
    );
}
