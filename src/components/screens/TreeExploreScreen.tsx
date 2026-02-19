import { useState, useEffect } from 'react';
import { useGame } from '../../store/gameContext';
import { getNode } from '../../data/visionTree';
import Breadcrumb from '../tree/Breadcrumb';
import NodeCard from '../tree/NodeCard';

export default function TreeExploreScreen() {
  const { exploration, goBack } = useGame();
  const [direction, setDirection] = useState<'left' | 'right' | 'none'>('none');
  const [prevNodeId, setPrevNodeId] = useState(exploration.currentNodeId);

  const node = getNode(exploration.currentNodeId);

  useEffect(() => {
    if (exploration.currentNodeId !== prevNodeId) {
      // Determine direction: going deeper = left, going back = right
      const prevNode = getNode(prevNodeId);
      const currNode = getNode(exploration.currentNodeId);
      if (prevNode && currNode) {
        setDirection(currNode.depth > prevNode.depth ? 'left' : 'right');
      }
      setPrevNodeId(exploration.currentNodeId);
    }
  }, [exploration.currentNodeId, prevNodeId]);

  if (!node) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="sticky top-0 z-10 bg-[var(--background)] pb-2 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="text-sm text-[var(--muted)] shrink-0 px-2 py-1 hover:text-[var(--foreground)]"
          >
            ←
          </button>
          <Breadcrumb currentNodeId={node.id} />
        </div>
      </div>

      {/* Node content */}
      <div className="flex-1 overflow-y-auto pb-4">
        <NodeCard node={node} direction={direction} />
      </div>
    </div>
  );
}
