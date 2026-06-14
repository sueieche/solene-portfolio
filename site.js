// site.js — shared across all 4 pages
(function(){
  // nav scroll state
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // lang toggle
  const body = document.body;
  const btns = document.querySelectorAll('[data-set-lang]');
  const setLang = (lang) => {
    body.setAttribute('data-active', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : 'en');
    btns.forEach(b => b.classList.toggle('active', b.getAttribute('data-set-lang') === lang));
    try { localStorage.setItem('lang', lang); } catch(e){}
  };
  btns.forEach(b => b.addEventListener('click', () => setLang(b.getAttribute('data-set-lang'))));
  // restore lang
  try {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);
  } catch(e){}

  // mark active nav link based on filename
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html') ||
        (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // reveal on scroll
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  // cover parallax (only on home)
  const cover = document.getElementById('coverArt');
  if (cover && window.matchMedia('(hover: hover)').matches) {
    const layers = cover.querySelectorAll('.layer');
    let raf = null;
    window.addEventListener('mousemove', e => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        layers.forEach((l, i) => {
          const depth = (i + 1) * 8;
          const cur = l.dataset.baseTransform || '';
          l.style.transform = `${cur} translate3d(${dx * depth}px, ${dy * depth}px, 0)`;
        });
      });
    });
  }
})();
