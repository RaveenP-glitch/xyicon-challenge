# Polygon Visualizer

An interactive polygon visualizer that demonstrates finding the closest point on a polygon boundary to any given test point. Implements efficient O(n) algorithm supporting both convex and concave polygons.

## Features

- **Interactive Canvas Visualization**: Drag and drop test points to see real-time closest point calculations
- **Multiple Polygon Examples**: Pre-configured shapes including squares, triangles, L-shapes, pentagons, stars, and complex concave polygons
- **Efficient Algorithm**: O(n) time complexity using winding number for point-in-polygon testing
- **Numerical Stability**: Uses epsilon comparisons for robust edge case handling
- **Pure TypeScript Implementation**: No external libraries for core algorithm
- **Vanilla Canvas API**: Visualization uses only native Canvas 2D API and mouse events

## Algorithm Details

### Core Function

```typescript
function closestPointInPolygon(poly: Point[], pos: Point): Point
```

Returns the closest point to `pos` that lies inside or on the boundary of polygon `poly`.

### Implementation Approach

1. **Point-in-Polygon Test**: Uses winding number algorithm to determine if the test point is inside the polygon
2. **Distance-to-Segment Helper**: Computes closest point on a line segment using clamped projection
3. **Main Logic**:
   - If point is inside or on boundary → return the point itself
   - If point is outside → iterate through all edges and find the closest point on any edge

### Edge Cases Handled

- Point exactly on an edge or vertex
- Multiple equidistant edges (returns any valid closest point)
- Degenerate edges (duplicate vertices)
- Concave and convex polygons
- Numerical stability with epsilon comparisons

## Project Structure

```
polygon-visualizer/
├── src/
│   ├── polygon.ts       # Core algorithm implementation
│   └── visualizer.ts    # Canvas visualization
├── index.html           # Main HTML page
├── styles.css           # Styling
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
├── webpack.config.js    # Build configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Python 3 (for local server, or use any other HTTP server)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd polygon-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the local server:
```bash
npm start
```

5. Open your browser to `http://localhost:8000`

### Development Mode

For development with automatic rebuilding:

```bash
npm run dev
```

Then in another terminal:
```bash
npm run serve
```

## Usage

1. **Select a Polygon**: Use the dropdown menu to choose from predefined polygon shapes
2. **Drag the Test Point**: Click and drag the red circle to move the test point
3. **Observe Results**:
   - Green point shows the closest point on the polygon boundary
   - Dashed line shows the distance
   - Status panel indicates if point is inside/outside and displays distance

## Algorithm Complexity

- **Time Complexity**: O(n) where n is the number of polygon vertices
- **Space Complexity**: O(1) auxiliary space

## Testing

The visualizer includes several test cases:

1. **Square**: Basic convex polygon test
2. **L-Shape**: Concave polygon where closest point can be on inner corners
3. **Triangle**: Simplest polygon case
4. **Pentagon**: Regular convex polygon
5. **Star**: Concave polygon with multiple indentations
6. **Complex Concave**: Advanced concave shape with many vertices

### Manual Testing Scenarios

- Place test point inside polygon → should return the same point (distance ≈ 0)
- Place test point near a vertex → should return that vertex
- Place test point near an edge → should return closest point on that edge
- Test with concave corners → should correctly find closest point

## Technical Implementation

### TypeScript + Canvas 2D API

- No frameworks or libraries for visualization (per requirements)
- Uses only standard DOM APIs: `mousedown`, `mousemove`, `mouseup`
- Canvas 2D API for rendering

### Key Algorithms

**Winding Number Algorithm**: Determines if a point is inside a polygon by counting how many times the polygon winds around the point.

**Clamped Projection**: Projects a point onto a line segment and clamps the result to the segment bounds.

**Distance Optimization**: Uses squared distances to avoid expensive square root calculations until final result.

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

Potential improvements:
- Click-to-add vertices for custom polygon creation
- Animation of algorithm steps
- Performance metrics display
- Support for polygons with holes
- Export/import polygon definitions

## License

MIT License - feel free to use this code for learning or commercial purposes.

## Credits

Developed as a coding challenge demonstrating computational geometry algorithms and interactive visualizations.

