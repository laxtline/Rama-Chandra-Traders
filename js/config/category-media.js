/**
 * ════════════════════════════════════════════════
 *   BUSINESS CATEGORIES — MEDIA CONFIG
 *   File: js/config/category-media.js
 * ════════════════════════════════════════════════
 *
 *  Each category has its own folder:
 *
 *    assets/categories/tiles/
 *    assets/categories/paints/
 *    assets/categories/electrical/
 *    assets/categories/interiors/
 *    assets/categories/pipes-sanitary/
 *
 *  HOW TO ADD A NEW BRAND:
 *  ────────────────────────
 *  1. Place the brand logo image in the correct category folder
 *  2. Add an entry in the matching category array below
 *  3. Refresh index.html — done!
 *
 *  NOTE: The first entry in each category also becomes the cover
 *        thumbnail shown on the category card on the homepage.
 * ════════════════════════════════════════════════
 */

const CATEGORY_MEDIA = {

  /* ── TILES ─────────────────────────────────────
     Folder: assets/categories/tiles/            */
  tiles: [
    { src: 'assets/categories/tiles/KAJARIA.webp',  caption: 'Kajaria Tiles' },
    { src: 'assets/categories/tiles/JHONSHON.webp', caption: 'Johnson Tiles' },
    // { src: 'assets/categories/tiles/tile3.jpg', caption: 'New Brand'      },
  ],

  /* ── PAINTS ──────────────────────────────────────
     Folder: assets/categories/paints/           */
  paints: [
    { src: 'assets/categories/paints/BERGER.webp',     caption: 'Berger Paints' },
    { src: 'assets/categories/paints/BIRLA_OPUS.webp', caption: 'Birla Opus'    },
    // { src: 'assets/categories/paints/paint3.jpg',  caption: 'New Brand'     },
  ],

  /* ── ELECTRICAL ───────────────────────────────────
     Folder: assets/categories/electrical/       */
  electrical: [
    { src: 'assets/categories/electrical/V-GUARD.webp',         caption: 'V-Guard'     },
    { src: 'assets/categories/electrical/JAQUAR_ELECTRIC.webp', caption: 'Jaquar'      },
    { src: 'assets/categories/electrical/GREAT_WHITE.webp',     caption: 'Great White' },
    { src: 'assets/categories/electrical/PRIDE.webp',           caption: 'Pride'       },
    // { src: 'assets/categories/electrical/elec5.jpg', caption: 'New Brand'   },
  ],

  /* ── PIPES & SANITARY ─────────────────────────────
     Folder: assets/categories/pipes-sanitary/  */
  'pipe sanitary': [
    { src: 'assets/categories/pipes-sanitary/JAQUAR_PIPES_SANITARY.webp', caption: 'Jaquar'  },
    { src: 'assets/categories/pipes-sanitary/CERA.webp',                  caption: 'CERA'    },
    { src: 'assets/categories/pipes-sanitary/FINOLEX.webp',               caption: 'Finolex' },
    // { src: 'assets/categories/pipes-sanitary/pipes4.jpg', caption: 'New Brand' },
  ],

  /* ── INTERIORS ────────────────────────────────────
     Folder: assets/categories/interiors/       */
  interiors: [
    { src: 'assets/categories/interiors/WOODEN.webp',  caption: 'Wooden Flooring' },
    { src: 'assets/categories/interiors/BALCONY.webp', caption: 'Balcony'         },
    { src: 'assets/categories/interiors/JHUMAR.webp',  caption: 'Lighting'        },
    // { src: 'assets/categories/interiors/int4.jpg', caption: 'New Brand'       },
  ],

};
