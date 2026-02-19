import { motion } from 'framer-motion';

interface Props {
  onClick: () => void;
  label?: string;
}

export default function WhyButton({ onClick, label = 'なぜ？' }: Props) {
  return (
    <motion.button
      onClick={onClick}
      className="why-button"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <span className="text-lg">{label}</span>
      <span className="text-sm opacity-70">↓ 深く掘る</span>
    </motion.button>
  );
}
