/* =====================================================
   EASY EDIT AREA - change the things below
   ===================================================== */

// Anniversary start date (15 November 2024)
const START = new Date(2024, 10, 15, 0, 0, 0);

// Reasons I love you (add or remove lines freely)
const REASONS = [
  "You are my biggest supporter",
  "You make me feel safe",
  "Your smile fixes my worst days",
  "You believe in me more than I do",
  "You love me with so much respect",
  "You make ordinary days magical",
  "You are my best friend",
  "You are my home",
  "You make me braver",
  "You choose me, every single day",
  "Your are my appa,amma,partner and many...",
  "Because you are simply you"
];

// Photos: put your pictures inside the "photos" folder and list them here
// Example: { file: "photos/us1.jpg", caption: "Our first trip" }
const PHOTOS = [
  { file: "photos/1.jpg", caption: "Our First Outing 🥹❤️ | 2 January 📸✨" },
  { file: "photos/2.jpg", caption: "Our First Photo Together in College 🥹🏫❤️" },
  { file: "photos/3.jpg", caption: "Our First Long Journey to Ooty 🌿♾️❤️" },
  { file: "photos/4.jpg", caption: "Your First Gift for My Birthday 🎁🥹❤️ | December 2024 🎂💗 The Gift Was Special Because It Came From You 🫶🏻🎀" },
  { file: "photos/5.jpg", caption: "Our Special AI Photo 🤖🎨❤️ | Even AI Knows We Make the Perfect Couple 🥹🫶🏻💞" },
  { file: "photos/6.jpg", caption: "Ukkadam Lake 🌊🥺❤️‍🩹 | The Day You Cried Because I Had Only a Few Days Left in CBE 😭🫂💔 A Memory I'll Carry in My Heart Forever ♾️💗"}
];

/* =====================================================
   Website code (no need to change below)
   ===================================================== */
const $ = (id) => document.getElementById(id);

/* ---------- Gate / Open ---------- */
const bgm = $('bgm');
const musicBtn = $('musicBtn');

$('openBtn').addEventListener('click', () => {
  $('gate').classList.add('fade');
  $('site').classList.remove('hidden');
  burst(70);
  bgm.volume = 0.6;
  bgm.play().then(() => musicBtn.classList.add('playing')).catch(() => {});
  setTimeout(() => $('gate').remove(), 1000);
  setupReveal();
});

musicBtn.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play().then(() => musicBtn.classList.add('playing')).catch(() => {});
  } else {
    bgm.pause();
    musicBtn.classList.remove('playing');
  }
});

