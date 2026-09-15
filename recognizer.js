/**
 * Doodle-to-Emoji: High-Accuracy Recognition & Matching Engine
 * Features:
 * - Spatial stroke clustering (handles multiple doodles on canvas)
 * - Semantic facial expression & shape feature analysis (smiles, frowns, tears, ears, stars, hearts)
 * - Bidirectional Chamfer contour distance matching
 */

class EmojiRecognizer {
  constructor(templates = []) {
    this.gridSize = 28;
    this.templates = [];
    this.initCanvas();
    if (templates && templates.length > 0) {
      this.loadTemplates(templates);
    }
  }

  initCanvas() {
    this.offCanvas = document.createElement('canvas');
    this.offCanvas.width = this.gridSize;
    this.offCanvas.height = this.gridSize;
    this.offCtx = this.offCanvas.getContext('2d', { willReadFrequently: true });
  }

  loadTemplates(templates) {
    this.templates = templates.map((tmpl) => {
      const data = this.rasterizeTemplate(tmpl);
      return {
        ...tmpl,
        ...data
      };
    });
  }

  rasterizeTemplate(tmpl) {
    const sz = this.gridSize;
    const ctx = this.offCtx;
    ctx.clearRect(0, 0, sz, sz);

    ctx.save();
    const margin = 2;
    const drawSize = sz - margin * 2;
    ctx.translate(margin, margin);
    ctx.scale(drawSize / 100, drawSize / 100);

    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    try {
      tmpl.draw(ctx);
    } catch (e) {
      console.error(`Error drawing template ${tmpl.id}:`, e);
    }
    ctx.restore();

    const imgData = ctx.getImageData(0, 0, sz, sz).data;
    const mask = new Uint8Array(sz * sz);
    let pixelCount = 0;
    let sumX = 0, sumY = 0;
    let topMass = 0;
    let minX = sz, maxX = 0, minY = sz, maxY = 0;

    for (let y = 0; y < sz; y++) {
      for (let x = 0; x < sz; x++) {
        const idx = y * sz + x;
        const alpha = imgData[idx * 4 + 3];
        if (alpha > 40) {
          mask[idx] = 1;
          pixelCount++;
          sumX += x;
          sumY += y;
          if (y < sz / 2) topMass++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const dt = this.computeDistanceTransform(mask, sz, sz);
    const width = Math.max(1, maxX - minX);
    const height = Math.max(1, maxY - minY);
    const aspectRatio = width / height;

    return {
      mask,
      dt,
      pixelCount: Math.max(1, pixelCount),
      cx: pixelCount > 0 ? sumX / pixelCount : sz / 2,
      cy: pixelCount > 0 ? sumY / pixelCount : sz / 2,
      topRatio: pixelCount > 0 ? topMass / pixelCount : 0.5,
      aspectRatio
    };
  }

  computeDistanceTransform(mask, width, height) {
    const size = width * height;
    const INF = 999;
    const dt = new Float32Array(size);

    for (let i = 0; i < size; i++) {
      dt[i] = mask[i] === 1 ? 0 : INF;
    }

    // Forward pass
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (dt[idx] === 0) continue;

        let d = dt[idx];
        if (x > 0) d = Math.min(d, dt[idx - 1] + 1.0);
        if (y > 0) {
          d = Math.min(d, dt[idx - width] + 1.0);
          if (x > 0) d = Math.min(d, dt[idx - width - 1] + 1.414);
          if (x < width - 1) d = Math.min(d, dt[idx - width + 1] + 1.414);
        }
        dt[idx] = d;
      }
    }

    // Backward pass
    for (let y = height - 1; y >= 0; y--) {
      for (let x = width - 1; x >= 0; x--) {
        const idx = y * width + x;
        if (dt[idx] === 0) continue;

        let d = dt[idx];
        if (x < width - 1) d = Math.min(d, dt[idx + 1] + 1.0);
        if (y < height - 1) {
          d = Math.min(d, dt[idx + width] + 1.0);
          if (x < width - 1) d = Math.min(d, dt[idx + width + 1] + 1.414);
          if (x > 0) d = Math.min(d, dt[idx + width - 1] + 1.414);
        }
        dt[idx] = d;
      }
    }

    return dt;
  }

  /**
   * Separate strokes into distinct spatial clusters (e.g. two drawings side by side)
   */
  clusterStrokes(strokes) {
    if (strokes.length <= 1) return [strokes];

    // Compute bounding boxes for each stroke
    const strokeBoxes = strokes.map((s, idx) => {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const p of s.points) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }
      return { idx, stroke: s, minX, maxX, minY, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w: maxX - minX, h: maxY - minY };
    });

    // Group strokes that are spatially overlapping or very close
    const clusters = [];
    const visited = new Set();

