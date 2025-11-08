/**
 * Canvas-based visualizer for the polygon closest point algorithm
 * Uses only vanilla JavaScript/TypeScript and Canvas 2D API
 */

import { Point, closestPointInPolygon } from './polygon';

// Predefined polygon examples
const POLYGONS: Record<string, Point[]> = {
  square: [
    { x: 200, y: 150 },
    { x: 600, y: 150 },
    { x: 600, y: 450 },
    { x: 200, y: 450 }
  ],
  lshape: [
    { x: 150, y: 100 },
    { x: 400, y: 100 },
    { x: 400, y: 250 },
    { x: 650, y: 250 },
    { x: 650, y: 500 },
    { x: 150, y: 500 }
  ],
  triangle: [
    { x: 400, y: 100 },
    { x: 650, y: 500 },
    { x: 150, y: 500 }
  ],
  pentagon: [
    { x: 400, y: 100 },
    { x: 600, y: 220 },
    { x: 520, y: 450 },
    { x: 280, y: 450 },
    { x: 200, y: 220 }
  ],
  star: [
    { x: 400, y: 80 },
    { x: 440, y: 240 },
    { x: 600, y: 240 },
    { x: 470, y: 340 },
    { x: 520, y: 500 },
    { x: 400, y: 400 },
    { x: 280, y: 500 },
    { x: 330, y: 340 },
    { x: 200, y: 240 },
    { x: 360, y: 240 }
  ],
  complex: [
    { x: 150, y: 150 },
    { x: 300, y: 100 },
    { x: 450, y: 150 },
    { x: 500, y: 250 },
    { x: 650, y: 300 },
    { x: 550, y: 400 },
    { x: 500, y: 500 },
    { x: 350, y: 450 },
    { x: 250, y: 500 },
    { x: 150, y: 400 },
    { x: 100, y: 250 }
  ]
};

class PolygonVisualizer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private polygon: Point[];
  private testPoint: Point;
  private isDragging: boolean = false;
  private dragRadius: number = 15;
  
  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) {
      throw new Error(`Canvas with id "${canvasId}" not found`);
    }
    
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = context;
    
    // Initialize with square polygon
    this.polygon = [...POLYGONS.square];
    this.testPoint = { x: 100, y: 300 };
    
    this.setupEventListeners();
    this.draw();
  }
  
  private setupEventListeners(): void {
    // Mouse down - start dragging if near test point
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dx = x - this.testPoint.x;
      const dy = y - this.testPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= this.dragRadius) {
        this.isDragging = true;
        this.canvas.style.cursor = 'grabbing';
      }
    });
    
    // Mouse move - update test point position if dragging
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (this.isDragging) {
        this.testPoint.x = x;
        this.testPoint.y = y;
        this.draw();
      } else {
        // Update cursor based on proximity to test point
        const dx = x - this.testPoint.x;
        const dy = y - this.testPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= this.dragRadius) {
          this.canvas.style.cursor = 'grab';
        } else {
          this.canvas.style.cursor = 'crosshair';
        }
      }
    });
    
    // Mouse up - stop dragging
    this.canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.canvas.style.cursor = 'crosshair';
    });
    
    // Mouse leave - stop dragging
    this.canvas.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.canvas.style.cursor = 'crosshair';
    });
    
    // Polygon selector
    const select = document.getElementById('polygon-select') as HTMLSelectElement;
    if (select) {
      select.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLSelectElement;
        this.loadPolygon(target.value);
      });
    }
    
    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.testPoint = { x: 100, y: 300 };
        this.draw();
      });
    }
  }
  
  loadPolygon(name: string): void {
    if (POLYGONS[name]) {
      this.polygon = [...POLYGONS[name]];
      this.draw();
    }
  }
  
  private draw(): void {
    const { width, height } = this.canvas;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);
    
    // Calculate closest point
    const closestPoint = closestPointInPolygon(this.polygon, this.testPoint);
    
    // Calculate distance
    const dx = closestPoint.x - this.testPoint.x;
    const dy = closestPoint.y - this.testPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Update status text
    const isInside = distance < 0.01; // Close enough to consider inside
    const statusText = document.getElementById('status-text');
    const distanceText = document.getElementById('distance-text');
    
    if (statusText) {
      if (isInside) {
        statusText.textContent = 'Point is inside polygon';
        statusText.style.color = '#2ecc71';
      } else {
        statusText.textContent = 'Point is outside polygon';
        statusText.style.color = '#e74c3c';
      }
    }
    
    if (distanceText) {
      distanceText.textContent = `Distance: ${distance.toFixed(2)}px`;
    }
    
    // Draw connection line (if point is outside)
    if (!isInside) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.testPoint.x, this.testPoint.y);
      this.ctx.lineTo(closestPoint.x, closestPoint.y);
      this.ctx.strokeStyle = '#95a5a6';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([5, 5]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }
    
    // Draw polygon
    this.ctx.beginPath();
    this.ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      this.ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
    this.ctx.fill();
    this.ctx.strokeStyle = '#667eea';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    
    // Draw polygon vertices
    for (const vertex of this.polygon) {
      this.ctx.beginPath();
      this.ctx.arc(vertex.x, vertex.y, 5, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#667eea';
      this.ctx.fill();
    }
    
    // Draw closest point (if different from test point)
    if (!isInside) {
      this.ctx.beginPath();
      this.ctx.arc(closestPoint.x, closestPoint.y, 8, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#2ecc71';
      this.ctx.fill();
      this.ctx.strokeStyle = '#27ae60';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
    
    // Draw test point (always on top)
    this.ctx.beginPath();
    this.ctx.arc(this.testPoint.x, this.testPoint.y, 10, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#e74c3c';
    this.ctx.fill();
    this.ctx.strokeStyle = '#c0392b';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Draw hover ring around test point
    if (!this.isDragging) {
      this.ctx.beginPath();
      this.ctx.arc(this.testPoint.x, this.testPoint.y, this.dragRadius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = 'rgba(231, 76, 60, 0.3)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }
}

// Initialize visualizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PolygonVisualizer('canvas');
});

