import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
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

/* ── Recursive layout: root center, children fan outward ── */
function computeLayout(
  rootNode: VisionNode,
  expandedNodes: Set<string>,
  cx: number,
  cy: number,
  viewW: number,
  viewH: number,
): LayoutNode[] {
  const positions: LayoutNode[] = [];
  const minDim = Math.min(viewW, viewH);
  const rootRadius = Math.min(minDim * 0.30, 180);

  function place(
    node: VisionNode,
    x: number,
    y: number,
    parentX?: number,
    parentY?: number,
    depth: number = 0,
  ) {
    positions.push({ node, x, y, parentX, parentY });
    if (!expandedNodes.has(node.id)) return;

    const kids = getChildren(node.id);
    if (kids.length === 0) return;

    if (depth === 0) {
      // Root: even circle
      const angleStep = (2 * Math.PI) / kids.length;
      const startAngle = -Math.PI / 2;
      kids.forEach((child, i) => {
        const a = startAngle + i * angleStep;
        place(child, x + rootRadius * Math.cos(a), y + rootRadius * Math.sin(a), x, y, 1);
      });
    } else {
      // Non-root: fan outward from parent direction
      const r = Math.max(70, 110 - depth * 10);
      const outAngle = Math.atan2(y - (parentY ?? y), x - (parentX ?? x));
      const spread = Math.min(Math.PI * 0.65, Math.max(0.5, kids.length * 0.35));
      const step = kids.length > 1 ? spread / (kids.length - 1) : 0;
      const start = outAngle - spread / 2;

      kids.forEach((child, i) => {
        const a = start + i * step;
        place(child, x + r * Math.cos(a), y + r * Math.sin(a), x, y, depth + 1);
      });
    }
  }

  place(rootNode, cx, cy, undefined, undefined, 0);
  return positions;
}

