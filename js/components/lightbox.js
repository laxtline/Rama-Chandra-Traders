/**
 * ════════════════════════════════════════════════
 *   LIGHTBOX COMPONENT
 *   File: js/components/lightbox.js
 *
 *   Shows a full-screen lightbox popup when any image in the
 *   Gallery, Projects, or Achievements sections is clicked.
 *
 *   Features:
 *   ──────────
 *   - Full-screen image preview with dark overlay
 *   - Prev / Next navigation arrows when multiple images are present
 *   - Counter display such as "1 / 8"
 *   - Image caption display
 *   - Fade transition animation between images
 *   - Keyboard: ArrowLeft / ArrowRight to navigate, Escape to close
 *   - Accessibility: aria-hidden, focus management
 *
 *   Public functions (called by other components):
 *     openLb(src, caption, items, idx) — open the lightbox
 *     closeLb()                         — close the lightbox
 *     lbNav(direction)                  — go to next / previous image
 *
 *   Keyboard shortcuts are handled in main.js (initKeyboard).
 * ════════════════════════════════════════════════
 */

// ── Module-level State Variables ──
// These variables are not directly accessible outside this file.
// They are manipulated only through the public functions below.

let _lbItems = []; // Array of all images in the current lightbox [{src, caption}, ...]
let _lbIdx   = 0;  // Index of the currently displayed image (0-based)

/**
 * openLb() — Open the Lightbox
 * ──────────────────────────────
 * Called by media-grids.js or categories.js when a grid item is clicked.
 *
 * @param {string} src      — path of the image to display (e.g. "assets/gallery/A.jpg")
 * @param {string} caption  — caption text for the image (optional, empty string is fine)
 * @param {Array}  items    — full gallery array [{src, caption}] (used for navigation)
 *                            if not provided, only this one image is shown with no arrows
 * @param {number} idx      — index of the current image in the items array (0-based)
 *
 * Steps:
 *   1. Update global state (_lbItems, _lbIdx)
 *   2. Render the image, caption, and counter
 *   3. Make the lightbox visible by adding the 'open' class
 *   4. Lock body scroll (the page behind the modal will not scroll)
 *   5. Move focus to the image element (for keyboard navigation)
 */
function openLb(src, caption, items, idx) {
  _lbItems = items || [{ src, caption }]; // if no array is provided, wrap in single-item array
  _lbIdx   = idx   || 0;
  renderLb(); // update the image and controls

  const lb = document.getElementById('lightbox');
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false'); // tell screen readers the lightbox is visible
  document.body.style.overflow = 'hidden'; // prevent page from scrolling behind the modal
  document.getElementById('lbImg').focus(); // move keyboard focus into the lightbox
}

/**
 * renderLb() — Render the Current Image and Controls
 * ────────────────────────────────────────────────────
 * Called whenever the displayed image changes (navigation or first open).
 * Updates every visible part of the lightbox.
 *
 * What it does:
 *   - Updates the image source and alt text
 *   - Updates the caption text
 *   - Updates the counter such as "2 / 8" (empty string for a single image)
 *   - Shows / hides Prev and Next arrows (hidden when there is only one image)
 *   - Fade transition — opacity set to 0, source changed after 50ms, then fades back to 1
 */
function renderLb() {
  const item    = _lbItems[_lbIdx];                       // current image data
  const img     = document.getElementById('lbImg');       // <img> element
  const caption = document.getElementById('lbCap');       // caption div
  const counter = document.getElementById('lbCtr');       // "1 / 8" counter
  const prev    = document.querySelector('.lb-prev');      // ← arrow button
  const next    = document.querySelector('.lb-next');      // → arrow button

  // Fade transition: hide first, change the source, then show again
  img.style.opacity = '0';
  setTimeout(() => {
    img.src              = item.src;
    img.alt              = item.caption || '';
    img.style.transition = 'opacity 0.22s';
    img.style.opacity    = '1';
  }, 50); // 50ms delay lets the previous image fade out before the new one fades in

  caption.textContent = item.caption || ''; // update caption text

  // Hide arrows and counter when there is only one image
  const multiple = _lbItems.length > 1;
  counter.textContent = multiple ? `${_lbIdx + 1} / ${_lbItems.length}` : '';
  if (prev) prev.style.display = multiple ? 'flex' : 'none';
  if (next) next.style.display = multiple ? 'flex' : 'none';
}

/**
 * lbNav() — Navigate to the Next or Previous Image
 * ──────────────────────────────────────────────────
 * Called by Prev / Next arrow buttons and keyboard arrow keys.
 *
 * @param {number} direction — +1 for next image, -1 for previous image
 *
 * Circular navigation: pressing Next on the last image wraps back to the
 * first image (modulo arithmetic). Pressing Prev on the first image
 * wraps to the last image.
 */
function lbNav(direction) {
  // Circular navigation: (index + direction + total) % total
  _lbIdx = (_lbIdx + direction + _lbItems.length) % _lbItems.length;
  renderLb();
}

/**
 * closeLb() — Close the Lightbox
 * ────────────────────────────────
 * Called by the close button click, backdrop click, or the Escape key.
 * Resets internal state and unlocks body scroll.
 */
function closeLb() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true'); // tell screen readers the lightbox is now hidden
  // Only unlock body scroll if the category modal is NOT still open behind the lightbox.
  // If the user opened the lightbox from inside catModal, that modal is still open,
  // so scroll must remain locked until catModal itself is closed.
  if (!document.getElementById('catModal')?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
  _lbItems = [];                          // clear state
  _lbIdx   = 0;
}

/**
 * initLightbox() — Wire Up Lightbox Event Listeners
 * ───────────────────────────────────────────────────
 * Runs inside an IIFE so it executes only once when the DOM loads.
 *
 * Listeners:
 *   - Backdrop click (the lb element itself) → close
 *   - Close (X) button → close
 *   - Prev arrow → lbNav(-1)
 *   - Next arrow → lbNav(+1)
 *
 * Note: ArrowLeft / ArrowRight keyboard shortcuts live in main.js (initKeyboard).
 */
(function initLightbox() {
  const lb       = document.getElementById('lightbox');
  const closeBtn = lb?.querySelector('.lb-close'); // X button
  const prevBtn  = lb?.querySelector('.lb-prev');  // ← arrow
  const nextBtn  = lb?.querySelector('.lb-next');  // → arrow

  // Clicking the backdrop (the dark overlay) closes the lightbox.
  // e.target === lb ensures the click was on the backdrop, not on the image itself.
  lb?.addEventListener('click', e => { if (e.target === lb) closeLb(); });

  closeBtn?.addEventListener('click', closeLb);
  prevBtn?.addEventListener('click',  () => lbNav(-1));
  nextBtn?.addEventListener('click',  () => lbNav(1));
})();
