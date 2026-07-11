/* ── Hamburger Menu ── */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ── Active Nav Link ── */
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const linkPath = link.getAttribute('href').split('/').pop();
  if (linkPath === currentPath) link.classList.add('active');
});

/* ── Typing Animation ── */
const typingEl = document.getElementById('heroTyping');
if (typingEl) {
  const phrases = [
    'DevOps Engineer',
    'Cloud Enthusiast',
    'Kubernetes Explorer',
    'Interview Prep Expert',
    'Infrastructure Builder'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 600);
}

/* ── Category Filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const postCards = document.querySelectorAll('.post-card');
const noResults = document.getElementById('noResults');

if (filterBtns.length && postCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      applyFilters();
    });
  });
}

/* ── Search ── */
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
}

function applyFilters() {
  const activeBtn = document.querySelector('.filter-btn.active');
  const filter = activeBtn ? activeBtn.dataset.filter : 'all';
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  let visible = 0;

  postCards.forEach(card => {
    const cats = (card.dataset.category || '').split(' ');
    const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
    const excerpt = card.querySelector('.card-excerpt')?.textContent.toLowerCase() || '';
    const matchFilter = filter === 'all' || cats.includes(filter);
    const matchSearch = !query || title.includes(query) || excerpt.includes(query);
    const show = matchFilter && matchSearch;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

/* ── Q&A Accordion ── */
document.querySelectorAll('.qa-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.qa-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.qa-item.open').forEach(open => {
      if (open !== item) open.classList.remove('open');
    });
    item.classList.toggle('open', !wasOpen);
  });
});

/* ── Back to Top ── */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
