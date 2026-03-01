import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChapterDef {
    num: number;
    sceneId: string;
    label: string;
    color: string;
}

const CHAPTERS: ChapterDef[] = [
    { num: 1, sceneId: "ch1-title", label: "地球にしか住んでいない", color: "#50c8ff" },
    { num: 2, sceneId: "ch2-title", label: "石油と石炭への依存", color: "#ff5a50" },
    { num: 3, sceneId: "ch3-title", label: "AIの暴走", color: "#b482ff" },
    { num: 4, sceneId: "ch4-title", label: "働く人がいない", color: "#50dc8c" },
    { num: 5, sceneId: "ch5-title", label: "渋滞で消える人生", color: "#c8b496" },
    { num: 6, sceneId: "ch6-title", label: "ネットが届かない22億人", color: "#e8dcc8" },
];

export default function ChapterNav() {
    const [active, setActive] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const [visible, setVisible] = useState(false);
    const elMapRef = useRef<Map<number, Element>>(new Map());
    const rafRef = useRef(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            for (const ch of CHAPTERS) {
                const el = document.querySelector(`[data-scene="${ch.sceneId}"]`);
                if (el) elMapRef.current.set(ch.num, el);
            }
        }, 200);

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            rafRef.current = requestAnimationFrame(() => {
                // Show nav only after scrolling past first viewport
                setVisible(window.scrollY > window.innerHeight * 0.5);

                let best: number | null = null;
                for (const ch of CHAPTERS) {
                    const el = elMapRef.current.get(ch.num);
                    if (!el) continue;
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.5) {
                        best = ch.num;
                    }
                }
                setActive(best);
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const scrollTo = (num: number) => {
        const el = elMapRef.current.get(num);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    className="chapter-nav"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    aria-label="Chapter Navigation"
                >
                    {CHAPTERS.map((ch) => {
                        const isActive = active === ch.num;
                        const isHovered = hovered === ch.num;
                        return (
                            <button
                                key={ch.num}
                                className={`chapter-nav__dot-wrap ${isActive ? "chapter-nav__dot-wrap--active" : ""}`}
                                onClick={() => scrollTo(ch.num)}
                                onMouseEnter={() => setHovered(ch.num)}
                                onMouseLeave={() => setHovered(null)}
                                aria-label={`危機 ${ch.num}: ${ch.label}`}
                            >
                                <span
                                    className="chapter-nav__dot"
                                    style={{
                                        backgroundColor: isActive ? ch.color : "rgba(255,255,255,0.3)",
                                        boxShadow: isActive
                                            ? `0 0 8px ${ch.color}, 0 0 20px ${ch.color}60`
                                            : "none",
                                    }}
                                />
                                <AnimatePresence>
                                    {(isHovered || isActive) && (
                                        <motion.span
                                            className="chapter-nav__label"
                                            initial={{ opacity: 0, x: -8, width: 0 }}
                                            animate={{ opacity: 1, x: 0, width: "auto" }}
                                            exit={{ opacity: 0, x: -8, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ color: ch.color }}
                                        >
                                            {ch.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        );
                    })}
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
