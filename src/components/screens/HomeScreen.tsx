import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { getLevelTitle } from '../../engine/progressionEngine';
import { visionTreeData } from '../../data/visionTree';
import BranchOverview from '../tree/BranchOverview';
import type { BranchId } from '../../types/visionTree';

const BRANCH_IDS: BranchId[] = ['spacex', 'tesla', 'neuralink', 'xai', 'optimus', 'x_platform', 'boring'];

export function HomeScreen() {
  const { userProfile, exploreNode, branchProgressMap, overallProgress } = useGame();
  const { play } = useSound();

  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  const rootNode = visionTreeData['root'];

  return (
    <div className="space-y-5 pb-4">
      {/* Level + Progress */}
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative shrink-0"
          style={{ width: 72, height: 72 }}
        >
          <svg viewBox="0 0 100 100" className="-rotate-90" style={{ width: '100%', height: '100%' }}>
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--card-border)" strokeWidth="6" />
            <motion.circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="var(--tesla-red)"
              strokeWidth="6"
              strokeDasharray={`${xpPercent * 2.64} 264`}
              strokeLinecap="round"
              initial={false}
              animate={{ strokeDasharray: `${xpPercent * 2.64} 264` }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-extrabold text-[var(--foreground)]">
              {userProfile.level}
            </span>
          </div>
        </motion.div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--foreground)]">{getLevelTitle(userProfile.level)}</p>
          <p className="text-xs text-[var(--muted)]">
            {userProfile.totalXP} XP
            {userProfile.currentStreak > 0 && ` · ${userProfile.currentStreak}日連続`}
          </p>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            理解度 {overallProgress}%
          </p>
        </div>
      </div>

      {/* Root node card */}
      <motion.button
        onClick={() => {
          play('click');
          exploreNode('root');
        }}
        className="w-full node-card animate-breathe text-left"
        style={{ borderColor: 'var(--gold)' }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{rootNode.icon}</span>
          <div>
            <h2 className="text-base font-bold text-[var(--foreground)]">{rootNode.title}</h2>
            <p className="text-xs text-[var(--muted)]">{rootNode.subtitle}</p>
          </div>
        </div>
      </motion.button>

      {/* Branches */}
      <div>
        <p className="text-xs text-[var(--muted)] mb-2 px-1">ブランチを探索する:</p>
        <div className="space-y-2">
          {BRANCH_IDS.map((branchId, i) => {
            const branchNode = visionTreeData[branchId];
            if (!branchNode) return null;
            return (
              <BranchOverview
                key={branchId}
                node={branchNode}
                progress={branchProgressMap[branchId]}
                onClick={() => {
                  play('click');
                  exploreNode(branchId);
                }}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
