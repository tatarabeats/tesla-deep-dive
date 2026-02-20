import { getChildren } from '../data/visionTree';
import type { VisionNode } from '../types/visionTree';

export interface NodePosition {
  node: VisionNode;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

/**
 * Recursively compute positions for all visible nodes.
 * Root is at center. Children fan out away from root.
 * viewW/viewH are used to ensure root children fit on screen.
 */
export function computeLayout(
  rootNode: VisionNode,
  expandedNodes: Set<string>,
  centerX: number,
  centerY: number,
  viewW: number,
  viewH: number,
): NodePosition[] {
  const positions: NodePosition[] = [];

  // root children radius: fit within screen with margin
  const margin = 110; // orb size + text
  const rootRadius = Math.min(
    (viewW / 2) - margin,
    (viewH / 2) - margin,
    200, // cap so it doesn't get too big on desktop
  );

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

    const children = getChildren(node.id);
    if (children.length === 0) return;

    if (depth === 0) {
      // Root: place children evenly around the full circle
      const radius = rootRadius;
      const angleStep = (2 * Math.PI) / children.length;
      const startAngle = -Math.PI / 2; // top
      children.forEach((child, i) => {
        const angle = startAngle + i * angleStep;
        const cx = x + radius * Math.cos(angle);
        const cy = y + radius * Math.sin(angle);
        place(child, cx, cy, x, y, depth + 1);
      });
    } else {
      // Non-root: fan children outward
      const radius = Math.max(100, 140 - depth * 15);
      const outAngle = Math.atan2(y - parentY!, x - parentX!);
      const maxSpread = Math.min(Math.PI * 0.65, children.length * 0.4);
      const angleStep = children.length > 1 ? maxSpread / (children.length - 1) : 0;
      const startAngle = outAngle - maxSpread / 2;

      children.forEach((child, i) => {
        const angle = startAngle + i * angleStep;
        const cx = x + radius * Math.cos(angle);
        const cy = y + radius * Math.sin(angle);
        place(child, cx, cy, x, y, depth + 1);
      });
    }
  }

  place(rootNode, centerX, centerY, undefined, undefined, 0);
  return positions;
}
