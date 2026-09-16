/**
 * CARTER CLICKER - CLEAN & LIGHT VERSION
 * Zero sound effects, fast, simple, responsive
 */

// --- GAME STATE ---
const GAME = {
  coins: 0,
  totalEarned: 0,
  currentImgIndex: 0,
};

// Available Carter Photos & Vibes
const CARTER_IMAGES = [
  { src: "images/carter1.png", name: "Mugshot" },
  { src: "images/carter2.png", name: "Hear Me Out" },
  { src: "images/carter3.png", name: "Doorbell Stare" }
];

// Carter Witty Speech Quotes
const CARTER_QUOTES = [
  "Don't you dare put thermal paste in the socket, bro.",
  "Yo what's up guys, Carter here!",
  "Bro bought a $2,000 PC with a GT 710 inside.",
  "Wait, hear me out... what if we water cool with Baja Blast?",
  "Why does your PSU have ketchup and mustard cables?!",
  "Linus dropped another OLED monitor.",
  "Temu seller swore this runs GTA 6. Bro, it's an OptiPlex.",
  "Bro used an entire 50g tube of thermal paste like cream cheese.",
  "If your PC sounds like a Boeing 747, you need new fans.",
  "More RGB equals more FPS. Scientifically proven.",
  "Bro asked if he can download more VRAM from Temu.",
  "Single channel RAM in 2026? Who hurt you?",
  "That PSU is a certified fire hazard."
];

// Floating Click Mini Jokes
const CLICK_JOKES = [
  "+1 Thermal Paste!",
  "+1 Clout!",
  "+1 FPS!",
  "Bro bought a prebuilt!",
  "OptiPlex Alert!",
  "Fire Hazard!",
  "Wait, hear me out!",
  "Yo what's up guys!",
  "Linus dropped it!",
  "Temu special!",
  "Cable spaghetti!",
  "Air Fryer PC!",
  "14,000 RPM!"
];

// Upgrades (Merged into one clean, progressive list)
const UPGRADES = [
  {
    id: "pea_paste",
    name: "Pea-Sized Paste",
    icon: "🧪",
    cps: 0.5,
    baseCost: 15,
    count: 0
  },
  {
    id: "walmart_pc",
    name: "Walmart Prebuilt",
    icon: "🛒",
    cps: 4,
    baseCost: 100,
    count: 0
  },
  {
    id: "temu_optiplex",
    name: "TikTok Mystery PC",
    icon: "📦",
    cps: 24,
    baseCost: 1100,
    count: 0
  },
  {
    id: "jet_fans",
    name: "14,000 RPM Fans",
    icon: "🌀",
    cps: 180,
    baseCost: 12000,
    count: 0
  },
  {
    id: "linus_collab",
    name: "Linus Tech Collab",
    icon: "🧤",
    cps: 1200,
    baseCost: 130000,
    count: 0
  },
  {
    id: "air_fryer",
    name: "Overclocked Air Fryer",
    icon: "🍗",
    cps: 7500,
    baseCost: 1400000,
    count: 0
  },
  {
    id: "gold_spatula",
    name: "Golden Paste Spatula",
    icon: "🗡️",
    cps: 45000,
    baseCost: 20000000,
    count: 0
  },
  {
    id: "baja_loop",
    name: "Baja Blast Loop",
    icon: "🍹",
    cps: 250000,
    baseCost: 330000000,
    count: 0
  },
  {
    id: "rtx_5090",
    name: "RTX 5090 Ti Nuclear",
    icon: "⚡",
    cps: 1500000,
    baseCost: 5000000000,
    count: 0
  },
  {
    id: "carter_algorithm",
    name: "CarterPCS Algorithm",
    icon: "📱",
    cps: 12000000,
    baseCost: 75000000000,
    count: 0
  }
];

// Number Formatter
function formatNumber(num) {
  if (!num || num === 0) return "0";
  if (num < 10) return num % 1 === 0 ? num.toString() : num.toFixed(1);
  if (num < 1000) return Math.floor(num).toLocaleString();

  const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi"];
  const i = Math.floor(Math.log10(num) / 3);
  if (i >= suffixes.length) return num.toExponential(1);
  return `${(num / Math.pow(10, i * 3)).toFixed(1)} ${suffixes[i]}`;
}

// Cost calculation
function getUpgradeCost(item) {
  return Math.floor(item.baseCost * Math.pow(1.15, item.count));
}

// Total CPS
function getTotalCPS() {
  return UPGRADES.reduce((sum, u) => sum + u.cps * u.count, 0);
}

// DOM Elements
const coinCountEl = document.getElementById("coin-count");
const cpsDisplayEl = document.getElementById("cps-display");
const carterImgEl = document.getElementById("carter-img");
const carterBox = document.getElementById("carter-click-area");
const clickRipple = document.getElementById("click-ripple");
const clickEffects = document.getElementById("click-effects");
const carterQuoteEl = document.getElementById("carter-quote");
const carterVibeTag = document.getElementById("carter-vibe-tag");
const shopListEl = document.getElementById("shop-list");
const ownedCountBadge = document.getElementById("owned-count-badge");
const btnReset = document.getElementById("btn-reset");

