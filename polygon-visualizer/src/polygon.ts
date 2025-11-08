/**
 * Polygon Visualizer - Core Algorithm
 * Implements closest point calculation for polygons (convex or concave)
 */

export interface Point {
  x: number;
  y: number;
}

const EPSILON = 1e-10;

/**
 * Calculates the squared distance between two points
 * (avoids expensive sqrt operation when only comparing distances)
 */
function distanceSquared(p1: Point, p2: Point): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return dx * dx + dy * dy;
}

/**
 * Finds the closest point on a line segment to a given point.
 * Uses clamped projection onto the segment.
 * 
 * @param a - Start point of segment
 * @param b - End point of segment
 * @param p - Point to find closest point to
 * @returns The closest point on segment [a, b] to point p
 */
function closestPointOnSegment(a: Point, b: Point, p: Point): Point {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  
  // Handle degenerate case: segment is a point
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared < EPSILON) {
    return { x: a.x, y: a.y };
  }
  
  // Project p onto the line defined by segment [a, b]
  // t = ((p - a) · (b - a)) / |b - a|²
  const t = Math.max(0, Math.min(1, 
    ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSquared
  ));
  
  // Return the point at parameter t along the segment
  return {
    x: a.x + t * dx,
    y: a.y + t * dy
  };
}

/**
 * Tests if a point is inside a polygon using the winding number algorithm.
 * This handles both convex and concave polygons correctly.
 * 
 * @param poly - Array of polygon vertices (counter-clockwise or clockwise)
 * @param p - Point to test
 * @returns true if point is inside or on the boundary, false otherwise
 */
function isPointInPolygon(poly: Point[], p: Point): boolean {
  const n = poly.length;
  if (n < 3) return false;
  
  let windingNumber = 0;
  
  for (let i = 0; i < n; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    
    // Check if point is on the edge (within epsilon)
    const closest = closestPointOnSegment(a, b, p);
    if (distanceSquared(closest, p) < EPSILON) {
      return true; // Point is on the boundary
    }
    
    // Calculate winding number contribution
    if (a.y <= p.y) {
      if (b.y > p.y) { // Upward crossing
        if (isLeft(a, b, p) > 0) {
          windingNumber++;
        }
      }
    } else {
      if (b.y <= p.y) { // Downward crossing
        if (isLeft(a, b, p) < 0) {
          windingNumber--;
        }
      }
    }
  }
  
  return windingNumber !== 0;
}

/**
 * Tests if a point is to the left of a line segment.
 * Uses the cross product.
 * 
 * @returns > 0 if p is left of line [a, b]
 *          = 0 if p is on the line
 *          < 0 if p is right of line [a, b]
 */
function isLeft(a: Point, b: Point, p: Point): number {
  return (b.x - a.x) * (p.y - a.y) - (p.x - a.x) * (b.y - a.y);
}

/**
 * Returns the closest point to `pos` that lies inside or on the boundary
 * of the polygon `poly` (non-self-intersecting; may be concave).
 * 
 * Time complexity: O(n) where n is the number of vertices
 * 
 * @param poly - Array of polygon vertices (must form a simple, non-self-intersecting polygon)
 * @param pos - The point to find the closest polygon point to
 * @returns The closest point inside or on the polygon boundary
 */
export function closestPointInPolygon(poly: Point[], pos: Point): Point {
  if (poly.length < 3) {
    throw new Error("Polygon must have at least 3 vertices");
  }
  
  // If the point is inside or on the boundary, return it
  if (isPointInPolygon(poly, pos)) {
    return { x: pos.x, y: pos.y };
  }
  
  // Point is outside, find the closest point on the polygon boundary
  let closestPoint = closestPointOnSegment(poly[0], poly[1], pos);
  let minDistSquared = distanceSquared(closestPoint, pos);
  
  const n = poly.length;
  for (let i = 1; i < n; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    
    const candidate = closestPointOnSegment(a, b, pos);
    const distSq = distanceSquared(candidate, pos);
    
    if (distSq < minDistSquared) {
      minDistSquared = distSq;
      closestPoint = candidate;
    }
  }
  
  return closestPoint;
}

