/**
 * ════════════════════════════════════════════════
 *   RAMACHANDRA TRADERS — BUSINESS CONFIGURATION
 *   File: js/config/business.js
 *
 *   ✅ MAIN EDITABLE FILE — all contact information on the
 *      website is controlled from here.
 *
 *   Edit only this one file and the entire website updates:
 *     - Phone number and email in the footer
 *     - WhatsApp button links (in every section)
 *     - Google Maps link
 *     - Business hours
 *     - Stats section (years, families, products, rating)
 *
 *   Note: Some static text in index.html (hero section,
 *   Schema.org structured data) must be updated manually.
 * ════════════════════════════════════════════════
 */

const BUSINESS = {
  /* ── Basic Info ─────────────────────────────── */
  name:        'Ramachandra Traders',   // Business name (used in footer, page title)
  tagline:     'Premium Home Materials', // Tagline (reserved for future use)
  established:  2019,                   // Year established (used to calculate "6+ years")

  /* ── Contact ────────────────────────────────── */
  // phone: India format with country code, no spaces — used in tel: links
  phone:        '+916370419708',
  // phoneDisplay: human-readable format — shown visibly in the footer
  phoneDisplay: '+91 6370419708',
  // whatsapp: wa.me URL — all "Ask on WhatsApp" buttons are built from this
  // Format: https://wa.me/COUNTRYCODE+NUMBER (no +, no spaces, no dashes)
  whatsapp:     'https://wa.me/916370419708',
  // email: shown in the footer and used in mailto: links
  email:        'ramachandratraders2000@gmail.com',

  /* ── Location ───────────────────────────────── */
  address: {
    street:  'Tikiripada, Khandapada',  // Locality / street address
    city:    'Nayagarh',                // City
    state:   'Odisha',                  // State
    pin:     '752077',                  // PIN code
    country: 'India',
    // mapsUrl: "Get Directions" link in the footer — points to Google Maps
    // To update: open your location in Google Maps → Share → Copy link
    mapsUrl: 'https://maps.app.goo.gl/13dJgJC7shRFmD3y7',
  },

  /* ── Business Hours ─────────────────────────── */
  // hours: human-readable string displayed in the footer
  hours:  'Mon – Sun: 8:00 AM – 8:00 PM',
  // schema: machine-readable format used in Schema.org structured data in index.html
  // Format follows ISO 8601 — https://schema.org/openingHours
  schema: 'Mo-Su 08:00-20:00',

  /* ── Stats Section ──────────────────────────── */
  // These numbers appear in the "Our Numbers" section on the homepage.
  // Update them as the business grows.
  stats: {
    years:       '6+',    // years in business (since 2019)
    families:    '500+',  // number of families / homes served
    products:    '1500+', // approximate number of products in stock
    rating:      '4.7★',  // average customer rating (from Google Reviews or manual entry)
    reviewCount:  85,     // total review count (used in Schema.org aggregateRating)
  },
};
