/**
 * ════════════════════════════════════════════════
 *   NAVBAR COMPONENT
 *   File: js/components/navbar.js
 *
 *   This file handles the complete behaviour of the navigation bar:
 *     1. Changing the navbar shadow/style when the user scrolls
 *     2. Opening and closing the hamburger menu on mobile
 *     3. Closing the menu when a menu link is clicked
 *     4. Closing the menu when the user clicks outside it
 *
 *   An IIFE (Immediately Invoked Function Expression) is used so that
 *   internal variables do not pollute the global scope.
 *   i.e. nav, hamburger, mobNav are only accessible inside this function.
 * ════════════════════════════════════════════════
 */

(function initNavbar() {
  // Grab element references once — avoids repeated querySelector calls
  const nav       = document.getElementById('nav');       // main <nav> element
  const hamburger = document.getElementById('hamburger'); // ☰ button (mobile)
  const mobNav    = document.getElementById('mobNav');    // mobile dropdown menu
  const mobLinks  = mobNav ? mobNav.querySelectorAll('a') : []; // links inside mobile menu

  /**
   * Scroll Shadow Effect
   * ─────────────────────
   * When the user scrolls more than 40px, add the 'scrolled' class to the navbar.
   * In CSS, the .scrolled class gives the navbar a shadow and an opaque background.
   *
   * { passive: true } — tells the browser this listener will never call
   * preventDefault(), so the browser can scroll more smoothly.
   */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /**
   * toggleMenu() — Open / Close the Hamburger Menu
   * ─────────────────────────────────────────────────
   * @param {boolean} forceClose — when true, always closes the menu
   *                               without checking whether it is currently open
   *
   * What it does:
   *   - Toggles the 'open' class on the hamburger button (for the X icon)
   *   - Toggles the 'open' class on mobNav (for the slide-down animation)
   *   - Updates the aria-expanded attribute (for screen readers)
   */
  function toggleMenu(forceClose = false) {
    const isOpen     = hamburger.classList.contains('open');
    const shouldOpen = forceClose ? false : !isOpen; // if forceClose, always close
    hamburger.classList.toggle('open', shouldOpen);
    mobNav.classList.toggle('open', shouldOpen);
    hamburger.setAttribute('aria-expanded', String(shouldOpen)); // accessibility
  }

  // Toggle the menu on click, and also on keyboard activation of the hamburger button
  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());
    // Also works with Enter or Space key (accessibility requirement)
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
    });
  }

  /**
   * Mobile Menu Link Click Handler
   * ────────────────────────────────
   * When the user clicks a link inside the mobile menu (e.g. #about, #products),
   * close the menu automatically.
   * Without this, the menu would stay open while the page scrolls to that section.
   */
  mobLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true)); // forceClose = true
  });

  /**
   * Outside Click — Close the Menu
   * ────────────────────────────────
   * If the mobile menu is open and the user clicks anywhere outside it,
   * close the menu.
   *
   * nav.contains(e.target) — checks whether the click happened inside the nav.
   * If the click was inside the nav (on a button or link), this code does nothing
   * because the listeners above already handle those cases.
   */
  document.addEventListener('click', e => {
    if (mobNav?.classList.contains('open') &&
        !nav.contains(e.target)) {  // click was outside the nav
      toggleMenu(true);             // close the menu
    }
  });
})(); // IIFE — executes immediately, global scope stays clean
