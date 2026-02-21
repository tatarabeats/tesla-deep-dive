import { motion } from 'framer-motion';

interface Props {
  explored: number;
  total: number;
}

export default function CosmosHeader({ explored, total }: Props) {
  const pct = total > 0 ? (explored / total) * 100 : 0;

  return (
    <div className="cosmos-header">
      <span className="cosmos-header__label">Vision Tree</span>
      <div className="cosmos-header__bar-bg">
        <motion.div
          className="cosmos-header__bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="cosmos-header__count">{explored}/{total}</span>
    </div>
  );
}
