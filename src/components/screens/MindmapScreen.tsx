import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData } from '../../data/visionTree';
import { computeLayout } from '../../utils/layout';
import MindmapOrb from '../mindmap/MindmapOrb';
import MindmapEdge from '../mindmap/MindmapEdge';

const ROOT_ID = 'root';

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

  // Use ref for camera to avoid stale closures in event handlers
  const cameraRef = useRef<Camera>({ x: 0, y: 0, scale: 1 });
  const [cameraState, setCameraState] = useState<Camera>({ x: 0, y: 0, scale: 1 });

  const updateCamera = useCallback((cam: Camera) => {
    cameraRef.current = cam;
    setCameraState(cam);
  }, []);

  // Interaction state refs (never stale)
  const dragRef = useRef<{ startX: number; startY: number; camX: number; camY: number } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number; camX: number; camY: number; midX: number; midY: number } | null>(null);
  const animFrameRef = useRef<number>(0);
  const isPinchingRef = useRef(false);

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const centerX = viewport.w / 2;
  const centerY = viewport.h / 2;

  const positions = useMemo(
    () => computeLayout(rootNode, mindmap.expandedNodes, centerX, centerY, viewport.w, viewport.h),
    [rootNode, mindmap.expandedNodes, centerX, centerY, viewport.w, viewport.h],
  );

  /* smooth pan to target camera position */
  const smoothPanTo = useCallback((targetX: number, targetY: number) => {
    cancelAnimationFrame(animFrameRef.current);
    const cam = cameraRef.current;
    const startX = cam.x;
    const startY = cam.y;
    const startTime = performance.now();
    const duration = 400;

    const animate = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      const newCam = {
        ...cameraRef.current,
        x: startX + (targetX - startX) * ease,
        y: startY + (targetY - startY) * ease,
      };
      updateCamera(newCam);
      if (t < 1) animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
  }, [updateCamera]);

  /* handle orb tap: toggle + auto-pan */
  const handleOrbTap = useCallback((nodeId: string) => {
    const willExpand = !mindmap.expandedNodes.has(nodeId);
    toggleNode(nodeId);

    if (willExpand) {
      const pos = positions.find(p => p.node.id === nodeId);
      if (pos) {
        const cam = cameraRef.current;
        const targetCamX = centerX - pos.x * cam.scale;
        const targetCamY = centerY - pos.y * cam.scale;
        smoothPanTo(targetCamX, targetCamY);
      }
    }
  }, [mindmap.expandedNodes, toggleNode, positions, centerX, centerY, smoothPanTo]);

  /* ── Unified touch handling (avoid pointer+touch conflict) ── */

  // On mobile: use touchstart/touchmove/touchend exclusively
  // On desktop: use pointerdown/pointermove/pointerup for mouse

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Skip if it's a touch event (handled by onTouchStart)
    if (e.pointerType === 'touch') return;
    const tag = (e.target as SVGElement).tagName;
    if (tag === 'circle' || tag === 'text') return;
    const cam = cameraRef.current;
    dragRef.current = { startX: e.clientX, startY: e.clientY, camX: cam.x, camY: cam.y };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    updateCamera({
      ...cameraRef.current,
      x: dragRef.current.camX + dx,
      y: dragRef.current.camY + dy,
    });
  }, [updateCamera]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    dragRef.current = null;
  }, []);

  /* ── Wheel zoom (desktop) ── */
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const cam = cameraRef.current;
    const factor = e.deltaY > 0 ? 0.93 : 1.07;
    const newScale = Math.min(2.5, Math.max(0.4, cam.scale * factor));
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      updateCamera({
        x: mx - (mx - cam.x) * (newScale / cam.scale),
        y: my - (my - cam.y) * (newScale / cam.scale),
        scale: newScale,
      });
    } else {
      updateCamera({ ...cam, scale: newScale });
    }
  }, [updateCamera]);

  /* ── Touch handlers (mobile: pan + pinch) ── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start — cancel any drag
      dragRef.current = null;
      isPinchingRef.current = true;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const cam = cameraRef.current;
      pinchRef.current = {
        dist: Math.hypot(dx, dy),
        scale: cam.scale,
        camX: cam.x,
        camY: cam.y,
        midX,
        midY,
      };
    } else if (e.touches.length === 1) {
      // Single touch drag
      const tag = (e.target as SVGElement).tagName;
      if (tag === 'circle' || tag === 'text') return;
      const cam = cameraRef.current;
      dragRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        camX: cam.x,
        camY: cam.y,
      };
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      // Pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const { scale: startScale, camX, camY, midX, midY } = pinchRef.current;
      const newScale = Math.min(2.5, Math.max(0.4, startScale * (dist / pinchRef.current.dist)));

      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        const mx = midX - rect.left;
        const my = midY - rect.top;
        updateCamera({
          x: mx - (mx - camX) * (newScale / startScale),
          y: my - (my - camY) * (newScale / startScale),
          scale: newScale,
        });
      } else {
        updateCamera({ ...cameraRef.current, scale: newScale });
      }
    } else if (e.touches.length === 1 && dragRef.current && !isPinchingRef.current) {
      // Single finger drag
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      updateCamera({
        ...cameraRef.current,
        x: dragRef.current.camX + dx,
        y: dragRef.current.camY + dy,
      });
    }
  }, [updateCamera]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      dragRef.current = null;
      pinchRef.current = null;
      isPinchingRef.current = false;
    } else if (e.touches.length === 1) {
      // Went from 2 fingers to 1 — don't start dragging from pinch
      pinchRef.current = null;
    }
  }, []);

  const transform = `translate(${cameraState.x}, ${cameraState.y}) scale(${cameraState.scale})`;

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
      {/* ─── Shared defs ─── */}
      <defs>
        <filter id="glow-root" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
        <filter id="glow-child" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
        <radialGradient id="orb-grad-root" cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor="rgba(232,220,200,0.28)" />
          <stop offset="35%" stopColor="rgba(180,170,150,0.10)" />
          <stop offset="70%" stopColor="rgba(60,65,80,0.08)" />
          <stop offset="100%" stopColor="rgba(11,17,32,0.92)" />
        </radialGradient>
        <radialGradient id="orb-grad-child" cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor="rgba(232,220,200,0.15)" />
          <stop offset="35%" stopColor="rgba(140,130,120,0.06)" />
          <stop offset="70%" stopColor="rgba(40,45,60,0.06)" />
          <stop offset="100%" stopColor="rgba(11,17,32,0.92)" />
        </radialGradient>
      </defs>

      <g transform={transform}>
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
              onTap={() => handleOrbTap(p.node.id)}
            />
          ))}
        </AnimatePresence>
      </g>
    </svg>
  );
}
