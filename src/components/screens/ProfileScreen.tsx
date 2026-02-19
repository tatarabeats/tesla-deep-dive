import { useGame } from '../../store/gameContext';
import { visionTreeData, getBranchIds } from '../../data/visionTree';

export function ProfileScreen() {
  const { userProfile, branchProgressMap, overallProgress, navigate, toggleNode } = useGame();

  const totalExplored = userProfile.exploredNodeIds.length;

  return (
    <div className="space-y-5">
      {/* Overview */}
      <div className="rpg-card text-center">
        <div className="text-4xl mb-2">🌌</div>
        <p className="text-lg font-bold text-[var(--foreground)]">探索の記録</p>
        <p className="text-sm text-[var(--muted)] mt-1">
          {totalExplored} ノード探索 · {overallProgress}% 完了
        </p>
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
            <div key={branchId} className="flex items-center justify-between py-2.5"
              style={{ borderBottom: '1px solid var(--card-border)' }}
            >
              <span className="text-sm font-bold text-[var(--foreground)]">
                {node.icon} {node.subtitle || node.title}
              </span>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
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
                className="w-full flex items-center gap-2 py-2.5 text-left"
                style={{ borderBottom: '1px solid var(--card-border)' }}
              >
                <span>{node.icon}</span>
                <span className="text-sm text-[var(--foreground)] truncate">{node.title}</span>
                <span className="text-sm text-[var(--muted)] ml-auto">→</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
