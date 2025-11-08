# Demo Instructions

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Start the local server**:
   ```bash
   npm start
   ```
   
   Or use any HTTP server of your choice:
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js http-server (requires: npm install -g http-server)
   http-server -p 8000
   
   # PHP
   php -S localhost:8000
   ```

4. **Open in browser**:
   - Main visualizer: `http://localhost:8000/index.html`
   - Algorithm tests: `http://localhost:8000/tests.html`

## Interactive Demo Features

### Main Visualizer (index.html)

**Controls:**
- **Polygon Selection**: Dropdown menu with 6 predefined polygons
  - Square (basic convex)
  - Concave L-Shape
  - Triangle
  - Pentagon
  - Concave Star
  - Complex Concave shape

- **Dragging**: Click and drag the red test point anywhere on the canvas
- **Reset**: Button to reset test point to initial position

**Visual Elements:**
- **Blue polygon**: The selected polygon with filled semi-transparent interior
- **Red circle**: Draggable test point
- **Green circle**: Closest point on polygon boundary (only shown when outside)
- **Dashed line**: Distance connection (only shown when outside)

**Real-time Information:**
- Status indicator (inside/outside polygon)
- Distance measurement in pixels
- Algorithm details

### Test Page (tests.html)

Automated test suite demonstrating:
- Point inside polygon → returns same point
- Point outside → returns closest boundary point
- Point on vertex → returns vertex
- Point on edge → returns point on edge
- Concave polygon handling
- Various edge cases

## Example Use Cases

### Test Case 1: Point Inside Polygon
1. Select "Square" from dropdown
2. Drag red point inside the blue square
3. Observe: Green point disappears, status shows "inside", distance ≈ 0

### Test Case 2: Point Outside Polygon
1. Select "Square" from dropdown
2. Drag red point outside the square
3. Observe: Green point appears on nearest edge, dashed line shows distance

### Test Case 3: Concave Corner
1. Select "Concave L-Shape" from dropdown
2. Drag red point near the inner corner (right side, middle area)
3. Observe: Algorithm correctly finds closest point on inner edge

### Test Case 4: Near Vertex
1. Select any polygon
2. Drag red point close to a corner but outside
3. Observe: Green point snaps to the nearest vertex

### Test Case 5: Complex Concave
1. Select "Complex Concave" from dropdown
2. Try dragging point to various positions
3. Observe: Algorithm handles complex geometry correctly

## Algorithm Behavior

**Inside Polygon:**
- Closest point = test point itself
- Distance = 0
- No green dot or line displayed

**Outside Polygon:**
- Closest point = nearest point on any edge
- Distance = Euclidean distance to boundary
- Green dot shows the result
- Dashed line connects test point to closest point

**On Boundary:**
- Treated as "inside"
- Returns the point itself
- Distance ≈ 0 (within numerical epsilon)

## Performance Notes

- Algorithm runs in **O(n)** time where n = number of vertices
- Real-time updates as you drag (typically 60 FPS)
- Handles polygons with 3-20+ vertices efficiently
- No noticeable lag even with complex shapes

## Development Mode

For live reloading during development:

1. **Terminal 1** - Watch for changes:
   ```bash
   npm run dev
   ```

2. **Terminal 2** - Serve files:
   ```bash
   npm run serve
   ```

3. Edit TypeScript files in `src/` and webpack will automatically rebuild

## Troubleshooting

**Problem**: Canvas appears but nothing renders
- **Solution**: Check browser console for errors, ensure bundle.js loaded

**Problem**: Can't drag the test point
- **Solution**: Ensure JavaScript is enabled, try refreshing page

**Problem**: Build fails
- **Solution**: Delete `node_modules` and `dist`, then run `npm install` and `npm run build`

**Problem**: npm install fails with permission errors
- **Solution**: Run with appropriate permissions or fix npm cache ownership

## Browser Console

Open browser developer tools (F12) to see:
- No console errors indicates proper functioning
- Any algorithm warnings or edge cases
- Performance metrics (optional, can add)

## Code Structure Overview

```
src/
  polygon.ts      # Core algorithm implementation
    - Point interface
    - closestPointInPolygon()
    - isPointInPolygon() (winding number)
    - closestPointOnSegment() (projection)
    - Helper functions
    
  visualizer.ts   # Canvas rendering and interaction
    - PolygonVisualizer class
    - Mouse event handling
    - Rendering logic
    - Predefined polygons

index.html        # Main interactive demo
styles.css        # Modern, responsive styling
tests.html        # Automated test suite
```

## Next Steps

After exploring the demo:
1. Review the algorithm in `src/polygon.ts`
2. Check test cases in `tests.html`
3. Read implementation details in `README.md`
4. Modify polygon shapes in `src/visualizer.ts` (POLYGONS constant)
5. Add your own test cases

## Hosting Online

To share this demo:

**GitHub Pages:**
```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

# Enable GitHub Pages in repo settings
# Point to main branch, root directory
```

**Netlify/Vercel:**
- Drag and drop the entire folder to their web interface
- Or connect to your Git repository

**Build Output:**
- `index.html`, `styles.css`, `dist/bundle.js`, `tests.html` are all you need to deploy

