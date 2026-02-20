import { AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData, getPathToNode } from '../../data/visionTree';
import CosmicBreadcrumb from '../mindmap/CosmicBreadcrumb';
import NodeUniverse from '../mindmap/NodeUniverse';

export function MindmapScreen() {
  const { exploration, navigateTo, navigateBack, jumpTo } = useGame();
  const currentNode = visionTreeData[exploration.currentNodeId];
  const path = getPathToNode(exploration.currentNodeId);

  if (!currentNode) return null;

  return (
    <div
      className="mindmap-screen"
      onPointerDown={(e) => {
        const startX = e.clientX;
        const el = e.currentTarget;

        const onMove = (ev: PointerEvent) => {
          const dx = ev.clientX - startX;
          if (dx > 80 && exploration.pathStack.length > 1) {
            navigateBack();
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerup', onUp);
          }
        };
        const onUp = () => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerup', onUp);
        };
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerup', onUp);
      }}
    >
      <CosmicBreadcrumb path={path} onJumpTo={jumpTo} />

      <AnimatePresence mode="wait">
        <NodeUniverse
          key={exploration.currentNodeId}
          node={currentNode}
          direction={exploration.transitionDirection}
          exploredNodes={exploration.exploredNodes}
          onNavigateTo={navigateTo}
        />
      </AnimatePresence>
    </div>
  );
}
