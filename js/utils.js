/**
 * ════════════════════════════════════════════════
 *   RAMACHANDRA TRADERS — SHARED UTILITIES
 *   File: js/utils.js
 *
 *   Helper functions shared across multiple components.
 *   Kept in one place to avoid code duplication.
 *
 *   Load order: loaded FIRST in index.html (before all other JS files),
 *   because every component depends on these functions.
 * ════════════════════════════════════════════════
 */

/**
 * esc() — Escape HTML Special Characters
 * ────────────────────────────────────────
 * Any user-entered text must pass through this function before
 * being inserted directly into HTML.
 *
 * Why is this necessary?
 *   To prevent XSS (Cross-Site Scripting) attacks.
 *   If a user types <script>alert('hack')</script> in a review,
 *   this function converts it to safe text:
 *     &lt;script&gt;alert('hack')&lt;/script&gt;
 *   The browser renders it as visible text, not as executable code.
 *
 * @param {string} s — any string (user input, caption, name, etc.)
 * @returns {string}  — HTML-safe string that can be inserted into the DOM safely
 *
 * Example:
 *   esc('<b>Hello</b>')  →  '&lt;b&gt;Hello&lt;/b&gt;'
 */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')   // & must be replaced first to avoid double-encoding
    .replace(/</g, '&lt;')    // HTML tag opening bracket
    .replace(/>/g, '&gt;')    // HTML tag closing bracket
    .replace(/"/g, '&quot;'); // double-quotes inside HTML attributes
}

/**
 * starsHtml() — Generate SVG HTML for a Star Rating
 * ─────────────────────────────────────────────────────
 * Used to display star icons on review cards, the rating bar,
 * and the success screen after a review is submitted.
 *
 * How it works:
 *   - Loops from 1 to 5
 *   - Stars up to and including the rating are filled (gold colour)
 *   - Stars above the rating are dimmed (--line colour, grey)
 *
 * @param {number} rating — integer rating between 1 and 5
 * @returns {string} — HTML string containing 5 SVG star icons
 *
 * Example:
 *   starsHtml(4) → 4 gold stars + 1 grey star
 */
function starsHtml(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    // Dim any star that exceeds the rating value
    const dimmed = i > rating ? 'style="fill:var(--line)"' : '';
    html += `<svg class="star" viewBox="0 0 24 24" aria-hidden="true" ${dimmed}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`;
  }
  return html;
}

/**
 * formatDate() — Convert a Timestamp to a Readable Date String
 * ──────────────────────────────────────────────────────────────
 * Used on review cards to display dates such as "15 May 2026".
 * Uses India's date format (en-IN locale).
 *
 * @param {number} ts — JavaScript timestamp (milliseconds since Unix epoch)
 *                       e.g. from Date.now() or a value retrieved from localStorage
 * @returns {string} — human-readable date string such as "15 May 2026"
 *
 * Example:
 *   formatDate(1748000000000) → "23 May 2025"
 */
function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

/**
 * initials() — Generate 2-Letter Initials from a Name
 * ─────────────────────────────────────────────────────
 * Used to display an avatar circle on review cards.
 * When no user photo is available, the first two letters of the
 * user's name are shown in a coloured circle (e.g. "RK" for Ramesh Kumar).
 *
 * @param {string} name — the user's full name (e.g. "Ramesh Kumar")
 * @returns {string}    — up to 2 uppercase letters (e.g. "RK")
 *
 * Examples:
 *   initials("Ramesh Kumar")  → "RK"
 *   initials("Sita")          → "S"   (single word = 1 character)
 *   initials("  A B C  ")     → "AB"  (extra whitespace is handled)
 */
function initials(name) {
  return name.trim()
    .split(/\s+/)       // split on one or more whitespace characters
    .map(w => w[0])     // take the first letter of each word
    .join('')           // join them together
    .slice(0, 2)        // keep at most 2 characters
    .toUpperCase();     // convert to uppercase
}

/**
 * generateId() — Generate a Unique ID
 * ──────────────────────────────────────
 * Each new review receives a unique ID.
 * This ID is stored in localStorage and used later to locate
 * a specific review for editing or deletion.
 *
 * How it works:
 *   - Converts the current timestamp to base-36
 *   - Appends random characters
 *   - Result: a short unique string such as "m0tt2k8abc"
 *
 * @returns {string} — unique short ID (approximately 11 characters)
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * generateCode() — Generate a 6-Character Edit Code
 * ────────────────────────────────────────────────────
 * When a user submits a review, they receive a secret edit code.
 * They must enter this code later to edit or delete their review.
 *
 * The character set intentionally excludes confusing look-alike characters:
 *   - 0 and O  (zero and the letter O look identical in many fonts)
 *   - I and 1  (capital I and the digit 1 look identical)
 * Only clear, unambiguous characters are used: ABCDEFGHJKLMNPQRSTUVWXYZ23456789
 *
 * @returns {string} — 6-character uppercase code (e.g. "K7MR4X")
 */
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

/**
 * showToast() — Display a Brief Notification Message
 * ─────────────────────────────────────────────────────
 * A message slides up from the bottom of the screen
 * and disappears automatically after 3 seconds.
 *
 * Where it is used:
 *   - After a review is successfully edited:  "✅ Review updated!"
 *   - After a review is deleted:              "🗑️ Review deleted."
 *
 * How it works:
 *   - Creates a #rt div in the DOM on the first call
 *   - Reuses that same div on all subsequent calls
 *   - Uses CSS opacity transitions for the fade-in / fade-out effect
 *
 * @param {string} message — text to display (emojis are supported)
 */
function showToast(message) {
  // Reuse the existing toast element if it already exists in the DOM
  let toast = document.getElementById('rt');
  if (!toast) {
    // Create a new toast element and append it to the body
    toast = document.createElement('div');
    toast.id = 'rt';
    toast.setAttribute('role', 'status');       // semantic role for screen readers
    toast.setAttribute('aria-live', 'polite');  // screen readers will announce the message
    toast.style.cssText = [
      'position:fixed', 'bottom:80px', 'left:50%', 'transform:translateX(-50%)',
      'background:var(--dark)', 'color:var(--white)', 'padding:11px 22px',
      'border-radius:50px', 'font-size:0.86rem', 'z-index:9999',
      'box-shadow:var(--s3)', 'transition:opacity 0.3s', 'pointer-events:none',
    ].join(';');
    document.body.appendChild(toast);
  }
  toast.textContent   = message;
  toast.style.opacity = '1';
  // Start fading out after 3 seconds
  setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}