// Render Shop
function renderShop() {
  shopListEl.innerHTML = "";
  let totalOwned = 0;

  for (const item of UPGRADES) {
    totalOwned += item.count;
    const cost = getUpgradeCost(item);
    const canAfford = GAME.coins >= cost;

    const card = document.createElement("div");
    card.className = `upgrade-card ${canAfford ? '' : 'disabled'}`;
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="card-left">
        <div class="card-icon">${item.icon}</div>
        <div class="card-details">
          <h4>${item.name}</h4>
          <div class="card-boost">+${formatNumber(item.cps)} / s</div>
        </div>
      </div>
      <div class="card-right">
        <div class="card-cost">🪙 ${formatNumber(cost)}</div>
        <div class="card-owned">${item.count > 0 ? item.count + ' owned' : ''}</div>
      </div>
    `;

    card.addEventListener("click", () => buyUpgrade(item));
    shopListEl.appendChild(card);
  }

  ownedCountBadge.textContent = `${totalOwned} owned`;
}

// Buy Item
function buyUpgrade(item) {
  const cost = getUpgradeCost(item);
  if (GAME.coins >= cost) {
    GAME.coins -= cost;
    item.count++;
    renderShop();
    updateUI();
  }
}

// Switch Carter Image randomly
function switchCarterImage() {
  let next;
  do {
    next = Math.floor(Math.random() * CARTER_IMAGES.length);
  } while (next === GAME.currentImgIndex && CARTER_IMAGES.length > 1);

  GAME.currentImgIndex = next;
  const current = CARTER_IMAGES[next];
  carterImgEl.src = current.src;
  carterVibeTag.textContent = current.name;
}

// Click Carter
carterBox.addEventListener("pointerdown", (e) => {
  e.preventDefault();

  // 1. Random Image Swap
  switchCarterImage();

  // 2. Add Coins
  const clickPower = 1 + Math.floor(getTotalCPS() * 0.05);
  GAME.coins += clickPower;
  GAME.totalEarned += clickPower;

  // 3. Squash Animation
  carterBox.classList.remove("clicked", "clicked-alt");
  void carterBox.offsetWidth;
  if (Math.random() > 0.5) {
    carterBox.classList.add("clicked");
  } else {
    carterBox.classList.add("clicked-alt");
  }

  // 4. Ripple
  const rect = carterBox.getBoundingClientRect();
  const x = e.clientX ? (e.clientX - rect.left) : (rect.width / 2);
  const y = e.clientY ? (e.clientY - rect.top) : (rect.height / 2);

  clickRipple.style.left = `${x}px`;
  clickRipple.style.top = `${y}px`;
  clickRipple.classList.remove("play");
  void clickRipple.offsetWidth;
  clickRipple.classList.add("play");

  // 5. Floating Number
  spawnFloatNum(x, y, clickPower);

  // 6. Occasional Joke Popup (1 in 4 clicks)
  if (Math.random() < 0.25) {
    spawnFloatJoke(x, y);
  }

  // 7. Update Roast Quote (1 in 8 clicks)
  if (Math.random() < 0.12) {
    const q = CARTER_QUOTES[Math.floor(Math.random() * CARTER_QUOTES.length)];
    carterQuoteEl.textContent = `"${q}"`;
  }

  updateUI();
});

function spawnFloatNum(x, y, amount) {
  const el = document.createElement("div");
  el.className = "float-num";
  el.textContent = `+${formatNumber(amount)}`;
  el.style.left = `${x + (Math.random() - 0.5) * 30}px`;
  el.style.top = `${y + (Math.random() - 0.5) * 20}px`;
  clickEffects.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

function spawnFloatJoke(x, y) {
  const el = document.createElement("div");
  el.className = "float-joke";
  el.textContent = CLICK_JOKES[Math.floor(Math.random() * CLICK_JOKES.length)];
  el.style.setProperty("--dx", `${(Math.random() - 0.5) * 60}px`);
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  clickEffects.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// Update UI
function updateUI() {
  coinCountEl.textContent = formatNumber(GAME.coins);
  cpsDisplayEl.textContent = formatNumber(getTotalCPS());

  // Update shop card afford states without re-rendering everything
  for (const card of shopListEl.children) {
    const id = card.dataset.id;
    const item = UPGRADES.find(u => u.id === id);
    if (item) {
      const cost = getUpgradeCost(item);
      if (GAME.coins >= cost) {
        card.classList.remove("disabled");
      } else {
        card.classList.add("disabled");
      }
    }
  }
}

// Game Loop
let lastTime = performance.now();
function loop(now) {
  const delta = (now - lastTime) / 1000;
  lastTime = now;

  const cps = getTotalCPS();
  if (cps > 0) {
    const gain = cps * delta;
    GAME.coins += gain;
    GAME.totalEarned += gain;
  }

  updateUI();
  requestAnimationFrame(loop);
}

// Save / Load
function save() {
  const data = {
    coins: GAME.coins,
    totalEarned: GAME.totalEarned,
    upgrades: UPGRADES.map(u => ({ id: u.id, count: u.count }))
  };
  localStorage.setItem("carter_clean_save", JSON.stringify(data));
}

function load() {
  const raw = localStorage.getItem("carter_clean_save");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    GAME.coins = data.coins || 0;
    GAME.totalEarned = data.totalEarned || 0;
    if (data.upgrades) {
      for (const saved of data.upgrades) {
        const u = UPGRADES.find(item => item.id === saved.id);
        if (u) u.count = saved.count || 0;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

btnReset.addEventListener("click", () => {
  if (confirm("Reset game?")) {
    localStorage.removeItem("carter_clean_save");
    location.reload();
  }
});

// Periodic Quote Rotation (every 12s)
setInterval(() => {
  const q = CARTER_QUOTES[Math.floor(Math.random() * CARTER_QUOTES.length)];
  carterQuoteEl.textContent = `"${q}"`;
}, 12000);

// Auto-save every 15s
setInterval(save, 15000);

// Init
load();
renderShop();
updateUI();
requestAnimationFrame(loop);
