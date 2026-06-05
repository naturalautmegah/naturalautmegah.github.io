/* ═══════════════════════════════════════════════════════════
   Natura Laut Megah — main.js
   Carousel logic + nav scroll effect
   ═══════════════════════════════════════════════════════════ */

const DURATION = 6000; // ms per slide

/* ─── DOM refs ─── */
const nav         = document.getElementById('nav');
const slides      = document.querySelectorAll('.slide');
const dots        = document.querySelectorAll('.dot');
const tags        = document.querySelectorAll('.p-tag');
const counter     = document.getElementById('counter');
const progressBar = document.getElementById('progressBar');
const prevBtn     = document.getElementById('prevBtn');
const nextBtn     = document.getElementById('nextBtn');

const COUNTERS = ['01 / 03', '02 / 03', '03 / 03'];

let current   = 0;
let autoTimer = null;

/* ─── Nav: add .scrolled class on scroll ─── */
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── Carousel: navigate to slide idx ─── */
function goTo(idx) {
  // Deactivate current
  slides[current].classList.remove('active');
  slides[current].classList.add('prev');
  dots[current].classList.remove('active');
  tags[current].classList.remove('active-tag');

  // Clean up 'prev' class after transition completes
  const prevIdx = current;
  setTimeout(() => {
    slides[prevIdx].classList.remove('prev');
  }, 1200);

  // Activate next
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  tags[current].classList.add('active-tag');
  counter.textContent = COUNTERS[current];

  resetProgress();
}

/* ─── Progress bar ─── */
function resetProgress() {
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';

  // Double rAF to ensure the browser registers the reset before animating
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressBar.style.transition = `width ${DURATION}ms linear`;
      progressBar.style.width = '100%';
    });
  });
}

/* ─── Auto-advance ─── */
function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), DURATION);
}

/* ─── Event listeners ─── */
nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goTo(Number(dot.dataset.idx));
    startAuto();
  });
});

tags.forEach(tag => {
  tag.addEventListener('click', () => {
    goTo(Number(tag.dataset.idx));
    startAuto();
  });
});

/* ─── Kick off ─── */
startAuto();
resetProgress();
