import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData } from '../../data/visionTree';
import { computeLayout } from '../../utils/layout';
import MindmapOrb from '../mindmap/MindmapOrb';
import MindmapEdge from '../mindmap/MindmapEdge';

const ROOT_ID = 'root';

/* pinch-zoom + pan state */
interface Camera {
  x: number;
  y: number;
  scale: number;
}

export function MindmapScreen() {
  const { mindmap, toggleNode } = useGame();
  const rootNode = visionTreeData[ROOT_ID];

  const svgRef = useRef<SVGSVGElement>(null);
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: 1 });

  /* track pointer for panning */
  const dragRef = useRef<{ startX: number; startY: number; camX: number; camY: number } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* compute positions */
  const centerX = viewport.w / 2;
  const centerY = viewport.h / 2;

  const positions = useMemo(
    () => computeLayout(rootNode, mindmap.expandedNodes, centerX, centerY),
    [rootNode, mindmap.expandedNodes, centerX, centerY],
  );

  /* ── Pointer handlers for pan ── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // ignore if clicking on an orb (handled by orb itself)
    if ((e.target as HTMLElement).closest?.('g')) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, camX: camera.x, camY: camera.y };
  }, [camera.x, camera.y]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setCamera(c => ({ ...c, x: dragRef.current!.camX + dx, y: dragRef.current!.camY + dy }));
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  /* ── Wheel zoom ── */
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    setCamera(c => ({
      ...c,
      scale: Math.min(3, Math.max(0.3, c.scale * factor)),
    }));
  }, []);

  /* ── Touch pinch zoom ── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchRef.current = { dist: Math.hypot(dx, dy), scale: camera.scale };
    }
  }, [camera.scale]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const newScale = pinchRef.current.scale * (dist / pinchRef.current.dist);
      setCamera(c => ({ ...c, scale: Math.min(3, Math.max(0.3, newScale)) }));
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    pinchRef.current = null;
  }, []);

  /* transform string */
  const transform = `translate(${camera.x}, ${camera.y}) scale(${camera.scale})`;

  return (
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
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <g transform={transform}>
        {/* edges first (behind orbs) */}
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

        {/* orbs */}
        <AnimatePresence>
          {positions.map((p) => (
            <MindmapOrb
              key={p.node.id}
              node={p.node}
              x={p.x}
              y={p.y}
              isRoot={p.node.id === ROOT_ID}
              isExplored={mindmap.exploredNodes.has(p.node.id)}
              isExpanded={mindmap.expandedNodes.has(p.node.id)}
              onTap={() => toggleNode(p.node.id)}
            />
          ))}
        </AnimatePresence>
      </g>
    </svg>
  );
}
