/* ============================================================
   K_Habba.js — Karunada Habba Cultural Experience
   Fluid Interactions · Audio Synthesis · Confetti
   ============================================================ */

// ── 1. Sticky Nav & Dock Active States on Scroll ─────────────
function initNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navPills = document.querySelectorAll('.nav-pill');
  const dockBtns = document.querySelectorAll('.dock-action-btn[data-target]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navPills.forEach((p) => {
            p.classList.toggle('active', p.getAttribute('href') === '#' + id);
          });
          dockBtns.forEach((b) => {
            b.classList.toggle('active', b.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

// ── 2. History & Heritage Tabs Switcher ───────────────────────
function switchDynastyTab(tabName) {
  const tabs = document.querySelectorAll('.tab-btn-pill');
  tabs.forEach((t) => t.classList.remove('active'));

  const panels = document.querySelectorAll('.dynasty-panel');
  panels.forEach((p) => p.classList.remove('active'));

  const targetTab = document.querySelector(`[data-tab="${tabName}"]`);
  const targetPanel = document.getElementById('tab-' + tabName);

  if (targetTab) targetTab.classList.add('active');
  if (targetPanel) targetPanel.classList.add('active');
}

// ── 3. Dinner Menu Course Filter ─────────────────────────────
function filterMenu(category) {
  const buttons = document.querySelectorAll('.filter-btn-3d');
  buttons.forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-cat') === category);
  });

  const cards = document.querySelectorAll('.menu-item-card');
  cards.forEach((card) => {
    const cardCat = card.getAttribute('data-cat');
    const isVisible = category === 'all' || cardCat === category;

    card.style.display = isVisible ? 'flex' : 'none';
    if (isVisible) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(6px)';
      requestAnimationFrame(() => {
        card.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }
  });
}

// ── 4. Voice / Speech Pronunciation Guide ────────────────────
function speakPhrase(phraseText) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phraseText);
    utterance.rate = 0.88;
    const voices = window.speechSynthesis.getVoices();
    const knVoice = voices.find(
      (v) => v.lang.startsWith('kn') || v.lang === 'en-IN' || v.lang.includes('IN')
    );
    if (knVoice) utterance.voice = knVoice;
    window.speechSynthesis.speak(utterance);
  }
  showToast(`Pronounced: "${phraseText}"`);
}

// ── 5. Toast Notification System ─────────────────────────────
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const msgSpan = document.getElementById('toast-msg');
  if (msgSpan) {
    msgSpan.textContent = message;
  } else {
    toast.textContent = message;
  }

  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// ── 6. Karnataka Flag Colors (Yellow & Crimson) Confetti ─────
function celebrateKannada() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#FFC400', '#FFA000', '#D32F2F', '#8B0000', '#D4AF37', '#FFFDF4'];
  const particles = Array.from({ length: 90 }, () => ({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.38,
    vx: (Math.random() - 0.5) * 16,
    vy: (Math.random() - 0.75) * 18,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    rs: (Math.random() - 0.5) * 12,
    alpha: 1,
  }));

  showToast('ಜೈ ಕರ್ನಾಟಕ ಮಾತೆ! ಶುಭವಾಗಲಿ!');

  let animFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let isAlive = false;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.38; // gravity
      p.rot += p.rs;
      p.alpha -= 0.013;

      if (p.alpha > 0) {
        isAlive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        ctx.restore();
      }
    });

    if (isAlive) {
      animFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animFrame);
    }
  }

  render();
}

// ── 7. Window Resize & Audio Prime ───────────────────────────
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ── 8. Initialize on Load ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
});
