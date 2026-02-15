import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ExpGainToastProps {
  show: boolean;
  amount: number;
  onComplete: () => void;
}

export function ExpGainToast({ show, amount, onComplete }: ExpGainToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-20 left-1/2 z-[90] pointer-events-none"
          initial={{ x: '-50%', y: 20, opacity: 0, scale: 0.8 }}
          animate={{ x: '-50%', y: 0, opacity: 1, scale: 1 }}
          exit={{ x: '-50%', y: -30, opacity: 0 }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          <div className="rpg-card px-4 py-2 flex items-center gap-2 font-bold"
            style={{ color: 'var(--tesla-red)' }}
          >
            <span className="text-lg">+{amount}</span>
            <span className="text-sm">XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
