/**
 * Doodle-to-Emoji: Minimalist Application Controller
 * Manages drawing, real-time recognition of the top matching emoji,
 * and 1-click clipboard copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const canvasEl = document.getElementById('drawing-canvas');
  const emptyStateEl = document.getElementById('empty-state');
  const topResultEl = document.getElementById('top-result');
  const heroEmojiEl = document.getElementById('hero-emoji');
  const heroNameEl = document.getElementById('hero-name');
  const heroConfidenceEl = document.getElementById('hero-confidence');
  const heroCopyBtn = document.getElementById('hero-copy-btn');

  // Toolbar
  const undoBtn = document.getElementById('btn-undo');
  const clearBtn = document.getElementById('btn-clear');
  const soundToggleBtn = document.getElementById('btn-sound-toggle');
  const strokeSizeSlider = document.getElementById('stroke-size');
  const strokeSizePreview = document.getElementById('stroke-size-preview');
  const toolBtns = document.querySelectorAll('[data-tool]');
  const colorBtns = document.querySelectorAll('[data-color]');

  // Toast
  const toastEl = document.getElementById('toast-notification');
  const toastMessageEl = document.getElementById('toast-message');

  // Services
  const sound = new SoundEffects();
  const recognizer = new EmojiRecognizer(window.EMOJI_TEMPLATES || []);
  const autoDraw = typeof AutoDrawService !== 'undefined' ? new AutoDrawService() : null;

  let debounceTimer = null;
  let currentTopEmoji = null;

  // Setup Notepad Canvas with Dark Obsidian Paper & White Ink
  const canvas = new NotepadCanvas(canvasEl, {
    tool: 'pen',
    color: '#ffffff',
    strokeWidth: 5,
    paperStyle: 'dark',
    onStrokeEnd: () => {
      triggerPrediction(canvas.strokes);
    },
    onStrokeMove: (strokes) => {
      triggerPrediction(strokes);
    },
    onHistoryChange: ({ canUndo }) => {
      if (undoBtn) undoBtn.disabled = !canUndo;
    }
  });

  // Sound Toggle
  function updateSoundIcon() {
    if (!soundToggleBtn) return;
    soundToggleBtn.textContent = sound.isMuted() ? '🔇' : '🔊';
  }
  updateSoundIcon();

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      sound.toggleMute();
      updateSoundIcon();
    });
  }

  // Tool Selection
  toolBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      toolBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      canvas.setTool(btn.dataset.tool);
      sound.playPop();
    });
  });

  // Color Selection
  colorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      colorBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const color = btn.dataset.color;
      canvas.setColor(color);
      updateSizePreview();
      sound.playPop();
    });
  });

  // Brush Size
  function updateSizePreview() {
    if (!strokeSizeSlider || !strokeSizePreview) return;
    const size = parseInt(strokeSizeSlider.value, 10);
    strokeSizePreview.style.width = `${Math.min(24, Math.max(4, size * 1.3))}px`;
    strokeSizePreview.style.height = `${Math.min(24, Math.max(4, size * 1.3))}px`;
    strokeSizePreview.style.backgroundColor = canvas.options.color;
    canvas.setStrokeWidth(size);
  }

  if (strokeSizeSlider) {
    strokeSizeSlider.addEventListener('input', updateSizePreview);
    updateSizePreview();
  }

  // Undo & Clear
  if (undoBtn) {
    undoBtn.addEventListener('click', () => {
      canvas.undo();
      sound.playPop();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      canvas.clear();
      sound.playClearSwoosh();
      renderEmpty();
    });
  }

  // Keyboard Shortcuts (Ctrl+Z, Esc, E, P)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      canvas.undo();
    } else if (e.key === 'Escape') {
      canvas.clear();
      renderEmpty();
    } else if (e.key.toLowerCase() === 'e') {
      const eraserBtn = document.querySelector('[data-tool="eraser"]');
      if (eraserBtn) eraserBtn.click();
    } else if (e.key.toLowerCase() === 'p') {
      const penBtn = document.querySelector('[data-tool="pen"]');
      if (penBtn) penBtn.click();
    }
  });

  // Real-time debounced prediction
  function triggerPrediction(strokes) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      runPrediction(strokes || canvas.getAllStrokes());
    }, 110);
  }

  async function runPrediction(strokes) {
    const activeStrokes = strokes || canvas.getAllStrokes();
    if (!activeStrokes || activeStrokes.length === 0) {
      renderEmpty();
      return;
    }

    // 1. Instant local prediction (0ms latency fallback)
    const localResults = recognizer.predict(activeStrokes, 1);
    if (localResults && localResults.length > 0) {
      renderTopResult(localResults[0]);
    }

    // 2. Google AutoDraw ML model (trained on 50M sketches, 300+ emojis)
    if (autoDraw) {
      try {
        const mlResult = await autoDraw.predict(activeStrokes, canvas.displayWidth || 600, canvas.displayHeight || 500);
        if (mlResult) {
          renderTopResult(mlResult);
        }
      } catch (e) {
        // Fallback remains active
      }
    }
  }

  function renderEmpty() {
    emptyStateEl.classList.remove('hidden');
    topResultEl.classList.add('hidden');
    currentTopEmoji = null;
  }

  function renderTopResult(top) {
    emptyStateEl.classList.add('hidden');
    topResultEl.classList.remove('hidden');

    currentTopEmoji = top;

    // Trigger subtle pop animation if emoji changed
    if (heroEmojiEl.textContent !== top.emoji) {
      heroEmojiEl.classList.remove('pop-anim');
      void heroEmojiEl.offsetWidth; // trigger reflow
      heroEmojiEl.classList.add('pop-anim');
    }

    heroEmojiEl.textContent = top.emoji;
    heroNameEl.textContent = top.name;
    heroConfidenceEl.textContent = `${top.confidence}% match`;

    heroCopyBtn.onclick = () => copyEmoji(top.emoji, top.name);
    heroEmojiEl.onclick = () => copyEmoji(top.emoji, top.name);
  }

  // Copy Emoji with Toast & Sound
  async function copyEmoji(emoji, name) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emoji);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = emoji;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      sound.playCopyChime();
      showToast(`Copied ${emoji} (${name})!`);
    } catch (err) {
      console.error('Copy failed:', err);
      showToast(`Selected ${emoji}`);
    }
  }

  // Toast Notification
  let toastTimeout = null;
  function showToast(msg) {
    toastMessageEl.textContent = msg;

    if (toastEl.showPopover) {
      try {
        toastEl.showPopover();
      } catch (e) {
        toastEl.classList.add('show');
      }
    } else {
      toastEl.classList.add('show');
    }

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      if (toastEl.hidePopover) {
        try {
          toastEl.hidePopover();
        } catch (e) {
          toastEl.classList.remove('show');
        }
      } else {
        toastEl.classList.remove('show');
      }
    }, 2200);
  }
});
