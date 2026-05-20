// Shared site behaviors — nav, reveal, countdown, etc.

(function () {
  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Countdown — to June 7, 2026
  const countdownEls = document.querySelectorAll('[data-countdown]');
  if (countdownEls.length) {
    const target = new Date('2026-06-07T07:00:00+05:00').getTime();
    const update = () => {
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const days = Math.floor(diff / 86400000); diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
      const mins = Math.floor(diff / 60000); diff -= mins * 60000;
      const secs = Math.floor(diff / 1000);
      countdownEls.forEach((root) => {
        const d = root.querySelector('[data-cd="days"]');
        const h = root.querySelector('[data-cd="hours"]');
        const m = root.querySelector('[data-cd="mins"]');
        const s = root.querySelector('[data-cd="secs"]');
        if (d) d.textContent = String(days).padStart(3, '0');
        if (h) h.textContent = String(hours).padStart(2, '0');
        if (m) m.textContent = String(mins).padStart(2, '0');
        if (s) s.textContent = String(secs).padStart(2, '0');
      });
    };
    update();
    setInterval(update, 1000);
  }

  // Mark active nav link automatically based on file name
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();
