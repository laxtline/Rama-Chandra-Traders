/**
 * ════════════════════════════════════════════════
 *   RAMACHANDRA TRADERS — SOCIAL MEDIA LINKS
 *   File: js/config/social-links.js
 *
 *   ✅ MAIN EDITABLE FILE — footer social media buttons
 *      are controlled entirely from here.
 *
 *   HOW TO UPDATE A LINK:
 *   ──────────────────────
 *   1. Open your social media profile
 *   2. Copy the profile URL (e.g. https://www.instagram.com/yourhandle/)
 *   3. Paste it next to the correct key below
 *   4. Refresh index.html — the button updates automatically
 *
 *   HOW TO HIDE A PLATFORM'S BUTTON:
 *   ──────────────────────────────────
 *   Set the value to an empty string: instagram: ''
 *   The button disappears from the footer automatically.
 *
 *   HOW TO ADD A NEW PLATFORM:
 *   ───────────────────────────
 *   1. Add a new key-value pair here (e.g. linkedin: 'https://...')
 *   2. In js/main.js, add a matching object inside the socialDefs array
 *      in buildFooterSocials() (with the SVG icon and CSS class).
 * ════════════════════════════════════════════════
 */

const SOCIAL_LINKS = {
  // Instagram — link to the @username profile page
  instagram: 'https://www.instagram.com/rama_chandra_traders/',

  // Facebook — profile or page URL
  facebook:  'https://www.facebook.com/profile.php?id=100085417466840',

  // YouTube — channel URL (@channelname format)
  youtube:   'https://www.youtube.com/@ramachandratraders',

  // X (formerly Twitter) — profile URL
  x:         'https://x.com/RC_Traders013',

  // Threads (Meta) — profile URL
  threads:   'https://www.threads.net/@ramachandratraders',

  // ── Reserved for future use (not currently active) ──
  // linkedin: '',   // LinkedIn page (useful for B2B outreach)
  // whatsapp: '',   // WhatsApp Channel (separate from BUSINESS.whatsapp)
};