    for (let i = 0; i < strokeBoxes.length; i++) {
      if (visited.has(i)) continue;

      const currentCluster = [strokeBoxes[i]];
      visited.add(i);

      let added = true;
      while (added) {
        added = false;
        for (let j = 0; j < strokeBoxes.length; j++) {
          if (visited.has(j)) continue;

          // Check proximity to any stroke currently in the cluster
          const b2 = strokeBoxes[j];
          let isNear = false;

          for (const b1 of currentCluster) {
            // Distance between bounding boxes
            const gapX = Math.max(0, Math.max(b1.minX - b2.maxX, b2.minX - b1.maxX));
            const gapY = Math.max(0, Math.max(b1.minY - b2.maxY, b2.minY - b1.maxY));
            const threshold = Math.max(35, Math.min(b1.w, b1.h, b2.w, b2.h) * 0.45);

            if (gapX <= threshold && gapY <= threshold) {
              isNear = true;
              break;
            }
          }

          if (isNear) {
            currentCluster.push(b2);
            visited.add(j);
            added = true;
          }
        }
      }

      clusters.push(currentCluster.map((b) => b.stroke));
    }

    return clusters;
  }

  /**
   * Detect semantic high-level features from stroke geometry
   */
  detectSemanticFeatures(strokes, bounds) {
    const features = {
      isFace: false,
      isSmile: false,
      isFrown: false,
      isTear: false,
      isCat: false,
      isStar: false,
      isHeart: false,
      isSun: false
    };

    if (!strokes || strokes.length === 0) return features;

    const { minX, maxX, minY, maxY, strokeW, strokeH } = bounds;
    const aspect = strokeW / Math.max(1, strokeH);

    // Collect all points across all strokes
    const allPts = strokes.flatMap(s => s.points || []);

    // 1. Detect Poop / Stacked Coils / Pyramid (e.g. 💩)
    if (allPts.length >= 8 && aspect >= 0.55 && aspect <= 1.55) {
      const getSpanAtY = (relY, band = 0.08) => {
        const slice = allPts.filter(p => Math.abs((p.y - minY) / strokeH - relY) <= band);
        if (slice.length < 2) return 0;
        let pmin = Infinity, pmax = -Infinity;
        for (const p of slice) {
          if (p.x < pmin) pmin = p.x;
          if (p.x > pmax) pmax = p.x;
        }
        return pmax - pmin;
      };

      const wBot = getSpanAtY(0.85, 0.10);
      const wMidLow = getSpanAtY(0.60, 0.10);
      const wMidHigh = getSpanAtY(0.38, 0.10);
      const wTop = getSpanAtY(0.18, 0.12);

      if (wBot > 0 && wMidLow > 0 && wTop > 0) {
        // Taper check: bottom is wider than mid, mid is wider than top
        const effectiveMid = wMidHigh > 0 ? (wMidLow + wMidHigh) / 2 : wMidLow;
        if (wBot > effectiveMid * 1.10 && effectiveMid > wTop * 1.15) {
          features.isPoop = true;
        }
      }
    }

    // 2. Look for outer enclosing circle / oval for faces
    let maxStrokeIdx = -1;
    let maxLen = 0;

    strokes.forEach((s, idx) => {
      let len = 0;
      for (let i = 1; i < s.points.length; i++) {
        len += Math.hypot(s.points[i].x - s.points[i - 1].x, s.points[i].y - s.points[i - 1].y);
      }
      if (len > maxLen) {
        maxLen = len;
        maxStrokeIdx = idx;
      }
    });

    if (maxStrokeIdx >= 0 && !features.isPoop) {
      const mainStroke = strokes[maxStrokeIdx];
      const pStart = mainStroke.points[0];
      const pEnd = mainStroke.points[mainStroke.points.length - 1];
      const closeDist = Math.hypot(pStart.x - pEnd.x, pStart.y - pEnd.y);
      // Strict loop requirement: ends must meet within 25% of smaller dimension
      const isLoop = closeDist < Math.min(strokeW, strokeH) * 0.28;

      // If loop with aspect ratio ~1:1 and other strokes strictly inside
      if (isLoop && aspect > 0.72 && aspect < 1.40 && strokes.length >= 2) {
        const innerStrokes = strokes.filter((_, idx) => idx !== maxStrokeIdx);

        // Check that inner strokes are actually inside the outer circle bounds
        const strictlyInside = innerStrokes.filter((s) => {
          const sMinX = Math.min(...s.points.map(p => p.x));
          const sMaxX = Math.max(...s.points.map(p => p.x));
          const sMinY = Math.min(...s.points.map(p => p.y));
          const sMaxY = Math.max(...s.points.map(p => p.y));
          return sMinX >= minX + strokeW * 0.08 &&
                 sMaxX <= maxX - strokeW * 0.08 &&
                 sMinY >= minY + strokeH * 0.08 &&
                 sMaxY <= maxY - strokeH * 0.08;
        });

        if (strictlyInside.length >= 1) {
          let hasLeftEye = false;
          let hasRightEye = false;
          let mouthStroke = null;
          let tearStroke = null;

          strictlyInside.forEach((s) => {
            const avgY = s.points.reduce((acc, p) => acc + p.y, 0) / s.points.length;
            const avgX = s.points.reduce((acc, p) => acc + p.x, 0) / s.points.length;
            const relY = (avgY - minY) / strokeH;
            const relX = (avgX - minX) / strokeW;

            if (relY >= 0.20 && relY <= 0.58) {
              if (relX < 0.48) hasLeftEye = true;
              if (relX > 0.52) hasRightEye = true;
            }

            if (relY >= 0.45 && relY <= 0.78 && relX < 0.48 && s.points.length > 3) {
              tearStroke = s;
            }

            if (relY >= 0.50 && relY <= 0.90 && s.points.length >= 3) {
              mouthStroke = s;
            }
          });

          if (hasLeftEye || hasRightEye || mouthStroke) {
            features.isFace = true;
            if (tearStroke) features.isTear = true;

            if (mouthStroke && mouthStroke.points.length >= 3) {
              const pts = mouthStroke.points;
              const yStart = pts[0].y;
              const yEnd = pts[pts.length - 1].y;
              const yMid = pts[Math.floor(pts.length / 2)].y;
              const avgEndsY = (yStart + yEnd) / 2;

              if (yMid > avgEndsY + 2) features.isSmile = true;
              else if (yMid < avgEndsY - 2) features.isFrown = true;
            }
          }
        }
      }

      // Check for Star
      if (aspect > 0.75 && aspect < 1.35 && strokes.length <= 5) {
        const boxPerim = 2 * (strokeW + strokeH);
        if (maxLen > boxPerim * 0.9) features.isStar = true;
      }

      // Check for Heart
      if (aspect > 0.75 && aspect < 1.35) {
        const topPts = mainStroke.points.filter(p => (p.y - minY) / strokeH < 0.35);
        const botPts = mainStroke.points.filter(p => (p.y - minY) / strokeH > 0.80);
        if (topPts.length >= 4 && botPts.length >= 2) {
          const avgBotX = botPts.reduce((acc, p) => acc + p.x, 0) / botPts.length;
          if (Math.abs((avgBotX - minX) / strokeW - 0.5) < 0.2) features.isHeart = true;
        }
      }
    }

    return features;
  }

  /**
   * Predict single stroke set
   */
  scoreStrokeSet(strokes) {
    let totalPoints = 0;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    for (const stroke of strokes) {
      if (!stroke.points || stroke.points.length === 0) continue;
      for (const pt of stroke.points) {
        totalPoints++;
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      }
    }

    if (totalPoints < 3) return [];

    const strokeW = Math.max(1, maxX - minX);
    const strokeH = Math.max(1, maxY - minY);
    const userAspectRatio = strokeW / strokeH;
    const bounds = { minX, maxX, minY, maxY, strokeW, strokeH };

    // Semantic feature extraction
    const semantic = this.detectSemanticFeatures(strokes, bounds);

    // Rasterize strokes to 28x28 grid
    const sz = this.gridSize;
    const ctx = this.offCtx;
    ctx.clearRect(0, 0, sz, sz);

    const margin = 2;
    const targetSize = sz - margin * 2;
    const scale = Math.min(targetSize / strokeW, targetSize / strokeH);
    const offsetX = margin + (targetSize - strokeW * scale) / 2 - minX * scale;
    const offsetY = margin + (targetSize - strokeH * scale) / 2 - minY * scale;

    ctx.save();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.max(1.8, Math.min(3.2, 26 / Math.max(strokeW, strokeH) * 3));
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const stroke of strokes) {
      if (!stroke.points || stroke.points.length === 0) continue;
      ctx.beginPath();
      const p0 = stroke.points[0];
      ctx.moveTo(p0.x * scale + offsetX, p0.y * scale + offsetY);

      for (let i = 1; i < stroke.points.length; i++) {
        const pt = stroke.points[i];
        ctx.lineTo(pt.x * scale + offsetX, pt.y * scale + offsetY);
      }
      ctx.stroke();
    }
    ctx.restore();

    const imgData = ctx.getImageData(0, 0, sz, sz).data;
    const userMask = new Uint8Array(sz * sz);
    let userPixelCount = 0;
    let sumX = 0, sumY = 0;
    let topMass = 0;

    for (let y = 0; y < sz; y++) {
      for (let x = 0; x < sz; x++) {
        const idx = y * sz + x;
        if (imgData[idx * 4 + 3] > 40) {
          userMask[idx] = 1;
          userPixelCount++;
          sumX += x;
          sumY += y;
          if (y < sz / 2) topMass++;
        }
      }
    }

    if (userPixelCount < 4) return [];

    const userDT = this.computeDistanceTransform(userMask, sz, sz);
    const userTopRatio = topMass / userPixelCount;

    // Score all templates
    const scores = [];

    for (const tmpl of this.templates) {
      // 1. Forward Chamfer
      let forwardSum = 0;
      for (let i = 0; i < sz * sz; i++) {
        if (userMask[i] === 1) {
          forwardSum += tmpl.dt[i];
        }
      }
      const forwardDist = forwardSum / userPixelCount;

      // 2. Backward Chamfer
      let backwardSum = 0;
      for (let i = 0; i < sz * sz; i++) {
        if (tmpl.mask[i] === 1) {
          backwardSum += userDT[i];
        }
      }
      const backwardDist = backwardSum / tmpl.pixelCount;

      const chamferDist = 0.55 * forwardDist + 0.45 * backwardDist;
      const arDiff = Math.abs(Math.log(userAspectRatio / tmpl.aspectRatio));
      const arPenalty = Math.min(3.0, arDiff * 1.3);
      const massDiff = Math.abs(userTopRatio - tmpl.topRatio);
      const massPenalty = massDiff * 1.4;

      let totalDist = chamferDist + arPenalty + massPenalty;

      // Semantic Bonus / Penalty System
      if (semantic.isFace) {
        if (tmpl.id === 'smiley') {
          if (semantic.isSmile) totalDist *= 0.35; // Huge boost for smile
          else if (!semantic.isFrown) totalDist *= 0.6;
        } else if (tmpl.id === 'sad_face') {
          if (semantic.isFrown || semantic.isTear) totalDist *= 0.30; // Huge boost for sad
          else if (!semantic.isSmile) totalDist *= 0.65;
        } else if (tmpl.id === 'cat' && semantic.isCat) {
          totalDist *= 0.4;
        } else if (tmpl.id === 'glasses') {
          totalDist *= 2.5; // Penalize glasses when it's clearly a single face
        }
      }

      if (semantic.isPoop) {
        if (tmpl.id === 'poop') {
          totalDist *= 0.20; // Massive boost for poop
        } else if (tmpl.id === 'sad_face' || tmpl.id === 'smiley' || tmpl.id === 'crying_face') {
          totalDist *= 3.5; // Heavily penalize faces
        }
      }

      if (semantic.isStar && tmpl.id === 'star') {
        totalDist *= 0.5;
      }

      if (semantic.isHeart && tmpl.id === 'heart') {
        totalDist *= 0.45;
      }

      // Confidence score [20%..98%]
      const confidence = Math.max(20, Math.min(98, Math.round(100 / (1 + Math.pow(totalDist / 3.2, 1.4)))));

      scores.push({
        id: tmpl.id,
        emoji: tmpl.emoji,
        name: tmpl.name,
        category: tmpl.category,
        tags: tmpl.tags,
        confidence,
        distance: totalDist
      });
    }

    scores.sort((a, b) => b.confidence - a.confidence);
    return scores;
  }

  /**
   * Main prediction entrypoint
   * Clusters strokes so multiple drawings on the notepad are evaluated individually & together
   */
  predict(strokes, topK = 1) {
    if (!strokes || strokes.length === 0) return [];

    // Score combined full canvas
    const wholeScores = this.scoreStrokeSet(strokes);

    // If only 1 or 2 strokes, full score is sufficient
    if (strokes.length <= 2) {
      return wholeScores.slice(0, topK);
    }

    // Otherwise, check spatial clusters
    const clusters = this.clusterStrokes(strokes);

    // If multiple clusters found, score the most recent and all clusters
    if (clusters.length > 1) {
      let bestClusterScore = null;

      // Check each cluster
      for (const cluster of clusters) {
        const clusterScores = this.scoreStrokeSet(cluster);
        if (clusterScores.length > 0) {
          if (!bestClusterScore || clusterScores[0].confidence > bestClusterScore.confidence) {
            bestClusterScore = clusterScores[0];
          }
        }
      }

      // If a cluster has significantly higher confidence than whole drawing (e.g. face vs glasses)
      if (bestClusterScore && (!wholeScores.length || bestClusterScore.confidence > wholeScores[0].confidence - 10)) {
        // Return cluster's best scores
        const winner = bestClusterScore;
        const remaining = (wholeScores || []).filter(s => s.id !== winner.id);
        return [winner, ...remaining].slice(0, topK);
      }
    }

    return wholeScores.slice(0, topK);
  }
}

if (typeof window !== 'undefined') {
  window.EmojiRecognizer = EmojiRecognizer;
}
