/**
 * ════════════════════════════════════════════════
 *   FAQ ACCORDION COMPONENT
 *   File: js/components/faq.js
 *
 *   Handles the "accordion" behaviour in the FAQ section —
 *   clicking a question expands its answer, and all others collapse.
 *
 *   Features:
 *   ──────────
 *   - Click to expand / collapse answers
 *   - Only one answer open at a time (accordion style)
 *   - Keyboard support: Enter / Space to activate
 *   - Accessibility: role="button", tabindex, aria-expanded attributes
 *
 *   Expected HTML structure:
 *   ─────────────────────────
 *   <div class="faq-wrap">
 *     <div class="faq-item">
 *       <div class="faq-q">Question text</div>
 *       <div class="faq-a">Answer text</div>
 *     </div>
 *     ...
 *   </div>
 *
 *   An IIFE is used so that internal variables do not leak into the global scope.
 * ════════════════════════════════════════════════
 */

(function initFaq() {
  const faqWrap = document.querySelector('.faq-wrap');
  if (!faqWrap) return; // FAQ section is not on this page — do nothing

  /**
   * Click Handler — Using Event Delegation
   * ─────────────────────────────────────────
   * Instead of attaching a separate listener to every .faq-q element,
   * a single listener is placed on the .faq-wrap container.
   *
   * How it works:
   *   - No matter where the click happens, e.target.closest('.faq-q')
   *     determines whether the click landed on a .faq-q element.
   *   - If it did, toggle that item.
   *
   * Benefits of event delegation:
   *   - Better performance (1 listener instead of N)
   *   - Dynamically added FAQ items also work automatically
   */
  faqWrap.addEventListener('click', e => {
    const question = e.target.closest('.faq-q'); // handles clicks on child elements too
    if (!question) return; // click was not on a FAQ question

    const item   = question.parentElement;              // .faq-item (parent div)
    const isOpen = item.classList.contains('open');     // is this item currently open?

    // First close ALL open FAQ items (accordion: only one open at a time)
    faqWrap.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // If the clicked item was previously closed, open it now.
    // (If it was already open, the loop above already closed it — toggle effect.)
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true'); // notify screen readers
    }
  });

  /**
   * Keyboard Handler — Enter and Space Key Support
   * ─────────────────────────────────────────────────
   * For keyboard-only users (accessibility requirement).
   * The Tab key moves focus to .faq-q elements (via tabindex="0"),
   * then pressing Enter or Space simulates a click.
   *
   * Why e.preventDefault()?
   *   The Space key scrolls the page by default.
   *   We want Space to toggle the FAQ item, not scroll.
   */
  faqWrap.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return; // only handle Enter / Space
    const question = e.target.closest('.faq-q');
    if (question) {
      e.preventDefault(); // prevent the default Space scroll behaviour
      question.click();   // trigger a programmatic click (the handler above runs)
    }
  });

  /**
   * Set Initial ARIA Attributes
   * ─────────────────────────────
   * Static FAQ items in the HTML do not start with these attributes.
   * They are set via JavaScript so the HTML remains cleaner.
   *
   * role="button"          — tells screen readers this element is clickable
   * tabindex="0"           — includes it in keyboard Tab navigation
   * aria-expanded="false"  — tells screen readers this item starts collapsed
   */
  faqWrap.querySelectorAll('.faq-q').forEach(q => {
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    q.setAttribute('aria-expanded', 'false'); // all items start collapsed
  });
})();
