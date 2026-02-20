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
 * Root is at center. Children are placed in a circle around their parent.
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
    angleOffset?: number,
    depth: number = 0,
  ) {
    positions.push({ node, x, y, parentX, parentY });

    if (!expandedNodes.has(node.id)) return;

    const children = getChildren(node.id);
    if (children.length === 0) return;

    // radius grows with depth but shrinks for deeper nodes
    const radius = depth === 0 ? 180 : Math.max(100, 160 - depth * 20);
    const angleStep = (2 * Math.PI) / children.length;

    // if we have a parent angle, start spreading from the opposite direction
    let startAngle: number;
    if (parentX !== undefined && parentY !== undefined) {
      const parentAngle = Math.atan2(y - parentY, x - parentX);
      startAngle = parentAngle - ((children.length - 1) * angleStep) / 2;
    } else {
      startAngle = angleOffset ?? -Math.PI / 2;
    }

    children.forEach((child, i) => {
      const angle = startAngle + i * angleStep;
      const cx = x + radius * Math.cos(angle);
      const cy = y + radius * Math.sin(angle);
      place(child, cx, cy, x, y, angle, depth + 1);
    });
  }

  place(rootNode, centerX, centerY, undefined, undefined, -Math.PI / 2, 0);
  return positions;
}
