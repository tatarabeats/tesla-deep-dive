import { useState, useCallback, useRef, useEffect, useMemo, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { glossary, type GlossaryEntry } from '../../data/glossary';

interface GlossaryTextProps {
  text: string;
  className?: string;
  onPause?: () => void;
}

const termPattern = glossary.map(g => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const termRegex = new RegExp(`(${termPattern})`, 'g');

interface TextSegment {
  text: string;
  entry?: GlossaryEntry;
}

function splitTextWithGlossary(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  termRegex.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = termRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index) });
    }
    const entry = glossary.find(g => g.term === match![0]);
    if (entry) {
      segments.push({ text: match[0], entry });
    } else {
      segments.push({ text: match[0] });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex) });
  }

  return segments;
}

function GlossaryPopup({ entry, onClose, anchorRect }: {
  entry: GlossaryEntry;
  onClose: () => void;
  anchorRect: DOMRect | null;
}) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [onClose]);

  const popupStyle = useMemo(() => {
    if (!anchorRect) return {};
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const showAbove = anchorRect.top > 200;
    const left = Math.max(12, Math.min(anchorRect.left, viewportW - 300));

    if (showAbove) {
      return { bottom: viewportH - anchorRect.top + 8, left, maxWidth: Math.min(viewportW - 24, 340) };
    }
    return { top: anchorRect.bottom + 8, left, maxWidth: Math.min(viewportW - 24, 340) };
  }, [anchorRect]);

  return (
    <motion.div
      ref={popupRef}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 8 }}
      transition={{ duration: 0.15 }}
      className="fixed z-50 rounded-2xl p-4 shadow-xl"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '2px solid var(--accent-blue)',
        ...popupStyle,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base font-extrabold" style={{ color: 'var(--accent-blue)' }}>{entry.term}</span>
        {entry.reading && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ color: 'var(--muted)', backgroundColor: 'var(--card-bg)' }}
          >
            {entry.reading}
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>{entry.short}</p>
      <button
        onClick={onClose}
        className="mt-3 w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer hover:opacity-80"
        style={{
          backgroundColor: 'var(--card-bg)',
          color: 'var(--muted)',
          border: '1px solid var(--card-border)',
        }}
      >
        閉じる
      </button>
    </motion.div>
  );
}

export function GlossaryText({ text, className = '', onPause }: GlossaryTextProps) {
  const [activeEntry, setActiveEntry] = useState<GlossaryEntry | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const segments = useMemo(() => splitTextWithGlossary(text), [text]);

  const handleTermClick = useCallback((entry: GlossaryEntry, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    setAnchorRect(target.getBoundingClientRect());
    setActiveEntry(entry);
    onPause?.();
  }, [onPause]);

  const handleClose = useCallback(() => {
    setActiveEntry(null);
    setAnchorRect(null);
  }, []);

  const rendered: ReactNode[] = segments.map((seg, i) => {
    if (seg.entry) {
      return (
        <span
          key={i}
          onClick={(e) => handleTermClick(seg.entry!, e)}
          className="underline decoration-dotted underline-offset-2 cursor-pointer transition-colors"
          style={{ color: 'var(--accent-blue)', textDecorationColor: 'rgba(74,144,217,0.4)' }}
        >
          {seg.text}
        </span>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });

  return (
    <>
      <span className={className}>{rendered}</span>
      <AnimatePresence>
        {activeEntry && (
          <GlossaryPopup entry={activeEntry} onClose={handleClose} anchorRect={anchorRect} />
        )}
      </AnimatePresence>
    </>
  );
}
