const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('menu');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Animated counters
const counters = document.querySelectorAll('.stat-value');
const animateCounter = (el) => {
  const target = Number(el.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.round(target / 80));
  const tick = () => {
    current += step;
    if (current > target) current = target;
    el.textContent = current;
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const onVisible = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(onVisible, { threshold: 0.4 });
counters.forEach(c => observer.observe(c));

// Application form mock submit
const applyForm = document.getElementById('applyForm');
const formStatus = document.getElementById('formStatus');
if (applyForm) {
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (formStatus) formStatus.textContent = 'Submitting...';
    // Gather data
    const data = Object.fromEntries(new FormData(applyForm).entries());
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    // TODO: Replace with your backend endpoint
    // fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

    if (formStatus) {
      formStatus.textContent = 'Application received. Our admissions team will contact you soon.';
      formStatus.style.color = '#22c55e';
    }
    applyForm.reset();
  });
}
// Image slider
// Image slider (hero-media)
let index = 0;
const slides = document.querySelector('.hero-media');
const totalImages = document.querySelectorAll('.hero-media img').length;

function moveSlider() {
  index++;
  if (index >= totalImages) {
    index = 0; // reset to first image
  }
  const slideWidth = document.querySelector('.hero-media-wrapper').clientWidth;
  slides.style.transform = `translateX(${-slideWidth * index}px)`;
}

// Always reset to first image when page loads
window.addEventListener('load', () => {
  index = 0;
  slides.style.transform = 'translateX(0)'; // show mata(1).jpg
  setInterval(moveSlider, 4200); // start sliding
});


