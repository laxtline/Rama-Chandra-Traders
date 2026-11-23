/**
 * RAMACHANDRA TRADERS — PRODUCT CATEGORIES
 * File: js/components/categories.js
 *
 * Builds the five product cards and the brand modal.
 * Data comes from js/config/category-media.js (CATEGORY_MEDIA).
 */

const CAT_CFG = {
  tiles:           { brands: 'Kajaria · Johnson Tiles' },
  paints:          { brands: 'Berger · Birla Opus' },
  electrical:      { brands: 'V-Guard · Jaquar · Great White · Pride' },
  'pipe sanitary': { brands: 'Jaquar · CERA · Finolex' },
  interiors:       { brands: 'Wooden · Balcony · Jhumar' },
};

const CAT_NAMES = {
  tiles:           'Tiles',
  paints:          'Paints',
  electrical:      'Electrical',
  'pipe sanitary': 'Pipes & Sanitary',
  interiors:       'Interiors',
};

let _lastTrigger = null;

/**
 * buildCategories() — fill #catGrid with one card per category.
 */
function buildCategories() {
  const grid = document.getElementById('catGrid');
  if (!grid || typeof CATEGORY_MEDIA === 'undefined') return;

  Object.entries(CATEGORY_MEDIA).forEach(([key, items]) => {
    const name    = CAT_NAMES[key] || key;
    const brands  = CAT_CFG[key]?.brands || '';
    const first   = items[0]?.src;

    const card = document.createElement('article');
    card.className = 'product-card reveal';
    card.dataset.key = key;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `See ${name} brands`);

    card.innerHTML = `
      <div class="product-media">
        ${first
          ? `<img src="${first}" alt="${name} at Ramachandra Traders" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;product-placeholder&quot;>${name[0]}</div>'">`
          : `<div class="product-placeholder">${name[0]}</div>`}
      </div>
      <div class="product-body">
        <h3>${name}</h3>
        <p class="product-brands">${brands}</p>
        <span class="product-more">
          See brands
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>`;

    const open = () => {
      _lastTrigger = card;
      openCatModal(key, name, items);
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    grid.appendChild(card);
    if (typeof revObs !== 'undefined') revObs.observe(card);
  });
}

/**
 * openCatModal() — show brand images for one category.
 */
function openCatModal(key, name, items) {
  const modal = document.getElementById('catModal');
  const title = document.getElementById('catModalTitle');
  const grid  = document.getElementById('catModalGrid');
  const waBtn = document.getElementById('modalWaBtn');
  if (!modal || !grid) return;

  title.textContent = name;
  grid.innerHTML = '';

  items.forEach((item, idx) => {
    const tile = document.createElement('div');
    tile.className = 'modal-brand';
    tile.setAttribute('role', 'button');
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('aria-label', `View ${item.caption} full size`);

    tile.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <p>${esc(item.caption)}</p>`;

    const open = () => openLb(item.src, item.caption, items, idx);
    tile.addEventListener('click', open);
    tile.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    grid.appendChild(tile);
  });

  if (waBtn) {
    waBtn.href = `${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi, I want the rate and stock for ${name}`)}`;
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close')?.focus();
}

/**
 * closeCatModal() — close the brand modal.
 */
function closeCatModal(target) {
  const modal = document.getElementById('catModal');
  if (!modal) return;
  if (target && target !== modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  _lastTrigger?.focus();
}

(function initCatModal() {
  const modal = document.getElementById('catModal');
  const closeBtn = modal?.querySelector('.modal-close');

  modal?.addEventListener('click', e => {
    if (e.target === modal) closeCatModal();
  });
  closeBtn?.addEventListener('click', () => closeCatModal());
})();
