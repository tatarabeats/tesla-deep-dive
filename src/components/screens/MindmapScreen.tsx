import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData, getChildren } from '../../data/visionTree';
import MindmapOrb from '../mindmap/MindmapOrb';
import MindmapEdge from '../mindmap/MindmapEdge';
import DetailPanel from '../mindmap/DetailPanel';
import type { VisionNode } from '../../types/visionTree';

const ROOT_ID = 'root';

interface LayoutNode {
  node: VisionNode;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

export function MindmapScreen() {
  const { mindmap, toggleNode } = useGame();
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [focusNodeId, setFocusNodeId] = useState(ROOT_ID);
  const [detailNode, setDetailNode] = useState<VisionNode | null>(null);

  // For drag/pan
  const svgRef = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; offX: number; offY: number } | null>(null);
  const didDragRef = useRef(false);

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const cx = viewport.w / 2;
  const cy = viewport.h / 2;

  // Current focus node and its children
  const focusNode = visionTreeData[focusNodeId];
  const children = useMemo(() => getChildren(focusNodeId), [focusNodeId]);

  // Layout: focus node in center, children orbiting around
  const positions = useMemo(() => {
    const result: LayoutNode[] = [];
    result.push({ node: focusNode, x: cx, y: cy });

    if (children.length > 0) {
      // Responsive radius
      const minDim = Math.min(viewport.w, viewport.h);
      const radius = Math.min(minDim * 0.33, 200);
      const angleStep = (2 * Math.PI) / children.length;
      const startAngle = -Math.PI / 2;

      children.forEach((child, i) => {
        const angle = startAngle + i * angleStep;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        result.push({ node: child, x, y, parentX: cx, parentY: cy });
      });
    }

    return result;
  }, [focusNode, children, cx, cy, viewport.w, viewport.h]);

  // Reset offset when focus changes
  useEffect(() => {
    setOffset({ x: 0, y: 0 });
  }, [focusNodeId]);

  const handleOrbTap = useCallback((nodeId: string) => {
    if (didDragRef.current) return;

    const tappedNode = visionTreeData[nodeId];
    toggleNode(nodeId);

    if (nodeId === focusNodeId) {
      // Tapped center node — go up to parent (if exists)
      if (tappedNode.parentId) {
        setFocusNodeId(tappedNode.parentId);
        setDetailNode(null);
      }
    } else {
      // Tapped a child
      const childChildren = getChildren(nodeId);
      if (childChildren.length > 0) {
        // Has children — drill down
        setFocusNodeId(nodeId);
        setDetailNode(null);
      } else {
        // Leaf node — show detail panel
        setDetailNode(tappedNode);
      }
    }
  }, [focusNodeId, toggleNode]);

  // Drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const tag = (e.target as Element).tagName;
    if (tag === 'circle' || tag === 'text') return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, offX: offset.x, offY: offset.y };
    didDragRef.current = false;
  }, [offset]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true;
    setOffset({ x: dragRef.current.offX + dx, y: dragRef.current.offY + dy });
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  // Touch drag
  const touchRef = useRef<{ startX: number; startY: number; offX: number; offY: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const tag = (e.target as Element).tagName;
    if (tag === 'circle' || tag === 'text') return;
    touchRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      offX: offset.x,
      offY: offset.y,
    };
    didDragRef.current = false;
  }, [offset]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1 || !touchRef.current) return;
    const dx = e.touches[0].clientX - touchRef.current.startX;
    const dy = e.touches[0].clientY - touchRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true;
    setOffset({ x: touchRef.current.offX + dx, y: touchRef.current.offY + dy });
  }, []);

  const onTouchEnd = useCallback(() => {
    touchRef.current = null;
  }, []);

  // Breadcrumb path
  const breadcrumb = useMemo(() => {
    const path: VisionNode[] = [];
    let current: VisionNode | undefined = focusNode;
    while (current) {
      path.unshift(current);
      current = current.parentId ? visionTreeData[current.parentId] : undefined;
    }
    return path;
  }, [focusNode]);

  return (
    <div className="mindmap-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        {breadcrumb.map((n, i) => (
          <span key={n.id}>
            {i > 0 && <span className="breadcrumb-sep"> / </span>}
            <button
              className="breadcrumb-btn"
              onClick={() => { setFocusNodeId(n.id); setDetailNode(null); }}
              style={{ opacity: i === breadcrumb.length - 1 ? 1 : 0.5 }}
            >
              {n.icon} {n.title.length > 12 ? n.title.slice(0, 12) + '…' : n.title}
            </button>
          </span>
        ))}
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        className="mindmap-svg"
        width={viewport.w}
        height={viewport.h}
        viewBox={`0 0 ${viewport.w} ${viewport.h}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <defs>
          <filter id="glow-sm" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
          <filter id="glow-lg" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
          </filter>
          <radialGradient id="star-grad-center" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgba(255,250,230,0.35)" />
            <stop offset="40%" stopColor="rgba(200,190,170,0.12)" />
            <stop offset="100%" stopColor="rgba(11,17,32,0.0)" />
          </radialGradient>
          <radialGradient id="star-grad-child" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgba(220,215,200,0.25)" />
            <stop offset="50%" stopColor="rgba(160,155,140,0.08)" />
            <stop offset="100%" stopColor="rgba(11,17,32,0.0)" />
          </radialGradient>
        </defs>

        <g transform={`translate(${offset.x}, ${offset.y})`}>
          {/* Edges */}
          <AnimatePresence>
            {positions.map((p) =>
              p.parentX !== undefined && p.parentY !== undefined ? (
                <MindmapEdge
                  key={`edge-${p.node.id}`}
                  x1={p.parentX}
                  y1={p.parentY}
                  x2={p.x}
                  y2={p.y}
                />
              ) : null,
            )}
          </AnimatePresence>

          {/* Orbs */}
          <AnimatePresence mode="wait">
            <motion.g
              key={focusNodeId}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {positions.map((p) => (
                <MindmapOrb
                  key={p.node.id}
                  node={p.node}
                  x={p.x}
                  y={p.y}
                  isCenter={p.node.id === focusNodeId}
                  isExplored={mindmap.exploredNodes.has(p.node.id)}
                  hasChildren={getChildren(p.node.id).length > 0}
                  isActive={detailNode?.id === p.node.id}
                  onTap={() => handleOrbTap(p.node.id)}
                />
              ))}
            </motion.g>
          </AnimatePresence>
        </g>
      </svg>

      {/* Detail Panel */}
      <AnimatePresence>
        {detailNode && (
          <DetailPanel
            key={detailNode.id}
            node={detailNode}
            onClose={() => setDetailNode(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
