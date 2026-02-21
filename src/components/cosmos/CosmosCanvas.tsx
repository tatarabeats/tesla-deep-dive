import { useCallback, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData, getChildren, totalNodeCount } from '../../data/visionTree';
import { computeChildPositions, getOrbSize, getAngle, type OrbPosition } from '../../utils/cosmos-layout';
import OrbNode from './OrbNode';
import CosmosHeader from './CosmosHeader';

const ROOT_ID = 'root';

interface Edge {
  x1: number; y1: number;
  x2: number; y2: number;
  depth: number;
}

export default function CosmosCanvas() {
  const { mindmap, toggleNode } = useGame();

  // Pan state
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const panRef = useRef<{ startX: number; startY: number; startOffX: number; startOffY: number } | null>(null);
  const hasMoved = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    panRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startOffX: offset.x,
      startOffY: offset.y,
    };
    hasMoved.current = false;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!panRef.current) return;
    const dx = e.clientX - panRef.current.startX;
    const dy = e.clientY - panRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved.current = true;
    setOffset({
      x: panRef.current.startOffX + dx,
      y: panRef.current.startOffY + dy,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    panRef.current = null;
  }, []);

  // Center of viewport
  const cx = typeof window !== 'undefined' ? Math.min(window.innerWidth, 480) / 2 : 240;
  const cy = typeof window !== 'undefined' ? window.innerHeight * 0.38 : 300;

  // Build orb positions recursively
  const { orbs, edges } = useMemo(() => {
    const orbMap = new Map<string, OrbPosition & { parentAngle: number | null }>();
    const edgeList: Edge[] = [];

    // Root
    const rootSize = getOrbSize(0);
    orbMap.set(ROOT_ID, { id: ROOT_ID, x: cx, y: cy, size: rootSize, parentAngle: null });

    function expandNode(nodeId: string) {
      const parent = orbMap.get(nodeId);
      if (!parent) return;
      const node = visionTreeData[nodeId];
      if (!node) return;

      const childNodes = getChildren(nodeId);
      if (childNodes.length === 0) return;

      const childDepth = node.depth + 1;
      const positions = computeChildPositions(
        parent.x, parent.y,
        childNodes.map(c => c.id),
        childDepth,
        parent.parentAngle,
      );

      for (const pos of positions) {
        const angle = getAngle(parent.x, parent.y, pos.x, pos.y);
        orbMap.set(pos.id, { ...pos, parentAngle: angle });
        edgeList.push({
          x1: parent.x, y1: parent.y,
          x2: pos.x, y2: pos.y,
          depth: childDepth,
        });

        // If this child is also expanded, recurse
        if (mindmap.expandedNodes.has(pos.id)) {
          expandNode(pos.id);
        }
      }
    }

    // Always show root. If root is expanded, show its children, etc.
    if (mindmap.expandedNodes.has(ROOT_ID)) {
      expandNode(ROOT_ID);
    }

    return { orbs: Array.from(orbMap.values()), edges: edgeList };
  }, [mindmap.expandedNodes, cx, cy]);

  const handleOrbTap = useCallback((nodeId: string) => {
    if (hasMoved.current) return; // ignore if was panning
    toggleNode(nodeId);
  }, [toggleNode]);

  return (
    <div className="cosmos-wrapper">
      <CosmosHeader explored={mindmap.exploredNodes.size} total={totalNodeCount} />

      <div
        className="cosmos-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="cosmos-layer"
          style={{ x: offset.x, y: offset.y }}
        >
          {/* Edges (SVG) */}
          <svg className="cosmos-edges" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
            {edges.map((e, i) => (
              <motion.line
                key={i}
                x1={e.x1} y1={e.y1}
                x2={e.x2} y2={e.y2}
                stroke={e.depth <= 1 ? 'rgba(255,225,140,0.08)' : e.depth === 2 ? 'rgba(255,90,80,0.06)' : 'rgba(80,200,255,0.05)'}
                strokeWidth={e.depth <= 1 ? 1.5 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
            ))}
          </svg>

          {/* Orbs */}
          {orbs.map((orb, i) => {
            const node = visionTreeData[orb.id];
            if (!node) return null;
            return (
              <OrbNode
                key={orb.id}
                node={node}
                x={orb.x}
                y={orb.y}
                size={orb.size}
                isExplored={mindmap.exploredNodes.has(orb.id)}
                isExpanded={mindmap.expandedNodes.has(orb.id)}
                onTap={handleOrbTap}
                breathDelay={(i % 5) * 0.4}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
