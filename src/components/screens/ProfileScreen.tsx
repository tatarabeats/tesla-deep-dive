import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { getLevelTitle } from '../../engine/progressionEngine';
import { visionTreeData, getBranchIds } from '../../data/visionTree';

export function ProfileScreen() {
  const { userProfile, updateProfile, branchProgressMap, overallProgress, navigate, toggleNode } = useGame();

  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  return (
    <div className="space-y-5">
      {/* Character Card */}
      <div className="rpg-card text-center">
        <div className="relative inline-block mb-3">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--card-border)' }}
          >
            🌌
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: 'var(--tesla-red)', color: 'white', border: '2px solid var(--background)' }}
          >
            {userProfile.level}
          </div>
        </div>
        <div className="gold-text text-xl font-bold mb-1">{getLevelTitle(userProfile.level)}</div>
        <div className="text-xs" style={{ color: 'var(--muted)' }}>Lv.{userProfile.level}</div>

        <div className="mt-4">
          <div className="exp-bar">
            <motion.div
              className="exp-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="text-right text-[10px] mt-1" style={{ color: 'var(--muted)' }}>
            {userProfile.currentLevelXP} / {userProfile.xpToNextLevel} XP
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: '合計XP', value: userProfile.totalXP.toLocaleString(), icon: '💎', color: 'var(--gold)' },
          { label: '理解度', value: `${overallProgress}%`, icon: '🧠', color: 'var(--tesla-red)' },
          { label: '探索ノード', value: String(userProfile.totalNodesExplored), icon: '🌿', color: 'var(--accent-green)' },
          { label: '連続日数', value: String(userProfile.currentStreak), icon: '🔥', color: 'var(--accent-orange)' },
          { label: '最深到達', value: `Depth ${userProfile.deepestDepthReached}`, icon: '⛏️', color: 'var(--accent-blue)' },
          { label: '最長連続', value: `${userProfile.longestStreak}日`, icon: '🏆', color: 'var(--gold)' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rpg-card text-center !p-3"
          >
            <div className="text-2xl font-extrabold" style={{ color: stat.color }}>
              {stat.icon} {stat.value}
            </div>
            <div className="text-[10px] font-bold mt-1" style={{ color: 'var(--muted)' }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Branch Progress */}
      <div className="rpg-card">
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--gold)' }}>ブランチ別進捗</h2>
        {getBranchIds().map(branchId => {
          const node = visionTreeData[branchId];
          const progress = branchProgressMap[branchId];
          if (!node || !progress) return null;
          const pct = progress.totalNodes > 0
            ? Math.round((progress.exploredNodes / progress.totalNodes) * 100)
            : 0;
          return (
            <div key={branchId} className="flex items-center justify-between py-2"
              style={{ borderBottom: '1px solid var(--card-border)' }}
            >
              <span className="text-xs font-bold text-[var(--foreground)]">
                {node.icon} {node.subtitle || node.title}
              </span>
              <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                <span>{progress.exploredNodes}/{progress.totalNodes}</span>
                <span style={{ color: progress.fullyExplored ? 'var(--accent-green)' : 'var(--muted)' }}>
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bookmarks */}
      {userProfile.bookmarkedNodeIds.length > 0 && (
        <div className="rpg-card">
          <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--gold)' }}>⭐ ブックマーク</h2>
          {userProfile.bookmarkedNodeIds.map(nodeId => {
            const node = visionTreeData[nodeId];
            if (!node) return null;
            return (
              <button
                key={nodeId}
                onClick={() => {
                  toggleNode(nodeId);
                  navigate('home');
                }}
                className="w-full flex items-center gap-2 py-2 text-left"
                style={{ borderBottom: '1px solid var(--card-border)' }}
              >
                <span>{node.icon}</span>
                <span className="text-xs text-[var(--foreground)] truncate">{node.title}</span>
                <span className="text-xs text-[var(--muted)] ml-auto">→</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Sound Toggle */}
      <button
        onClick={() => updateProfile(p => ({ ...p, soundEnabled: !p.soundEnabled }))}
        className="w-full choice-card"
      >
        <span className="text-xl">{userProfile.soundEnabled ? '🔊' : '🔇'}</span>
        <span className="flex-1 text-left text-sm font-bold">サウンド</span>
        <span className="text-xs font-bold"
          style={{ color: userProfile.soundEnabled ? 'var(--accent-green)' : 'var(--muted)' }}
        >
          {userProfile.soundEnabled ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
}
