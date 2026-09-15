/**
 * Doodle-to-Emoji: Massive Expanded Sketch Archetypes (150+ popular emojis)
 * All coordinates are normalized to [0, 100].
 */

const EMOJI_TEMPLATES = [
  // --- VIRAL & MOST-USED ICONS ---
  {
    id: 'poop',
    emoji: '💩',
    name: 'Pile of Poop',
    category: 'fun',
    tags: ['poop', 'crap', 'shit', 'turd', 'swirl', 'coil'],
    draw: (ctx) => {
      // Coiled poop pyramid
      // Bottom coil
      ctx.beginPath();
      ctx.ellipse(50, 78, 38, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Middle coil
      ctx.beginPath();
      ctx.ellipse(50, 56, 28, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Upper coil
      ctx.beginPath();
      ctx.ellipse(50, 36, 18, 10, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Swirl tip
      ctx.beginPath();
      ctx.moveTo(50, 26);
      ctx.quadraticCurveTo(62, 18, 54, 10);
      ctx.quadraticCurveTo(46, 12, 48, 22);
      ctx.stroke();
    }
  },
  {
    id: 'eggplant',
    emoji: '🍆',
    name: 'Eggplant',
    category: 'food',
    tags: ['aubergine', 'vegetable', 'purple'],
    draw: (ctx) => {
      // Curved elongated bulb
      ctx.beginPath();
      ctx.moveTo(76, 20);
      ctx.bezierCurveTo(45, 15, 20, 45, 22, 70);
      ctx.bezierCurveTo(24, 88, 45, 92, 60, 80);
      ctx.bezierCurveTo(75, 68, 85, 38, 76, 20);
      ctx.stroke();
      // Calyx / stem
      ctx.beginPath();
      ctx.moveTo(76, 20); ctx.lineTo(84, 12);
      ctx.moveTo(70, 24); ctx.lineTo(76, 16); ctx.lineTo(82, 26);
      ctx.stroke();
    }
  },
  {
    id: 'peach',
    emoji: '🍑',
    name: 'Peach',
    category: 'food',
    tags: ['butt', 'fruit', 'round'],
    draw: (ctx) => {
      // Round with cleft
      ctx.beginPath();
      ctx.moveTo(50, 88);
      ctx.bezierCurveTo(20, 85, 15, 45, 35, 26);
      ctx.bezierCurveTo(45, 18, 50, 26, 50, 32);
      ctx.bezierCurveTo(50, 26, 55, 18, 65, 26);
      ctx.bezierCurveTo(85, 45, 80, 85, 50, 88);
      ctx.stroke();
      // Cleft line
      ctx.beginPath();
      ctx.moveTo(50, 32);
      ctx.quadraticCurveTo(52, 55, 50, 82);
      ctx.stroke();
    }
  },
  {
    id: 'fire',
    emoji: '🔥',
    name: 'Fire',
    category: 'nature',
    tags: ['flame', 'hot', 'lit', 'burn'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 10);
      ctx.bezierCurveTo(62, 28, 74, 40, 68, 56);
      ctx.bezierCurveTo(76, 48, 80, 40, 78, 34);
      ctx.bezierCurveTo(88, 54, 86, 78, 72, 88);
      ctx.bezierCurveTo(60, 95, 38, 95, 26, 86);
      ctx.bezierCurveTo(14, 72, 20, 48, 38, 38);
      ctx.bezierCurveTo(36, 48, 42, 56, 48, 50);
      ctx.bezierCurveTo(46, 36, 40, 24, 50, 10);
      ctx.stroke();
    }
  },
  {
    id: 'skull',
    emoji: '💀',
    name: 'Skull',
    category: 'faces',
    tags: ['dead', 'skeleton', 'bone', 'danger'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.arc(50, 42, 28, Math.PI * 0.9, Math.PI * 0.1, false);
      ctx.lineTo(65, 80);
      ctx.lineTo(35, 80);
      ctx.closePath();
      ctx.stroke();
      // Eyes
      ctx.beginPath();
      ctx.arc(40, 44, 7, 0, Math.PI * 2);
      ctx.arc(60, 44, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  {
    id: 'clown',
    emoji: '🤡',
    name: 'Clown',
    category: 'faces',
    tags: ['fool', 'circus', 'joke'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 36, 0, Math.PI * 2); ctx.stroke();
      // Big round nose
      ctx.beginPath(); ctx.arc(50, 50, 8, 0, Math.PI * 2); ctx.fill();
      // Eyes
      ctx.beginPath(); ctx.arc(36, 38, 4, 0, Math.PI * 2); ctx.arc(64, 38, 4, 0, Math.PI * 2); ctx.fill();
      // Wide mouth
      ctx.beginPath(); ctx.arc(50, 54, 22, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
    }
  },
  {
    id: 'ghost',
    emoji: '👻',
    name: 'Ghost',
    category: 'faces',
    tags: ['spooky', 'halloween', 'boo'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.arc(50, 35, 24, Math.PI, 0);
      ctx.bezierCurveTo(74, 50, 84, 55, 84, 62);
      ctx.bezierCurveTo(80, 68, 72, 60, 70, 75);
      ctx.bezierCurveTo(66, 85, 58, 75, 54, 85);
      ctx.bezierCurveTo(46, 85, 38, 75, 34, 85);
      ctx.bezierCurveTo(28, 75, 22, 68, 16, 62);
      ctx.bezierCurveTo(16, 55, 26, 50, 26, 35);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(42, 38, 3, 0, Math.PI * 2); ctx.arc(58, 38, 3, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'alien',
    emoji: '👽',
    name: 'Alien',
    category: 'faces',
    tags: ['ufo', 'extraterrestrial', 'space'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 86);
      ctx.bezierCurveTo(28, 82, 14, 60, 18, 34);
      ctx.bezierCurveTo(22, 14, 78, 14, 82, 34);
      ctx.bezierCurveTo(86, 60, 72, 82, 50, 86);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(36, 46, 10, 6, -0.6, 0, Math.PI * 2);
      ctx.ellipse(64, 46, 10, 6, 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  {
    id: 'robot',
    emoji: '🤖',
    name: 'Robot',
    category: 'faces',
    tags: ['bot', 'ai', 'machine', 'cyber'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 14, 4, 0, Math.PI * 2); ctx.moveTo(50, 18); ctx.lineTo(50, 26); ctx.stroke();
      ctx.strokeRect(26, 26, 48, 46);
      ctx.strokeRect(18, 42, 8, 14); ctx.strokeRect(74, 42, 8, 14);
      ctx.beginPath(); ctx.arc(38, 42, 5, 0, Math.PI * 2); ctx.arc(62, 42, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeRect(36, 56, 28, 8);
    }
  },
  {
    id: 'hundred',
    emoji: '💯',
    name: 'Hundred Points',
    category: 'symbols',
    tags: ['100', 'perfect', 'score', 'lit'],
    draw: (ctx) => {
      // "100"
      ctx.beginPath();
      ctx.moveTo(22, 30); ctx.lineTo(30, 24); ctx.lineTo(30, 70); // 1
      ctx.stroke();
      ctx.beginPath(); ctx.ellipse(50, 48, 10, 22, 0, 0, Math.PI * 2); ctx.stroke(); // 0
      ctx.beginPath(); ctx.ellipse(74, 48, 10, 22, 0, 0, Math.PI * 2); ctx.stroke(); // 0
      // Underlines
      ctx.beginPath();
      ctx.moveTo(18, 78); ctx.lineTo(82, 78);
      ctx.moveTo(18, 84); ctx.lineTo(82, 84);
      ctx.stroke();
    }
  },

  // --- SMILEYS & FACES ---
  {
    id: 'smiley',
    emoji: '😊',
    name: 'Smiley Face',
    category: 'faces',
    tags: ['smile', 'happy', 'joy', 'glad'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 38, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(36, 42, 4, 0, Math.PI * 2); ctx.arc(64, 42, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(50, 50, 22, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
    }
  },
  {
    id: 'sad_face',
    emoji: '😢',
    name: 'Sad Face',
    category: 'faces',
    tags: ['sad', 'cry', 'unhappy', 'frown', 'sorrow'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 38, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(36, 42, 4, 0, Math.PI * 2); ctx.arc(64, 42, 4, 0, Math.PI * 2); ctx.fill();
      // Frown
      ctx.beginPath(); ctx.arc(50, 72, 16, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke();
      // Tear
      ctx.beginPath(); ctx.ellipse(32, 56, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'crying_face',
    emoji: '😭',
    name: 'Loudly Crying',
    category: 'faces',
    tags: ['bawling', 'sobbing', 'tears', 'waterfall'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 38, 0, Math.PI * 2); ctx.stroke();
      // Closed squinting eyes
      ctx.beginPath();
      ctx.moveTo(30, 42); ctx.lineTo(42, 42);
      ctx.moveTo(58, 42); ctx.lineTo(70, 42);
      ctx.stroke();
      // Stream tears
      ctx.beginPath();
      ctx.moveTo(36, 44); ctx.lineTo(36, 80);
      ctx.moveTo(64, 44); ctx.lineTo(64, 80);
      ctx.stroke();
      // Open crying mouth
      ctx.beginPath(); ctx.arc(50, 70, 12, 1.1 * Math.PI, 1.9 * Math.PI); ctx.stroke();
    }
  },
  {
    id: 'laughing',
    emoji: '😂',
    name: 'Tears of Joy',
    category: 'faces',
    tags: ['lol', 'laugh', 'funny', 'haha'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 38, 0, Math.PI * 2); ctx.stroke();
      // Squinting eyes ^ ^
      ctx.beginPath();
      ctx.moveTo(30, 44); ctx.lineTo(36, 38); ctx.lineTo(42, 44);
      ctx.moveTo(58, 44); ctx.lineTo(64, 38); ctx.lineTo(70, 44);
      ctx.stroke();
      // Big open grin
      ctx.beginPath();
      ctx.arc(50, 48, 22, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      // Tear drops on sides
      ctx.beginPath(); ctx.ellipse(24, 46, 4, 6, -0.4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(76, 46, 4, 6, 0.4, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'angry_face',
    emoji: '😡',
    name: 'Angry Face',
    category: 'faces',
    tags: ['mad', 'rage', 'furious'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 38, 0, Math.PI * 2); ctx.stroke();
      // Slanted angry eyebrows
      ctx.beginPath();
      ctx.moveTo(28, 34); ctx.lineTo(44, 42);
      ctx.moveTo(72, 34); ctx.lineTo(56, 42);
      ctx.stroke();
      // Eyes
      ctx.beginPath(); ctx.arc(36, 46, 4, 0, Math.PI * 2); ctx.arc(64, 46, 4, 0, Math.PI * 2); ctx.fill();
      // Frown
      ctx.beginPath(); ctx.arc(50, 72, 14, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke();
    }
  },
  {
    id: 'sleeping_face',
    emoji: '😴',
    name: 'Sleeping Face',
    category: 'faces',
    tags: ['sleep', 'zzz', 'tired', 'rest'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 38, 0, Math.PI * 2); ctx.stroke();
      // Closed eyes
      ctx.beginPath();
      ctx.moveTo(30, 46); ctx.lineTo(42, 46);
      ctx.moveTo(58, 46); ctx.lineTo(70, 46);
      ctx.stroke();
      // O mouth snoring
      ctx.beginPath(); ctx.ellipse(50, 68, 6, 8, 0, 0, Math.PI * 2); ctx.stroke();
      // Zzz
      ctx.beginPath();
      ctx.moveTo(72, 22); ctx.lineTo(84, 22); ctx.lineTo(72, 32); ctx.lineTo(84, 32);
      ctx.stroke();
    }
  },
  {
    id: 'pleading_face',
    emoji: '🥺',
    name: 'Pleading Face',
    category: 'faces',
    tags: ['puppy', 'eyes', 'cute', 'please', 'beg'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 38, 0, Math.PI * 2); ctx.stroke();
      // Giant watery eyes
      ctx.beginPath(); ctx.arc(36, 44, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(64, 44, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(38, 42, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(66, 42, 5, 0, Math.PI * 2); ctx.fill();
      // Small bottom lip
      ctx.beginPath(); ctx.arc(50, 72, 8, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke();
    }
  },

  // --- GESTURES & HANDS ---
  {
    id: 'thumbs_up',
    emoji: '👍',
    name: 'Thumbs Up',
    category: 'body',
    tags: ['yes', 'approve', 'like', 'good'],
    draw: (ctx) => {
      // Thumb pointing up
      ctx.beginPath();
      ctx.moveTo(36, 52); ctx.lineTo(36, 18);
      ctx.arc(42, 18, 6, Math.PI, 0);
      ctx.lineTo(48, 46);
      // Knuckles
      ctx.lineTo(74, 46); ctx.arc(74, 52, 6, -Math.PI/2, Math.PI/2);
      ctx.lineTo(74, 60); ctx.arc(74, 66, 6, -Math.PI/2, Math.PI/2);
      ctx.lineTo(74, 74); ctx.arc(74, 80, 6, -Math.PI/2, Math.PI/2);
      ctx.lineTo(34, 86); ctx.lineTo(30, 52);
      ctx.closePath();
      ctx.stroke();
    }
  },
  {
    id: 'thumbs_down',
    emoji: '👎',
    name: 'Thumbs Down',
    category: 'body',
    tags: ['no', 'dislike', 'bad'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(36, 48); ctx.lineTo(36, 82);
      ctx.arc(42, 82, 6, 0, Math.PI);
      ctx.lineTo(48, 54);
      ctx.lineTo(74, 54); ctx.arc(74, 48, 6, Math.PI/2, -Math.PI/2);
      ctx.lineTo(74, 40); ctx.arc(74, 34, 6, Math.PI/2, -Math.PI/2);
      ctx.lineTo(34, 14); ctx.lineTo(30, 48);
      ctx.closePath();
      ctx.stroke();
    }
  },
  {
    id: 'peace',
    emoji: '✌️',
    name: 'Peace Sign',
    category: 'body',
    tags: ['victory', 'two', 'v'],
    draw: (ctx) => {
      ctx.beginPath();
      // Index finger
      ctx.moveTo(38, 70); ctx.lineTo(38, 18); ctx.lineTo(46, 18); ctx.lineTo(48, 52);
      // Middle finger
      ctx.lineTo(52, 18); ctx.lineTo(60, 18); ctx.lineTo(60, 70);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeRect(34, 60, 32, 26);
    }
  },
  {
    id: 'middle_finger',
    emoji: '🖕',
    name: 'Middle Finger',
    category: 'body',
    tags: ['fu', 'gesture', 'flip'],
    draw: (ctx) => {
      ctx.beginPath();
      // Middle finger high
      ctx.moveTo(46, 70); ctx.lineTo(46, 15);
      ctx.arc(50, 15, 4, Math.PI, 0);
      ctx.lineTo(54, 70);
      ctx.stroke();
      // Folded knuckles
      ctx.strokeRect(32, 58, 36, 28);
    }
  },
  {
    id: 'pray',
    emoji: '🙏',
    name: 'Folded Hands',
    category: 'body',
    tags: ['pray', 'please', 'thanks', 'namaste'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(48, 20); ctx.lineTo(32, 50); ctx.lineTo(35, 82);
      ctx.lineTo(65, 82); ctx.lineTo(68, 50); ctx.lineTo(52, 20);
      ctx.closePath();
      ctx.stroke();
      // Center split
      ctx.beginPath(); ctx.moveTo(50, 20); ctx.lineTo(50, 82); ctx.stroke();
    }
  },
  {
    id: 'eyes',
    emoji: '👀',
    name: 'Eyes',
    category: 'body',
    tags: ['look', 'see', 'peek'],
    draw: (ctx) => {
      // Left eye
      ctx.beginPath(); ctx.arc(34, 50, 16, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(38, 48, 6, 0, Math.PI * 2); ctx.fill();
      // Right eye
      ctx.beginPath(); ctx.arc(66, 50, 16, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(70, 48, 6, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'lips',
    emoji: '💋',
    name: 'Kiss Mark',
    category: 'body',
    tags: ['lips', 'kiss', 'love'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(18, 50);
      ctx.quadraticCurveTo(36, 32, 50, 42);
      ctx.quadraticCurveTo(64, 32, 82, 50);
      ctx.quadraticCurveTo(50, 68, 18, 50);
      ctx.stroke();
      // Center cleft
      ctx.beginPath(); ctx.moveTo(22, 50); ctx.lineTo(78, 50); ctx.stroke();
    }
  },

  // --- SYMBOLS & SHAPES ---
  {
    id: 'heart',
    emoji: '❤️',
    name: 'Heart',
    category: 'symbols',
    tags: ['love', 'like', 'heart', 'romance'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 85);
      ctx.bezierCurveTo(20, 60, 10, 35, 25, 20);
      ctx.bezierCurveTo(35, 10, 48, 18, 50, 32);
      ctx.bezierCurveTo(52, 18, 65, 10, 75, 20);
      ctx.bezierCurveTo(90, 35, 80, 60, 50, 85);
      ctx.stroke();
    }
  },
  {
    id: 'broken_heart',
    emoji: '💔',
    name: 'Broken Heart',
    category: 'symbols',
    tags: ['heartbreak', 'breakup', 'sad'],
    draw: (ctx) => {
      // Heart outline
      ctx.beginPath();
      ctx.moveTo(50, 85);
      ctx.bezierCurveTo(20, 60, 10, 35, 25, 20);
      ctx.bezierCurveTo(35, 10, 48, 18, 50, 32);
      ctx.bezierCurveTo(52, 18, 65, 10, 75, 20);
      ctx.bezierCurveTo(90, 35, 80, 60, 50, 85);
      ctx.stroke();
      // Zigzag crack
      ctx.beginPath();
      ctx.moveTo(50, 24); ctx.lineTo(44, 38); ctx.lineTo(56, 52); ctx.lineTo(46, 66); ctx.lineTo(50, 85);
      ctx.stroke();
    }
  },
  {
    id: 'star',
    emoji: '⭐',
    name: 'Star',
    category: 'symbols',
    tags: ['star', 'favorite', 'night', 'sparkle'],
    draw: (ctx) => {
      const cx = 50, cy = 52, rOut = 42, rIn = 18, points = 5;
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? rOut : rIn;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  },
  {
    id: 'sparkles',
    emoji: '✨',
    name: 'Sparkles',
    category: 'symbols',
    tags: ['shine', 'magic', 'glitter'],
    draw: (ctx) => {
      // 4-pointed star
      ctx.beginPath();
      ctx.moveTo(50, 12);
      ctx.quadraticCurveTo(50, 48, 14, 48);
      ctx.quadraticCurveTo(50, 48, 50, 84);
      ctx.quadraticCurveTo(50, 48, 86, 48);
      ctx.quadraticCurveTo(50, 48, 50, 12);
      ctx.stroke();
    }
  },
  {
    id: 'lightning',
    emoji: '⚡',
    name: 'Lightning',
    category: 'symbols',
    tags: ['bolt', 'electric', 'power', 'flash'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(56, 10); ctx.lineTo(28, 52); ctx.lineTo(52, 52);
      ctx.lineTo(40, 90); ctx.lineTo(76, 44); ctx.lineTo(52, 44);
      ctx.closePath();
      ctx.stroke();
    }
  },
  {
    id: 'droplet',
    emoji: '💧',
    name: 'Droplet',
    category: 'nature',
    tags: ['water', 'tear', 'rain'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 14);
      ctx.bezierCurveTo(35, 45, 20, 60, 20, 72);
      ctx.bezierCurveTo(20, 88, 33, 92, 50, 92);
      ctx.bezierCurveTo(67, 92, 80, 88, 80, 72);
      ctx.bezierCurveTo(80, 60, 65, 45, 50, 14);
      ctx.stroke();
    }
  },
  {
    id: 'sun',
    emoji: '☀️',
    name: 'Sun',
    category: 'nature',
    tags: ['sunny', 'warm', 'day'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 20, 0, Math.PI * 2); ctx.stroke();
      const rays = 8;
      for (let i = 0; i < rays; i++) {
        const a = (i * Math.PI * 2) / rays;
        ctx.beginPath();
        ctx.moveTo(50 + 26 * Math.cos(a), 50 + 26 * Math.sin(a));
        ctx.lineTo(50 + 42 * Math.cos(a), 50 + 42 * Math.sin(a));
        ctx.stroke();
      }
    }
  },
  {
    id: 'moon',
    emoji: '🌙',
    name: 'Crescent Moon',
    category: 'nature',
    tags: ['night', 'sky', 'sleep'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.arc(50, 50, 36, -Math.PI * 0.45, Math.PI * 0.45, false);
      ctx.bezierCurveTo(55, 75, 45, 25, 50 + 36 * Math.cos(-Math.PI * 0.45), 50 + 36 * Math.sin(-Math.PI * 0.45));
      ctx.stroke();
    }
  },
  {
    id: 'cloud',
    emoji: '☁️',
    name: 'Cloud',
    category: 'nature',
    tags: ['weather', 'sky', 'rain'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(25, 68); ctx.lineTo(75, 68);
      ctx.arc(75, 54, 14, Math.PI * 0.5, -Math.PI * 0.3, true);
      ctx.arc(54, 38, 18, -Math.PI * 0.1, -Math.PI * 0.9, true);
      ctx.arc(28, 54, 14, -Math.PI * 0.7, Math.PI * 0.5, true);
      ctx.closePath();
      ctx.stroke();
    }
  },
  {
    id: 'snowflake',
    emoji: '❄️',
    name: 'Snowflake',
    category: 'nature',
    tags: ['snow', 'cold', 'winter'],
    draw: (ctx) => {
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI) / 3;
        const dx = 38 * Math.cos(a), dy = 38 * Math.sin(a);
        ctx.beginPath(); ctx.moveTo(50 - dx, 50 - dy); ctx.lineTo(50 + dx, 50 + dy); ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(50, 50, 10, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'wave',
    emoji: '🌊',
    name: 'Ocean Wave',
    category: 'nature',
    tags: ['water', 'sea', 'surf'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(15, 80);
      ctx.quadraticCurveTo(45, 75, 65, 40);
      ctx.quadraticCurveTo(75, 22, 60, 22);
      ctx.quadraticCurveTo(45, 25, 40, 45);
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(15, 88); ctx.lineTo(85, 88); ctx.stroke();
    }
  },
  {
    id: 'rainbow',
    emoji: '🌈',
    name: 'Rainbow',
    category: 'nature',
    tags: ['pride', 'color', 'sky'],
    draw: (ctx) => {
      for (let r = 26; r <= 42; r += 8) {
        ctx.beginPath();
        ctx.arc(50, 80, r, Math.PI, 0);
        ctx.stroke();
      }
    }
  },

  // --- ANIMALS ---
  {
    id: 'cat',
    emoji: '🐱',
    name: 'Cat',
    category: 'animals',
    tags: ['kitty', 'kitten', 'meow'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 54, 28, 0, Math.PI * 2); ctx.stroke();
      // Triangle ears
      ctx.beginPath(); ctx.moveTo(26, 40); ctx.lineTo(20, 16); ctx.lineTo(40, 28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(60, 28); ctx.lineTo(80, 16); ctx.lineTo(74, 40); ctx.stroke();
      // Eyes & whiskers
      ctx.beginPath(); ctx.arc(38, 50, 3, 0, Math.PI * 2); ctx.arc(62, 50, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(28, 56); ctx.lineTo(12, 52); ctx.moveTo(28, 60); ctx.lineTo(12, 62);
      ctx.moveTo(72, 56); ctx.lineTo(88, 52); ctx.moveTo(72, 60); ctx.lineTo(88, 62);
      ctx.stroke();
    }
  },
  {
    id: 'dog',
    emoji: '🐶',
    name: 'Dog',
    category: 'animals',
    tags: ['puppy', 'hound', 'woof'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 52, 26, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(22, 50, 8, 16, -0.3, 0, Math.PI * 2); ctx.ellipse(78, 50, 8, 16, 0.3, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(40, 48, 3, 0, Math.PI * 2); ctx.arc(60, 48, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(50, 60, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'rabbit',
    emoji: '🐰',
    name: 'Rabbit',
    category: 'animals',
    tags: ['bunny', 'hare'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 58, 24, 0, Math.PI * 2); ctx.stroke();
      // Tall ears
      ctx.beginPath(); ctx.ellipse(38, 22, 7, 20, -0.15, 0, Math.PI * 2); ctx.ellipse(62, 22, 7, 20, 0.15, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(42, 56, 3, 0, Math.PI * 2); ctx.arc(58, 56, 3, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'bear',
    emoji: '🐻',
    name: 'Bear',
    category: 'animals',
    tags: ['teddy', 'grizzly'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(28, 28, 12, 0, Math.PI * 2); ctx.arc(72, 28, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(50, 54, 28, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(38, 48, 3, 0, Math.PI * 2); ctx.arc(62, 48, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(50, 62, 10, 7, 0, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'monkey',
    emoji: '🐵',
    name: 'Monkey',
    category: 'animals',
    tags: ['chimp', 'ape', 'banana'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(22, 50, 10, 0, Math.PI * 2); ctx.arc(78, 50, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(50, 50, 26, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(50, 60, 16, 12, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(42, 44, 3, 0, Math.PI * 2); ctx.arc(58, 44, 3, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'frog',
    emoji: '🐸',
    name: 'Frog',
    category: 'animals',
    tags: ['toad', 'croak', 'green'],
    draw: (ctx) => {
      // Bulging eyes
      ctx.beginPath(); ctx.arc(34, 34, 12, 0, Math.PI * 2); ctx.arc(66, 34, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(34, 34, 5, 0, Math.PI * 2); ctx.arc(66, 34, 5, 0, Math.PI * 2); ctx.fill();
      // Wide head
      ctx.beginPath(); ctx.ellipse(50, 56, 32, 22, 0, 0, Math.PI * 2); ctx.stroke();
      // Wide mouth
      ctx.beginPath(); ctx.arc(50, 56, 20, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
    }
  },
  {
    id: 'pig',
    emoji: '🐷',
    name: 'Pig',
    category: 'animals',
    tags: ['pork', 'oink', 'snout'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 32, 0, Math.PI * 2); ctx.stroke();
      // Snout
      ctx.beginPath(); ctx.ellipse(50, 56, 12, 9, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(46, 56, 2, 0, Math.PI * 2); ctx.arc(54, 56, 2, 0, Math.PI * 2); ctx.fill();
      // Triangle ears
      ctx.beginPath(); ctx.moveTo(26, 28); ctx.lineTo(18, 12); ctx.lineTo(36, 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(74, 28); ctx.lineTo(82, 12); ctx.lineTo(64, 20); ctx.stroke();
    }
  },
  {
    id: 'fish',
    emoji: '🐟',
    name: 'Fish',
    category: 'animals',
    tags: ['sea', 'swim', 'aquarium'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.ellipse(45, 50, 28, 16, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(72, 50); ctx.lineTo(88, 32); ctx.lineTo(88, 68); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(28, 46, 3, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'shark',
    emoji: '🦈',
    name: 'Shark',
    category: 'animals',
    tags: ['predator', 'ocean', 'fin'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(18, 52); ctx.quadraticCurveTo(50, 36, 80, 52); ctx.quadraticCurveTo(50, 68, 18, 52);
      ctx.stroke();
      // Dorsal fin
      ctx.beginPath(); ctx.moveTo(42, 40); ctx.lineTo(46, 20); ctx.lineTo(58, 40); ctx.stroke();
      // Tail
      ctx.beginPath(); ctx.moveTo(80, 52); ctx.lineTo(92, 34); ctx.lineTo(86, 52); ctx.lineTo(92, 70); ctx.stroke();
    }
  },
  {
    id: 'octopus',
    emoji: '🐙',
    name: 'Octopus',
    category: 'animals',
    tags: ['tentacles', 'squid', 'sea'],
    draw: (ctx) => {
      // Dome head
      ctx.beginPath(); ctx.arc(50, 38, 24, Math.PI, 0); ctx.stroke();
      // Tentacles
      for (let i = 0; i < 5; i++) {
        const x = 30 + i * 10;
        ctx.beginPath(); ctx.moveTo(x, 38); ctx.quadraticCurveTo(x - 5, 65, x, 84); ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(42, 36, 3, 0, Math.PI * 2); ctx.arc(58, 36, 3, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'butterfly',
    emoji: '🦋',
    name: 'Butterfly',
    category: 'animals',
    tags: ['wings', 'insect', 'fly'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.ellipse(50, 50, 3, 24, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(30, 36, 18, 14, -0.4, 0, Math.PI * 2); ctx.ellipse(34, 62, 14, 10, 0.3, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(70, 36, 18, 14, 0.4, 0, Math.PI * 2); ctx.ellipse(66, 62, 14, 10, -0.3, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'snake',
    emoji: '🐍',
    name: 'Snake',
    category: 'animals',
    tags: ['reptile', 'slither'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(80, 24);
      ctx.bezierCurveTo(70, 15, 55, 30, 45, 45);
      ctx.bezierCurveTo(35, 60, 20, 50, 25, 75);
      ctx.bezierCurveTo(30, 90, 60, 85, 75, 65);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(80, 24, 6, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'tree',
    emoji: '🌲',
    name: 'Pine Tree',
    category: 'nature',
    tags: ['forest', 'evergreen'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 14);
      ctx.lineTo(65, 34); ctx.lineTo(58, 34);
      ctx.lineTo(72, 54); ctx.lineTo(62, 54);
      ctx.lineTo(80, 75); ctx.lineTo(20, 75);
      ctx.lineTo(38, 54); ctx.lineTo(28, 54);
      ctx.lineTo(42, 34); ctx.lineTo(35, 34);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeRect(44, 75, 12, 16);
    }
  },
  {
    id: 'palm_tree',
    emoji: '🌴',
    name: 'Palm Tree',
    category: 'nature',
    tags: ['beach', 'tropical', 'summer'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(46, 90); ctx.bezierCurveTo(48, 60, 54, 45, 50, 32);
      ctx.stroke();
      const fronds = [[50, 32, 20, 22], [50, 32, 16, 40], [50, 32, 80, 22], [50, 32, 84, 40], [50, 32, 50, 12]];
      fronds.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1+x2)/2, y1-8, x2, y2); ctx.stroke();
      });
    }
  },
  {
    id: 'flower',
    emoji: '🌸',
    name: 'Flower',
    category: 'nature',
    tags: ['bloom', 'blossom', 'spring'],
    draw: (ctx) => {
      const cx = 50, cy = 48, petals = 5, r = 16;
      for (let i = 0; i < petals; i++) {
        const a = (i * Math.PI * 2) / petals;
        ctx.beginPath(); ctx.arc(cx + 18 * Math.cos(a), cy + 18 * Math.sin(a), r, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'mushroom',
    emoji: '🍄',
    name: 'Mushroom',
    category: 'nature',
    tags: ['toadstool', 'fungus'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 46, 36, Math.PI, 0, false); ctx.closePath(); ctx.stroke();
      ctx.strokeRect(40, 46, 20, 36);
      ctx.beginPath(); ctx.arc(36, 32, 5, 0, Math.PI * 2); ctx.arc(64, 32, 5, 0, Math.PI * 2); ctx.fill();
    }
  },

  // --- FOOD & DRINK ---
  {
    id: 'pizza',
    emoji: '🍕',
    name: 'Pizza Slice',
    category: 'food',
    tags: ['cheese', 'italian', 'crust'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.moveTo(50, 88); ctx.lineTo(20, 28); ctx.quadraticCurveTo(50, 20, 80, 28); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(22, 34); ctx.quadraticCurveTo(50, 26, 78, 34); ctx.stroke();
      ctx.beginPath(); ctx.arc(42, 45, 4, 0, Math.PI * 2); ctx.arc(58, 52, 4, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'burger',
    emoji: '🍔',
    name: 'Burger',
    category: 'food',
    tags: ['hamburger', 'fastfood'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 42, 28, Math.PI, 0); ctx.closePath(); ctx.stroke();
      ctx.strokeRect(20, 46, 60, 10);
      ctx.strokeRect(22, 58, 56, 8);
      ctx.strokeRect(24, 68, 52, 12);
    }
  },
  {
    id: 'fries',
    emoji: '🍟',
    name: 'French Fries',
    category: 'food',
    tags: ['chips', 'potato', 'fastfood'],
    draw: (ctx) => {
      // Cup
      ctx.beginPath(); ctx.moveTo(28, 48); ctx.lineTo(72, 48); ctx.lineTo(66, 88); ctx.lineTo(34, 88); ctx.closePath(); ctx.stroke();
      // Fries sticks
      const friesX = [32, 40, 48, 56, 64];
      friesX.forEach(x => {
        ctx.strokeRect(x, 16 + (x % 3) * 6, 6, 32);
      });
    }
  },
  {
    id: 'hotdog',
    emoji: '🌭',
    name: 'Hot Dog',
    category: 'food',
    tags: ['sausage', 'bun'],
    draw: (ctx) => {
      // Bun
      ctx.beginPath(); ctx.ellipse(50, 50, 38, 14, -0.3, 0, Math.PI * 2); ctx.stroke();
      // Sausage
      ctx.beginPath(); ctx.ellipse(50, 50, 42, 6, -0.3, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'taco',
    emoji: '🌮',
    name: 'Taco',
    category: 'food',
    tags: ['mexican', 'shell'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 68, 36, Math.PI, 0, false); ctx.closePath(); ctx.stroke();
      // Lettuce / filling top
      ctx.beginPath();
      ctx.moveTo(18, 64);
      for (let x = 24; x <= 80; x += 10) {
        ctx.lineTo(x, 56 + (x % 4));
      }
      ctx.stroke();
    }
  },
  {
    id: 'donut',
    emoji: '🍩',
    name: 'Donut',
    category: 'food',
    tags: ['doughnut', 'pastry'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 36, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(50, 50, 14, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'ice_cream',
    emoji: '🍦',
    name: 'Ice Cream',
    category: 'food',
    tags: ['cone', 'dessert'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.moveTo(30, 45); ctx.lineTo(70, 45); ctx.lineTo(50, 90); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(50, 38, 20, Math.PI, 0); ctx.stroke();
      ctx.beginPath(); ctx.arc(50, 24, 12, Math.PI, 0); ctx.stroke();
    }
  },
  {
    id: 'cookie',
    emoji: '🍪',
    name: 'Cookie',
    category: 'food',
    tags: ['biscuit', 'chocolate'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 36, 0, Math.PI * 2); ctx.stroke();
      // Choc chips
      const chips = [[38, 38], [62, 40], [48, 56], [32, 62], [64, 66]];
      chips.forEach(([x, y]) => {
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      });
    }
  },
  {
    id: 'apple',
    emoji: '🍎',
    name: 'Apple',
    category: 'food',
    tags: ['fruit', 'orchard'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 30); ctx.bezierCurveTo(20, 25, 14, 50, 18, 70);
      ctx.bezierCurveTo(22, 88, 45, 90, 50, 82);
      ctx.bezierCurveTo(55, 90, 78, 88, 82, 70);
      ctx.bezierCurveTo(86, 50, 80, 25, 50, 30);
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 30); ctx.quadraticCurveTo(54, 18, 60, 14); ctx.stroke();
    }
  },
  {
    id: 'banana',
    emoji: '🍌',
    name: 'Banana',
    category: 'food',
    tags: ['fruit', 'yellow'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(76, 20);
      ctx.quadraticCurveTo(25, 25, 20, 75);
      ctx.quadraticCurveTo(35, 70, 76, 20);
      ctx.stroke();
    }
  },
  {
    id: 'watermelon',
    emoji: '🍉',
    name: 'Watermelon',
    category: 'food',
    tags: ['melon', 'summer'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 40, 36, 0, Math.PI, false); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(50, 40, 30, 0.1 * Math.PI, 0.9 * Math.PI, false); ctx.stroke();
      ctx.beginPath(); ctx.arc(42, 54, 2, 0, Math.PI * 2); ctx.arc(58, 54, 2, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'coffee',
    emoji: '☕',
    name: 'Coffee Cup',
    category: 'food',
    tags: ['tea', 'mug', 'cafe'],
    draw: (ctx) => {
      ctx.strokeRect(24, 38, 42, 38);
      ctx.beginPath(); ctx.arc(66, 52, 12, -Math.PI * 0.4, Math.PI * 0.4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(16, 78); ctx.lineTo(74, 78); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(35, 30); ctx.quadraticCurveTo(32, 22, 36, 16);
      ctx.moveTo(50, 30); ctx.quadraticCurveTo(48, 22, 52, 16);
      ctx.stroke();
    }
  },
  {
    id: 'beer',
    emoji: '🍺',
    name: 'Beer Mug',
    category: 'food',
    tags: ['cheers', 'drink', 'alcohol', 'pint'],
    draw: (ctx) => {
      ctx.strokeRect(26, 34, 38, 48);
      ctx.beginPath(); ctx.arc(64, 54, 12, -Math.PI * 0.5, Math.PI * 0.5); ctx.stroke();
      // Foam
      ctx.beginPath(); ctx.arc(34, 30, 8, Math.PI, 0); ctx.arc(48, 26, 10, Math.PI, 0); ctx.arc(60, 30, 8, Math.PI, 0); ctx.stroke();
    }
  },
  {
    id: 'wine',
    emoji: '🍷',
    name: 'Wine Glass',
    category: 'food',
    tags: ['drink', 'bar'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 38, 20, 0, Math.PI); ctx.lineTo(30, 22); ctx.lineTo(70, 22); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 58); ctx.lineTo(50, 84); ctx.moveTo(34, 84); ctx.lineTo(66, 84); ctx.stroke();
    }
  },

  // --- OBJECTS & TOOLS ---
  {
    id: 'lightbulb',
    emoji: '💡',
    name: 'Lightbulb',
    category: 'objects',
    tags: ['idea', 'lamp', 'smart'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 40, 24, Math.PI * 0.75, Math.PI * 0.25, true); ctx.lineTo(58, 70); ctx.lineTo(42, 70); ctx.closePath(); ctx.stroke();
      ctx.strokeRect(43, 72, 14, 6); ctx.strokeRect(45, 78, 10, 5);
      ctx.beginPath(); ctx.moveTo(50, 8); ctx.lineTo(50, 14); ctx.moveTo(22, 22); ctx.lineTo(28, 27); ctx.moveTo(78, 22); ctx.lineTo(72, 27); ctx.stroke();
    }
  },
  {
    id: 'key',
    emoji: '🔑',
    name: 'Key',
    category: 'objects',
    tags: ['lock', 'secret', 'door'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(32, 50, 16, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(32, 50, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(48, 50); ctx.lineTo(84, 50); ctx.lineTo(84, 62); ctx.moveTo(72, 50); ctx.lineTo(72, 60); ctx.stroke();
    }
  },
  {
    id: 'lock',
    emoji: '🔒',
    name: 'Padlock',
    category: 'objects',
    tags: ['security', 'safe'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 36, 18, Math.PI, 0); ctx.lineTo(68, 52); ctx.moveTo(32, 36); ctx.lineTo(32, 52); ctx.stroke();
      ctx.strokeRect(26, 50, 48, 36);
      ctx.beginPath(); ctx.arc(50, 64, 4, 0, Math.PI * 2); ctx.moveTo(50, 68); ctx.lineTo(50, 75); ctx.stroke();
    }
  },
  {
    id: 'crown',
    emoji: '👑',
    name: 'Crown',
    category: 'objects',
    tags: ['king', 'queen', 'royal'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(18, 75); ctx.lineTo(82, 75); ctx.lineTo(82, 38); ctx.lineTo(66, 52); ctx.lineTo(50, 25); ctx.lineTo(34, 52); ctx.lineTo(18, 38); ctx.closePath();
      ctx.stroke();
    }
  },
  {
    id: 'diamond',
    emoji: '💎',
    name: 'Diamond / Gem',
    category: 'objects',
    tags: ['jewel', 'crystal', 'valuable'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.moveTo(25, 34); ctx.lineTo(75, 34); ctx.lineTo(50, 84); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(35, 18); ctx.lineTo(65, 18); ctx.lineTo(75, 34); ctx.lineTo(25, 34); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 18); ctx.lineTo(50, 84); ctx.stroke();
    }
  },
  {
    id: 'ring',
    emoji: '💍',
    name: 'Ring',
    category: 'objects',
    tags: ['jewelry', 'marriage', 'proposal'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 58, 26, 0, Math.PI * 2); ctx.stroke();
      // Gem on top
      ctx.beginPath(); ctx.moveTo(42, 28); ctx.lineTo(58, 28); ctx.lineTo(50, 18); ctx.closePath(); ctx.stroke();
    }
  },
  {
    id: 'scissors',
    emoji: '✂️',
    name: 'Scissors',
    category: 'objects',
    tags: ['cut', 'shear'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(34, 76, 12, 0, Math.PI * 2); ctx.arc(66, 76, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(34, 64); ctx.lineTo(68, 18); ctx.moveTo(66, 64); ctx.lineTo(32, 18); ctx.stroke();
    }
  },
  {
    id: 'balloon',
    emoji: '🎈',
    name: 'Balloon',
    category: 'objects',
    tags: ['party', 'celebrate'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.ellipse(50, 40, 24, 28, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(46, 72); ctx.lineTo(54, 72); ctx.lineTo(50, 68); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 72); ctx.quadraticCurveTo(44, 82, 54, 88); ctx.stroke();
    }
  },
  {
    id: 'gift',
    emoji: '🎁',
    name: 'Gift Box',
    category: 'objects',
    tags: ['present', 'birthday'],
    draw: (ctx) => {
      ctx.strokeRect(22, 38, 56, 48); ctx.strokeRect(18, 30, 64, 10);
      ctx.beginPath(); ctx.moveTo(50, 30); ctx.lineTo(50, 86); ctx.moveTo(22, 60); ctx.lineTo(78, 60); ctx.stroke();
    }
  },
  {
    id: 'clock',
    emoji: '⏰',
    name: 'Alarm Clock',
    category: 'objects',
    tags: ['time', 'wake'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 54, 28, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(30, 26, 8, 0, Math.PI * 2); ctx.arc(70, 26, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 54); ctx.lineTo(50, 36); ctx.moveTo(50, 54); ctx.lineTo(64, 54); ctx.stroke();
    }
  },
  {
    id: 'hourglass',
    emoji: '⏳',
    name: 'Hourglass',
    category: 'objects',
    tags: ['time', 'sand'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(28, 20); ctx.lineTo(72, 20); ctx.lineTo(50, 50); ctx.lineTo(72, 80); ctx.lineTo(28, 80); ctx.lineTo(50, 50); ctx.closePath();
      ctx.stroke();
    }
  },
  {
    id: 'phone',
    emoji: '📱',
    name: 'Smartphone',
    category: 'objects',
    tags: ['mobile', 'cell'],
    draw: (ctx) => {
      ctx.strokeRect(30, 16, 40, 70);
      ctx.strokeRect(34, 24, 32, 50);
      ctx.beginPath(); ctx.arc(50, 80, 3, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'laptop',
    emoji: '💻',
    name: 'Laptop',
    category: 'objects',
    tags: ['computer', 'pc'],
    draw: (ctx) => {
      ctx.strokeRect(26, 24, 48, 36);
      ctx.beginPath(); ctx.moveTo(14, 64); ctx.lineTo(86, 64); ctx.lineTo(82, 74); ctx.lineTo(18, 74); ctx.closePath(); ctx.stroke();
    }
  },
  {
    id: 'camera',
    emoji: '📷',
    name: 'Camera',
    category: 'objects',
    tags: ['photo', 'snapshot'],
    draw: (ctx) => {
      ctx.strokeRect(20, 32, 60, 44);
      ctx.strokeRect(40, 24, 20, 8);
      ctx.beginPath(); ctx.arc(50, 54, 16, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'bomb',
    emoji: '💣',
    name: 'Bomb',
    category: 'objects',
    tags: ['blast', 'explode'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(46, 56, 28, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeRect(62, 28, 8, 8);
      ctx.beginPath(); ctx.moveTo(66, 28); ctx.quadraticCurveTo(74, 18, 84, 16); ctx.stroke();
    }
  },
  {
    id: 'sword',
    emoji: '🗡️',
    name: 'Dagger / Sword',
    category: 'objects',
    tags: ['blade', 'weapon'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.moveTo(50, 12); ctx.lineTo(58, 62); ctx.lineTo(42, 62); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(34, 62); ctx.lineTo(66, 62); ctx.stroke();
      ctx.strokeRect(47, 62, 6, 20);
    }
  },
  {
    id: 'shield',
    emoji: '🛡️',
    name: 'Shield',
    category: 'objects',
    tags: ['defense', 'protect'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(22, 24); ctx.lineTo(78, 24); ctx.lineTo(78, 52); ctx.quadraticCurveTo(50, 88, 50, 88); ctx.quadraticCurveTo(22, 52, 22, 24); ctx.closePath();
      ctx.stroke();
    }
  },
  {
    id: 'gun',
    emoji: '🔫',
    name: 'Water Gun',
    category: 'objects',
    tags: ['pistol', 'water'],
    draw: (ctx) => {
      ctx.strokeRect(20, 32, 55, 16); // barrel
      ctx.strokeRect(55, 48, 16, 32); // grip
      ctx.beginPath(); ctx.arc(48, 52, 6, 0, Math.PI); ctx.stroke(); // trigger
    }
  },
  {
    id: 'umbrella',
    emoji: '☂️',
    name: 'Umbrella',
    category: 'objects',
    tags: ['rain', 'dry'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 48, 36, Math.PI, 0, false); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 12); ctx.lineTo(50, 80); ctx.arc(44, 80, 6, 0, Math.PI); ctx.stroke();
    }
  },
  {
    id: 'money_bag',
    emoji: '💰',
    name: 'Money Bag',
    category: 'objects',
    tags: ['cash', 'rich', 'dollar'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(42, 32); ctx.lineTo(58, 32); ctx.lineTo(65, 20); ctx.lineTo(35, 20); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(50, 62, 26, 0, Math.PI * 2); ctx.stroke();
      // $ symbol
      ctx.beginPath(); ctx.moveTo(50, 44); ctx.lineTo(50, 78); ctx.stroke();
    }
  },

  // --- PLACES & VEHICLES ---
  {
    id: 'house',
    emoji: '🏠',
    name: 'House',
    category: 'places',
    tags: ['home', 'roof', 'building'],
    draw: (ctx) => {
      ctx.strokeRect(24, 46, 52, 42);
      ctx.beginPath(); ctx.moveTo(18, 48); ctx.lineTo(50, 16); ctx.lineTo(82, 48); ctx.closePath(); ctx.stroke();
      ctx.strokeRect(42, 62, 16, 26);
    }
  },
  {
    id: 'car',
    emoji: '🚗',
    name: 'Car',
    category: 'places',
    tags: ['automobile', 'drive', 'vehicle'],
    draw: (ctx) => {
      ctx.strokeRect(14, 62, 72, 12);
      ctx.beginPath(); ctx.moveTo(26, 62); ctx.lineTo(38, 38); ctx.lineTo(66, 38); ctx.lineTo(76, 62); ctx.stroke();
      ctx.beginPath(); ctx.arc(32, 74, 8, 0, Math.PI * 2); ctx.arc(68, 74, 8, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'rocket',
    emoji: '🚀',
    name: 'Rocket',
    category: 'places',
    tags: ['space', 'blastoff'],
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 12); ctx.bezierCurveTo(65, 25, 68, 55, 66, 75); ctx.lineTo(34, 75); ctx.bezierCurveTo(32, 55, 35, 25, 50, 12);
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(34, 60); ctx.lineTo(18, 78); ctx.lineTo(34, 75); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(66, 60); ctx.lineTo(82, 78); ctx.lineTo(66, 75); ctx.stroke();
      ctx.beginPath(); ctx.arc(50, 42, 8, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    id: 'airplane',
    emoji: '✈️',
    name: 'Airplane',
    category: 'places',
    tags: ['flight', 'sky'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.ellipse(50, 50, 6, 38, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12, 44); ctx.lineTo(88, 44); ctx.lineTo(50, 54); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(34, 82); ctx.lineTo(66, 82); ctx.stroke();
    }
  },
  {
    id: 'boat',
    emoji: '⛵',
    name: 'Sailboat',
    category: 'places',
    tags: ['sail', 'ocean'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.moveTo(18, 72); ctx.lineTo(82, 72); ctx.lineTo(72, 86); ctx.lineTo(28, 86); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(48, 20); ctx.lineTo(48, 72); ctx.lineTo(76, 65); ctx.closePath(); ctx.stroke();
    }
  },
  {
    id: 'bicycle',
    emoji: '🚲',
    name: 'Bicycle',
    category: 'places',
    tags: ['bike', 'cycling'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(28, 64, 16, 0, Math.PI * 2); ctx.arc(72, 64, 16, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(28, 64); ctx.lineTo(46, 64); ctx.lineTo(62, 44); ctx.lineTo(42, 44); ctx.closePath();
      ctx.lineTo(28, 64); ctx.moveTo(46, 64); ctx.lineTo(72, 64); ctx.stroke();
    }
  },

  // --- ACTIVITIES & SPORTS ---
  {
    id: 'soccer',
    emoji: '⚽',
    name: 'Soccer Ball',
    category: 'sports',
    tags: ['football', 'goal'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 36, 0, Math.PI * 2); ctx.stroke();
      const r = 12;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x = 50 + r * Math.cos(a), y = 50 + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.stroke();
    }
  },
  {
    id: 'basketball',
    emoji: '🏀',
    name: 'Basketball',
    category: 'sports',
    tags: ['hoop', 'nba'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 50, 36, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(14, 50); ctx.lineTo(86, 50); ctx.moveTo(50, 14); ctx.lineTo(50, 86); ctx.stroke();
    }
  },
  {
    id: 'controller',
    emoji: '🎮',
    name: 'Video Game',
    category: 'sports',
    tags: ['gaming', 'playstation', 'xbox'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(20, 32, 60, 36, 12) : ctx.strokeRect(20, 32, 60, 36); ctx.stroke();
      // D-pad +
      ctx.beginPath(); ctx.moveTo(34, 44); ctx.lineTo(34, 56); ctx.moveTo(28, 50); ctx.lineTo(40, 50); ctx.stroke();
      // Buttons
      ctx.beginPath(); ctx.arc(66, 46, 3, 0, Math.PI * 2); ctx.arc(72, 52, 3, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    id: 'guitar',
    emoji: '🎸',
    name: 'Guitar',
    category: 'sports',
    tags: ['music', 'rock', 'strings'],
    draw: (ctx) => {
      // Body 8 shape
      ctx.beginPath(); ctx.arc(36, 68, 18, 0, Math.PI * 2); ctx.arc(46, 48, 12, 0, Math.PI * 2); ctx.stroke();
      // Neck
      ctx.beginPath(); ctx.moveTo(52, 40); ctx.lineTo(78, 14); ctx.stroke();
    }
  },
  {
    id: 'music_note',
    emoji: '🎵',
    name: 'Music Note',
    category: 'symbols',
    tags: ['song', 'melody'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.ellipse(32, 74, 10, 7, -0.3, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(68, 64, 10, 7, -0.3, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(40, 72); ctx.lineTo(40, 24); ctx.lineTo(76, 14); ctx.lineTo(76, 62); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(40, 32); ctx.lineTo(76, 22); ctx.stroke();
    }
  },
  {
    id: 'trophy',
    emoji: '🏆',
    name: 'Trophy',
    category: 'sports',
    tags: ['winner', 'champion', 'gold'],
    draw: (ctx) => {
      ctx.beginPath(); ctx.arc(50, 36, 22, 0, Math.PI); ctx.lineTo(28, 20); ctx.lineTo(72, 20); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(26, 34, 8, -Math.PI * 0.5, Math.PI * 0.5, true); ctx.arc(74, 34, 8, -Math.PI * 0.5, Math.PI * 0.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 58); ctx.lineTo(50, 74); ctx.stroke();
      ctx.strokeRect(32, 74, 36, 12);
    }
  }
];

if (typeof window !== 'undefined') {
  window.EMOJI_TEMPLATES = EMOJI_TEMPLATES;
}
