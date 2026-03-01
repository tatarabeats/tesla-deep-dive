import { motion } from "framer-motion";

interface Props {
    text: string;
    color?: string;
    glowColor?: string;
    className?: string;
    staggerDelay?: number;
    as?: "h1" | "h2" | "h3" | "span";
    trigger?: boolean;
}

export default function LetterReveal({
    text,
    color,
    glowColor,
    className = "",
    staggerDelay = 0.04,
    as: Tag = "h2",
    trigger = true,
}: Props) {
    const letters = text.split("");

    return (
        <Tag className={`letter-reveal ${className}`}>
            {letters.map((char, i) => (
                <motion.span
                    key={i}
                    className="letter-reveal__char"
                    initial={{ opacity: 0, y: 30, rotateX: -60 }}
                    animate={
                        trigger
                            ? { opacity: 1, y: 0, rotateX: 0 }
                            : { opacity: 0, y: 30, rotateX: -60 }
                    }
                    transition={{
                        duration: 0.5,
                        delay: i * staggerDelay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                        display: "inline-block",
                        color: color,
                        textShadow: glowColor
                            ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}40`
                            : undefined,
                        whiteSpace: char === " " ? "pre" : undefined,
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </Tag>
    );
}
