import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface LevelUpOverlayProps {
  show: boolean;
  oldLevel: number;
  newLevel: number;
  newTitle: string;
  onComplete: () => void;
}

export function LevelUpOverlay({
  show,
  oldLevel,
  newLevel,
  newTitle,
  onComplete,
}: LevelUpOverlayProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onComplete}
        >
          {/* Gold flash effect */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--gold-light)' }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 text-center px-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: 'spring', bounce: 0.4 }}
          >
            {/* Sparkle particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  backgroundColor: 'var(--gold-light)',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 12) * 120,
                  y: Math.sin((i * Math.PI * 2) / 12) * 120,
                  opacity: [1, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  delay: 0.6 + i * 0.05,
                  duration: 1.2,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Level up text */}
            <motion.div
              className="text-lg mb-2 tracking-widest"
              style={{ color: 'var(--gold-light)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              LEVEL UP!
            </motion.div>

            {/* Level number */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-muted text-2xl">Lv.{oldLevel}</span>
              <motion.span
                style={{ color: 'var(--gold)' }}
                className="text-xl"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: 3, duration: 0.4 }}
              >
                →
              </motion.span>
              <span className="gold-text text-5xl font-bold">Lv.{newLevel}</span>
            </motion.div>

            {/* New title */}
            <motion.div
              className="rpg-card inline-block px-6 py-3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.3, type: 'spring', bounce: 0.5 }}
            >
              <div className="text-muted text-xs mb-1">新たな称号</div>
              <div className="gold-text text-xl font-bold">{newTitle}</div>
            </motion.div>

            {/* Tap to dismiss */}
            <motion.div
              className="text-muted text-xs mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
            >
              タップして閉じる
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
