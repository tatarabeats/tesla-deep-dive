import { motion } from 'framer-motion';

interface Props {
  explored: number;
  total: number;
}

export default function TreeHeader({ explored, total }: Props) {
  const pct = total > 0 ? (explored / total) * 100 : 0;

  return (
    <div className="tree-header">
      <div className="tree-header__bar-bg">
        <motion.div
          className="tree-header__bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="tree-header__count">
        {explored} / {total}
      </span>
    </div>
  );
}
