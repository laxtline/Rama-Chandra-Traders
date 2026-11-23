/**
 * RAMACHANDRA TRADERS — APP INITIALISATION
 * File: js/main.js
 *
 * Loaded last. Starts the parts of the page that are built
 * from the config files.
 */

/* Scroll reveal */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

function initScrollReveal() {
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
}

/* Footer social links, built from SOCIAL_LINKS */
function buildFooterSocials() {
  const container = document.getElementById('footSocials');
  if (!container || typeof SOCIAL_LINKS === 'undefined') return;

  const defs = [
    {
      key: 'instagram', label: 'Instagram',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    },
    {
      key: 'facebook', label: 'Facebook',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    },
    {
      key: 'youtube', label: 'YouTube',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.5 6.4a2.8 2.8 0 0 0-1.9-2C18.9 4 12 4 12 4s-6.9 0-8.6.4a2.8 2.8 0 0 0-1.9 2C1 8.2 1 12 1 12s0 3.8.5 5.6a2.8 2.8 0 0 0 1.9 1.9C5.1 20 12 20 12 20s6.9 0 8.6-.5a2.8 2.8 0 0 0 1.9-1.9C23 15.8 23 12 23 12s0-3.8-.5-5.6z"/><polygon points="9.8 15 15.5 12 9.8 9" fill="#0A3A25"/></svg>',
    },
    {
      key: 'x', label: 'X',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.2 2.3h3.3l-7.2 8.3 8.5 11.2h-6.7l-4.7-6.2-5.4 6.2H2.7l7.7-8.8L2.3 2.3h6.9l4.3 5.6z"/></svg>',
    },
    {
      key: 'threads', label: 'Threads',
      icon: '<svg viewBox="0 0 192 192" fill="currentColor" aria-hidden="true"><path d="M141.5 89a67 67 0 0 0-2.5-1.1c-1.5-27.3-16.4-42.9-41.5-43.1h-.3c-15 0-27.4 6.4-35.1 18l13.8 9.5c5.7-8.7 14.7-10.5 21.3-10.5h.2c8.3.1 14.5 2.5 18.5 7.1 2.9 3.4 4.9 8.1 5.9 14-7.3-1.2-15.2-1.6-23.7-1.1-23.8 1.4-39.1 15.3-38.1 34.6.5 9.8 5.4 18.2 13.7 23.7 7 4.7 16.1 6.9 25.6 6.4 12.5-.7 22.2-5.4 29-14.1 5.2-6.6 8.5-15.2 9.9-25.9 5.9 3.6 10.3 8.3 12.8 14 4.1 9.6 4.4 25.5-8.5 38.4-11.3 11.3-24.9 16.2-45.5 16.4-22.8-.2-40.1-7.5-51.3-21.7C35.2 140 29.8 120.7 29.6 96c.2-24.7 5.6-44 16.1-57.3C57 24.4 74.2 17.1 97 16.9c23 .2 40.5 7.5 52.2 21.8 5.7 7 10 15.9 12.9 26.2l16.1-4.3c-3.4-12.7-8.9-23.6-16.2-32.7C147 9.6 125.2.2 97.1 0h-.2C68.9.2 47.2 9.6 32 28.1 18.4 44.7 11.3 67.9 11 96l-.01.05.01.05c.3 28.1 7.4 51.3 21 68C47.2 182.5 68.8 192 96.9 192h.2c25-.2 42.6-6.7 57-21.2 19-19 18.4-42.7 12.1-57.3-4.5-10.4-13-18.9-24.8-24.7z"/><path d="M98.1 87.5c-12.3.7-19.4 7.3-18.9 15.1.4 7.8 8.5 12.3 20.8 11.6 9.8-.6 17.2-5.2 21.5-13.3-3.5-1.6-7.6-2.8-12.2-3.3a98 98 0 0 0-11.2-.1z"/></svg>',
    },
  ];

  container.innerHTML = defs
    .filter(s => SOCIAL_LINKS[s.key])
    .map(s => `
      <a href="${SOCIAL_LINKS[s.key]}" target="_blank" rel="noopener noreferrer"
         class="soc-btn" aria-label="${s.label}">
        ${s.icon} ${s.label}
      </a>`)
    .join('');
}

/* Keyboard: Escape closes modal / lightbox, arrows move through images */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCatModal();
      closeLb();
      document.body.style.overflow = '';
    }
    const lightbox = document.getElementById('lightbox');
    if (lightbox?.classList.contains('open')) {
      if (e.key === 'ArrowLeft')  lbNav(-1);
      if (e.key === 'ArrowRight') lbNav(1);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  buildCategories();
  buildBrandList();
  buildFooterSocials();
  initKeyboard();
});
