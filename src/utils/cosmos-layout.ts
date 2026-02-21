/** Compute child orb positions around a parent */

export interface OrbPosition {
  id: string;
  x: number;
  y: number;
  size: number;
}

const SIZE_BY_DEPTH = [80, 52, 42, 34, 28];
const RADIUS_BY_DEPTH = [0, 130, 95, 72, 55];

export function getOrbSize(depth: number): number {
  return SIZE_BY_DEPTH[Math.min(depth, SIZE_BY_DEPTH.length - 1)];
}

export function getOrbitRadius(depth: number): number {
  return RADIUS_BY_DEPTH[Math.min(depth, RADIUS_BY_DEPTH.length - 1)];
}

/**
 * Compute positions for children around a parent.
 * parentAngle: the angle FROM the grandparent TO this parent (so children spread outward)
 */
export function computeChildPositions(
  parentX: number,
  parentY: number,
  childIds: string[],
  childDepth: number,
  parentAngle: number | null, // null for root
): OrbPosition[] {
  const count = childIds.length;
  if (count === 0) return [];

  const radius = getOrbitRadius(childDepth);
  const size = getOrbSize(childDepth);

  // For root's children (depth 1): full circle
  if (parentAngle === null) {
    return childIds.map((id, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2; // start from top
      return {
        id,
        x: parentX + Math.cos(angle) * radius,
        y: parentY + Math.sin(angle) * radius,
        size,
      };
    });
  }

  // For deeper nodes: spread in a fan arc away from parent direction
  const spreadAngle = Math.min(Math.PI * 0.8, count * 0.5); // wider fan for more children
  const startAngle = parentAngle - spreadAngle / 2;

  return childIds.map((id, i) => {
    const angle = count === 1
      ? parentAngle
      : startAngle + (i / (count - 1)) * spreadAngle;
    return {
      id,
      x: parentX + Math.cos(angle) * radius,
      y: parentY + Math.sin(angle) * radius,
      size,
    };
  });
}

/** Get the angle from parent to child */
export function getAngle(px: number, py: number, cx: number, cy: number): number {
  return Math.atan2(cy - py, cx - px);
}
