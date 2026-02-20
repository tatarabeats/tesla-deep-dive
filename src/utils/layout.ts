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
 */
export function computeLayout(
  rootNode: VisionNode,
  expandedNodes: Set<string>,
  centerX: number,
  centerY: number,
): NodePosition[] {
  const positions: NodePosition[] = [];

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

    // radius shrinks slightly per depth
    const radius = depth === 0 ? 220 : Math.max(110, 160 - depth * 15);

    if (depth === 0) {
      // Root: place children evenly around the full circle
      const angleStep = (2 * Math.PI) / children.length;
      const startAngle = -Math.PI / 2; // top
      children.forEach((child, i) => {
        const angle = startAngle + i * angleStep;
        const cx = x + radius * Math.cos(angle);
        const cy = y + radius * Math.sin(angle);
        place(child, cx, cy, x, y, depth + 1);
      });
    } else {
      // Non-root: fan children outward from parent direction
      const outAngle = Math.atan2(y - parentY!, x - parentX!);

      // spread angle: narrower for fewer children, max ~120°
      const maxSpread = Math.min(Math.PI * 0.7, children.length * 0.45);
      const angleStep = children.length > 1
        ? maxSpread / (children.length - 1)
        : 0;
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