export function MindmapScreen() {
  const { mindmap, toggleNode } = useGame();
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [detailNode, setDetailNode] = useState<VisionNode | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  // Camera: pan + zoom via ref (avoids stale closures)
  const camRef = useRef({ x: 0, y: 0, scale: 1 });
  const [cam, setCam] = useState({ x: 0, y: 0, scale: 1 });
  const updateCam = useCallback((c: typeof cam) => { camRef.current = c; setCam(c); }, []);

  // Drag
  const dragRef = useRef<{ sx: number; sy: number; cx: number; cy: number } | null>(null);
  const didDragRef = useRef(false);
  // Pinch
  const pinchRef = useRef<{ dist: number; scale: number; cx: number; cy: number; mx: number; my: number } | null>(null);
  const isPinchRef = useRef(false);
  // Smooth pan animation
  const animRef = useRef(0);

  useEffect(() => {
    const fn = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const cx = viewport.w / 2;
  const cy = viewport.h / 2;
  const rootNode = visionTreeData[ROOT_ID];

  const positions = useMemo(
    () => computeLayout(rootNode, mindmap.expandedNodes, cx, cy, viewport.w, viewport.h),
    [rootNode, mindmap.expandedNodes, cx, cy, viewport.w, viewport.h],
  );

  /* smooth pan to node */
  const smoothPanTo = useCallback((tx: number, ty: number) => {
    cancelAnimationFrame(animRef.current);
    const c = camRef.current;
    const sx = c.x, sy = c.y;
    const t0 = performance.now();
    const dur = 350;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = ease(p);
      updateCam({ ...camRef.current, x: sx + (tx - sx) * e, y: sy + (ty - sy) * e });
      if (p < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }, [updateCam]);

  /* Tap handler */
  const handleOrbTap = useCallback((nodeId: string) => {
    if (didDragRef.current) return;
    const node = visionTreeData[nodeId];
    const kids = getChildren(nodeId);

    if (kids.length === 0) {
      // Leaf → show detail
      toggleNode(nodeId);
      setDetailNode(prev => prev?.id === nodeId ? null : node);
      return;
    }

    // Toggle expand/collapse
    const willExpand = !mindmap.expandedNodes.has(nodeId);
    toggleNode(nodeId);
    setDetailNode(null);

    // Auto-pan to tapped node
    if (willExpand) {
      const pos = positions.find(p => p.node.id === nodeId);
      if (pos) {
        const c = camRef.current;
        smoothPanTo(cx - pos.x * c.scale, cy - pos.y * c.scale);
      }
    }
  }, [mindmap.expandedNodes, toggleNode, positions, cx, cy, smoothPanTo]);

  /* ── Pointer (desktop mouse) ── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const tag = (e.target as Element).tagName;
    if (tag === 'circle' || tag === 'text') return;
    const c = camRef.current;
    dragRef.current = { sx: e.clientX, sy: e.clientY, cx: c.x, cy: c.y };
    didDragRef.current = false;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.sx;
    const dy = e.clientY - dragRef.current.sy;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true;
    updateCam({ ...camRef.current, x: dragRef.current.cx + dx, y: dragRef.current.cy + dy });
  }, [updateCam]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    dragRef.current = null;
  }, []);

  /* ── Wheel zoom ── */
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const c = camRef.current;
    const f = e.deltaY > 0 ? 0.93 : 1.07;
    const ns = Math.min(3, Math.max(0.3, c.scale * f));
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      updateCam({ x: mx - (mx - c.x) * (ns / c.scale), y: my - (my - c.y) * (ns / c.scale), scale: ns });
    }
  }, [updateCam]);

  /* ── Touch (mobile: drag + pinch) ── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      dragRef.current = null;
      isPinchRef.current = true;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const c = camRef.current;
      pinchRef.current = { dist: Math.hypot(dx, dy), scale: c.scale, cx: c.x, cy: c.y, mx, my };
    } else if (e.touches.length === 1) {
      const tag = (e.target as Element).tagName;
      if (tag === 'circle' || tag === 'text') return;
      const c = camRef.current;
      dragRef.current = { sx: e.touches[0].clientX, sy: e.touches[0].clientY, cx: c.x, cy: c.y };
      didDragRef.current = false;
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const { scale: ss, cx: scx, cy: scy, mx, my } = pinchRef.current;
      const ns = Math.min(3, Math.max(0.3, ss * (dist / pinchRef.current.dist)));
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        const rmx = mx - rect.left, rmy = my - rect.top;
        updateCam({ x: rmx - (rmx - scx) * (ns / ss), y: rmy - (rmy - scy) * (ns / ss), scale: ns });
      }
    } else if (e.touches.length === 1 && dragRef.current && !isPinchRef.current) {
      const dx = e.touches[0].clientX - dragRef.current.sx;
      const dy = e.touches[0].clientY - dragRef.current.sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true;
      updateCam({ ...camRef.current, x: dragRef.current.cx + dx, y: dragRef.current.cy + dy });
    }
  }, [updateCam]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) { dragRef.current = null; pinchRef.current = null; isPinchRef.current = false; }
    else if (e.touches.length === 1) { pinchRef.current = null; }
  }, []);

  return (
    <div className="mindmap-container">
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

        <g transform={`translate(${cam.x}, ${cam.y}) scale(${cam.scale})`}>
          {/* Edges first (behind orbs) */}
          <AnimatePresence>
            {positions.map((p) =>
              p.parentX !== undefined && p.parentY !== undefined ? (
                <MindmapEdge key={`e-${p.node.id}`} x1={p.parentX} y1={p.parentY} x2={p.x} y2={p.y} />
              ) : null,
            )}
          </AnimatePresence>

          {/* Orbs */}
          <AnimatePresence>
            {positions.map((p) => (
              <MindmapOrb
                key={p.node.id}
                node={p.node}
                x={p.x}
                y={p.y}
                isCenter={p.node.id === ROOT_ID}
                isExplored={mindmap.exploredNodes.has(p.node.id)}
                isExpanded={mindmap.expandedNodes.has(p.node.id)}
                hasChildren={getChildren(p.node.id).length > 0}
                isActive={detailNode?.id === p.node.id}
                onTap={() => handleOrbTap(p.node.id)}
              />
            ))}
          </AnimatePresence>
        </g>
      </svg>

      {/* Detail Panel */}
      <AnimatePresence>
        {detailNode && (
          <DetailPanel key={detailNode.id} node={detailNode} onClose={() => setDetailNode(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