/* ---------- Counter ---------- */
function updateCounter() {
  const now = new Date();
  let y = now.getFullYear() - START.getFullYear();
  let m = now.getMonth() - START.getMonth();
  let d = now.getDate() - START.getDate();
  let h = now.getHours();
  let mi = now.getMinutes();
  let s = now.getSeconds();

  if (d < 0) {
    m -= 1;
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (m < 0) { y -= 1; m += 12; }

  if (now < START) { y = m = d = h = mi = s = 0; }

  $('cYears').textContent = y;
  $('cMonths').textContent = m;
  $('cDays').textContent = d;
  $('cHours').textContent = h;
  $('cMins').textContent = mi;
  $('cSecs').textContent = s;

  const totalDays = Math.max(0, Math.floor((now - START) / 86400000));
  $('totalDays').textContent = totalDays.toLocaleString() + " beautiful days of loving you";

  // next anniversary countdown
  let next = new Date(now.getFullYear(), 10, 15);
  if (now > new Date(now.getFullYear(), 10, 16)) next = new Date(now.getFullYear() + 1, 10, 15);
  const sameDay = now.getMonth() === 10 && now.getDate() === 15;
  if (sameDay) {
    $('countdown').textContent = "Today is our anniversary! Happy Anniversary, my love ❤";
  } else {
    const left = Math.ceil((next - now) / 86400000);
    $('countdown').textContent = left + " days until our next anniversary";
  }
}
updateCounter();
setInterval(updateCounter, 1000);

/* ---------- Reasons ---------- */
REASONS.forEach((text) => {
  const el = document.createElement('div');
  el.className = 'reason';
  el.innerHTML =
    '<div class="reason-inner">' +
    '<div class="reason-face reason-front">❤</div>' +
    '<div class="reason-face reason-back"></div></div>';
  el.querySelector('.reason-back').textContent = text;
  el.addEventListener('click', () => el.classList.toggle('flip'));
  $('reasons').appendChild(el);
});

/* ---------- Gallery ---------- */
const lightbox = $('lightbox');
PHOTOS.forEach((p) => {
  const card = document.createElement('div');
  card.className = 'photo';

  const ph = document.createElement('div');
  ph.className = 'ph';
  ph.innerHTML = '<b>📷</b><span>Add your photo in the photos folder</span>';
  card.appendChild(ph);

  const img = new Image();
  img.alt = p.caption;
  img.onload = () => {
    ph.remove();
    card.insertBefore(img, card.firstChild);
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = p.caption;
    card.appendChild(cap);
    card.addEventListener('click', () => {
      $('lightImg').src = p.file;
      $('lightCap').textContent = p.caption;
      lightbox.classList.remove('hidden');
    });
  };
  img.src = p.file;
  $('gallery').appendChild(card);
});
$('closeLight').addEventListener('click', () => lightbox.classList.add('hidden'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.add('hidden'); });

/* ---------- Secret message ---------- */
$('secretBtn').addEventListener('click', () => {
  $('modal').classList.remove('hidden');
  burst(120);
});
$('closeModal').addEventListener('click', () => $('modal').classList.add('hidden'));
$('modal').addEventListener('click', (e) => { if (e.target === $('modal')) $('modal').classList.add('hidden'); });

/* ---------- Scroll reveal ---------- */
function setupReveal() {
  const targets = document.querySelectorAll('.section, .tl-item, .letter, footer');
  targets.forEach((t) => t.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('show');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((t) => io.observe(t));
}

/* ---------- Floating hearts canvas ---------- */
const canvas = $('hearts');
const ctx = canvas.getContext('2d');
let W, H, hearts = [];
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
addEventListener('resize', resize);
resize();

const EMOJIS = ['❤', '💖', '💕', '🌸', '✨', '💗'];
function spawn(x, y, burstMode) {
  hearts.push({
    x: x ?? Math.random() * W,
    y: y ?? H + 20,
    size: 12 + Math.random() * 22,
    vx: burstMode ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.6,
    vy: burstMode ? -(2 + Math.random() * 7) : -(0.6 + Math.random() * 1.2),
    life: 1,
    decay: burstMode ? 0.008 + Math.random() * 0.01 : 0.0015,
    ch: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    wob: Math.random() * Math.PI * 2
  });
}
function burst(n) {
  for (let i = 0; i < n; i++) spawn(W / 2, H / 2, true);
}
function loop() {
  ctx.clearRect(0, 0, W, H);
  if (Math.random() < 0.08 && hearts.length < 70) spawn();
  hearts = hearts.filter((h) => h.life > 0 && h.y > -40);
  hearts.forEach((h) => {
    h.wob += 0.03;
    h.x += h.vx + Math.sin(h.wob) * 0.4;
    h.y += h.vy;
    h.life -= h.decay;
    ctx.globalAlpha = Math.max(0, Math.min(1, h.life)) * 0.7;
    ctx.font = h.size + 'px serif';
    ctx.fillText(h.ch, h.x, h.y);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(loop);
}
loop();

// tap anywhere for a little heart burst
addEventListener('click', (e) => {
  if (e.target.closest('button')) return;
  for (let i = 0; i < 6; i++) spawn(e.clientX, e.clientY, true);
});
