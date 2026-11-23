/**
 * RAMACHANDRA TRADERS — BRAND LIST
 * File: js/components/brands.js
 *
 * Builds the "Authorised brands" list from CATEGORY_MEDIA.
 * Add or remove a brand in js/config/category-media.js and it
 * appears here automatically.
 */

function buildBrandList() {
  const list = document.getElementById('brandList');
  if (!list || typeof CATEGORY_MEDIA === 'undefined') return;

  const rows = Object.entries(CATEGORY_MEDIA).map(([key, items]) => {
    const label = (typeof CAT_NAMES !== 'undefined' && CAT_NAMES[key]) || key;
    const names = items.map(i => i.caption).join(', ');
    return `
      <div class="brand-row">
        <span class="brand-cat">${label}</span>
        <span class="brand-names">${esc(names)}</span>
      </div>`;
  });

  list.innerHTML = rows.join('');
}
