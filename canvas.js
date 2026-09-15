/**
 * Doodle-to-Emoji: Interactive Notepad Canvas
 * Supports high-DPI retina display, smooth bezier curves,
 * tools (pen, marker, highlighter, eraser), paper styles, and undo/redo.
 */

class NotepadCanvas {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.options = Object.assign({
      tool: 'pen',
      color: '#ffffff',
      strokeWidth: 4,
      paperStyle: 'dark',
      onStrokeEnd: null,
      onStrokeMove: null,
      onHistoryChange: null
    }, options);

    this.strokes = []; // Active strokes history
    this.redoStack = []; // Redo history
    this.currentStroke = null;
    this.isDrawing = false;

    this.init();
  }

  init() {
    this.setupRetina();
    this.attachEventListeners();
    this.redraw();

    setTimeout(() => {
      this.setupRetina();
      this.redraw();
    }, 50);

    window.addEventListener('resize', () => {
      this.setupRetina();
      this.redraw();
    });
  }

  setupRetina() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const parentW = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : 600;
    const w = rect.width > 0 ? rect.width : parentW;
    const h = rect.height > 0 ? rect.height : 450;

    this.displayWidth = w;
    this.displayHeight = h;

    // Set physical resolution
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);

    // Scale canvas context
    this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    this.ctx.scale(dpr, dpr);
  }

  attachEventListeners() {
    const el = this.canvas;

    const getPos = (e) => {
      const rect = el.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        pressure: e.pressure && e.pressure > 0 ? e.pressure : 0.5
      };
    };

    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      this.isDrawing = true;
      const pos = getPos(e);

      this.currentStroke = {
        tool: this.options.tool,
        color: this.options.color,
        width: this.options.strokeWidth,
        points: [pos]
      };

      // Redo stack is cleared on new action
      this.redoStack = [];
      this.notifyHistory();
    });

    el.addEventListener('pointermove', (e) => {
      if (!this.isDrawing || !this.currentStroke) return;
      e.preventDefault();
      const pos = getPos(e);
      const points = this.currentStroke.points;

      // Filter duplicate points that are too close
      const last = points[points.length - 1];
      const dist = Math.hypot(pos.x - last.x, pos.y - last.y);
      if (dist < 2) return;

      points.push(pos);
      this.redraw();

      if (typeof this.options.onStrokeMove === 'function' && points.length % 4 === 0) {
        this.options.onStrokeMove(this.getAllStrokes());
      }
    });

    const endStroke = (e) => {
      if (!this.isDrawing) return;
      this.isDrawing = false;

      if (this.currentStroke && this.currentStroke.points.length > 0) {
        this.strokes.push(this.currentStroke);
        this.currentStroke = null;
        this.redraw();

        if (typeof this.options.onStrokeEnd === 'function') {
          this.options.onStrokeEnd(this.strokes);
        }
        this.notifyHistory();
      }
    };

    el.addEventListener('pointerup', endStroke);
    el.addEventListener('pointercancel', endStroke);
  }

  getAllStrokes() {
    if (this.currentStroke && this.currentStroke.points.length > 0) {
      return [...this.strokes, this.currentStroke];
    }
    return this.strokes;
  }

  setTool(tool) {
    this.options.tool = tool;
  }

  setColor(color) {
    this.options.color = color;
  }

  setStrokeWidth(width) {
    this.options.strokeWidth = width;
  }

  setPaperStyle(style) {
    this.options.paperStyle = style;
    this.canvas.setAttribute('data-paper', style);
    this.redraw();
  }

  canUndo() {
    return this.strokes.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  undo() {
    if (!this.canUndo()) return;
    const stroke = this.strokes.pop();
    this.redoStack.push(stroke);
    this.redraw();
    this.notifyHistory();
    if (typeof this.options.onStrokeEnd === 'function') {
      this.options.onStrokeEnd(this.strokes);
    }
  }

  redo() {
    if (!this.canRedo()) return;
    const stroke = this.redoStack.pop();
    this.strokes.push(stroke);
    this.redraw();
    this.notifyHistory();
    if (typeof this.options.onStrokeEnd === 'function') {
      this.options.onStrokeEnd(this.strokes);
    }
  }

  clear() {
    if (this.strokes.length === 0) return;
    this.strokes = [];
    this.redoStack = [];
    this.currentStroke = null;
    this.redraw();
    this.notifyHistory();
    if (typeof this.options.onStrokeEnd === 'function') {
      this.options.onStrokeEnd(this.strokes);
    }
  }

  notifyHistory() {
    if (typeof this.options.onHistoryChange === 'function') {
      this.options.onHistoryChange({
        canUndo: this.canUndo(),
        canRedo: this.canRedo(),
        strokeCount: this.strokes.length
      });
    }
  }

  /**
   * Draw paper pattern (dots, grid, lines) directly onto the canvas
   */
  drawPaperPattern() {
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    // Pitch dark obsidian notepad
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, w, h);

    // Subtle dark dot matrix
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    const step = 28;
    for (let x = step / 2; x < w; x += step) {
      for (let y = step / 2; y < h; y += step) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  renderStroke(stroke) {
    const ctx = this.ctx;
    const pts = stroke.points;
    if (!pts || pts.length === 0) return;

    ctx.save();

    if (stroke.tool === 'eraser') {
      ctx.strokeStyle = '#0a0e17';
      ctx.lineWidth = stroke.width * 5;
      ctx.globalAlpha = 1.0;
    } else if (stroke.tool === 'highlighter') {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width * 3.5;
      ctx.globalAlpha = 0.45;
      ctx.globalCompositeOperation = 'screen';
    } else if (stroke.tool === 'marker') {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width * 2.0;
      ctx.globalAlpha = 0.95;
    } else {
      // Pen
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.globalAlpha = 1.0;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (pts.length === 1) {
      // Single dot tap
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
    } else {
      // Smooth spline interpolation
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }

      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    }

    ctx.restore();
  }

  redraw() {
    this.drawPaperPattern();

    // Render all committed strokes
    for (const stroke of this.strokes) {
      this.renderStroke(stroke);
    }

    // Render current active stroke
    if (this.currentStroke) {
      this.renderStroke(this.currentStroke);
    }
  }

  /**
   * Export the canvas drawing as a data URL PNG
   */
  exportImage(includeEmoji = null) {
    const tempCanvas = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    const tCtx = tempCanvas.getContext('2d');

    // Draw full canvas onto temp
    tCtx.drawImage(this.canvas, 0, 0);

    // If an emoji was provided, stamp it nicely on bottom-right
    if (includeEmoji) {
      tCtx.save();
      tCtx.scale(dpr, dpr);
      const fontSize = 48;
      tCtx.font = `${fontSize}px sans-serif`;
      tCtx.textAlign = 'right';
      tCtx.textBaseline = 'bottom';
      tCtx.shadowColor = 'rgba(0,0,0,0.2)';
      tCtx.shadowBlur = 8;
      tCtx.shadowOffsetY = 3;
      tCtx.fillText(includeEmoji, this.displayWidth - 20, this.displayHeight - 20);
      tCtx.restore();
    }

    return tempCanvas.toDataURL('image/png');
  }
}

if (typeof window !== 'undefined') {
  window.NotepadCanvas = NotepadCanvas;
}
