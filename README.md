# Ramachandra Traders — Website

Single-page website for **Ramachandra Traders**, a building-material, electrical
and hardware shop at Tikiripada, Khandapada, Nayagarh, Odisha.

Plain HTML + CSS + vanilla JavaScript. No framework, no build step, no backend.
Open `index.html` and the site works.

---

## 1. Business details

| Detail | Value |
|---|---|
| Business | Ramachandra Traders |
| Type | Building materials · Electricals · Hardware |
| Established | 2019 |
| Address | Tikiripada, Khandapada, Nayagarh — 752077, Odisha |
| Phone | +91 63704 19708 |
| WhatsApp | [wa.me/916370419708](https://wa.me/916370419708) |
| Email | ramachandratraders2000@gmail.com |
| Hours | Monday – Sunday, 8:00 AM – 8:00 PM |
| Google rating | 4.7 / 5 from 85 reviews |
| Google Maps | [Open in Maps](https://maps.app.goo.gl/13dJgJC7shRFmD3y7) |

### Categories and brands

| Category | Brands |
|---|---|
| Tiles | Kajaria, Johnson Tiles |
| Paints | Berger, Birla Opus |
| Electrical | V-Guard, Jaquar, Great White, Pride |
| Pipes & Sanitary | Jaquar, CERA, Finolex |
| Interiors | Wooden flooring, balcony fittings, jhumar lighting |

### Social links

Instagram · Facebook · YouTube · X · Threads — URLs live in
`js/config/social-links.js` and are rendered in the footer.

---

## 2. Design

The site is styled like a real local signboard shop, not a generic template:

- **Colours:** deep green `#0E4A2F`, warm yellow `#F2B31C`, cream `#FAF6EC`
- **Fonts:** Poppins (headings), Inter (body), Noto Sans Oriya (Odia reviews)
- **Layout:** topbar → navbar → storefront hero with shop facts → products →
  brands → about + services + shop card → reviews → FAQ → contact/map → footer
- **Mobile:** sticky Call / WhatsApp bar, compact product rows, single-column sections

All copy and numbers come from existing business data. There are no invented
projects, awards or photo galleries.

---

## 3. File structure

```
Rama_Chandra_Traders/
├── index.html                  Whole page: markup + copy + SEO/JSON-LD
├── css/
│   └── styles.css              Design tokens, sections, responsive rules
├── js/
│   ├── config/
│   │   ├── business.js         Phone, WhatsApp, address, hours, stats
│   │   ├── social-links.js     Social profile URLs
│   │   └── category-media.js   Category → brand images + captions
│   ├── utils.js                esc(), initials(), etc.
│   ├── components/
│   │   ├── navbar.js           Sticky nav, mobile menu
│   │   ├── categories.js       Product cards + brand modal
│   │   ├── brands.js           "Brands & ranges" list
│   │   ├── lightbox.js         Full-size image viewer
│   │   └── faq.js              FAQ accordion
│   └── main.js                 Boots everything on DOMContentLoaded
├── assets/
│   ├── logo/                   logo-160.webp + 180/192/512 icons
│   ├── about/showroom.webp     Hero shop-front image
│   ├── banner/banner.webp      Wide shop board
│   ├── banner/og-1200x630.jpg  Social share image (Open Graph / Twitter)
│   └── categories/             Brand images (WebP), one folder per category
├── .gitignore                  Legacy files and originals kept out of the repo
├── site.webmanifest            PWA metadata + 192/512 icons
├── robots.txt
├── sitemap.xml
└── README.md
```

### How the page is assembled

```
config (data)  →  components (build DOM)  →  main.js (init on load)
```

Script order in `index.html` matters:

1. `business.js`, `social-links.js`, `category-media.js`
2. `utils.js`
3. `navbar.js`, `lightbox.js`, `categories.js`, `brands.js`, `faq.js`
4. `main.js`

---

## 4. Editing content

### Phone, address, hours, stats
Edit `js/config/business.js`. Phone and footer values update automatically.
Also update the Schema.org block in `index.html <head>` if the number or
address changes.

### Add or change a brand
1. Put the image in the matching folder, e.g. `assets/categories/tiles/BRAND.webp`
2. Add a line in `js/config/category-media.js`:

```js
{ src: 'assets/categories/tiles/BRAND.webp', caption: 'Brand Name' },
```

3. Refresh. The card cover (first item), the brand modal and the "Brands &
   ranges" list all update from this one entry.

Recommended image: square, 1100×1100, WebP quality ~80. Keep under ~150 KB.

### Change social links
Edit `js/config/social-links.js`. Set a value to `""` to hide that button.

### Edit the six customer reviews
They are static HTML inside the Reviews section of `index.html`. There is no
review submission form and no localStorage — reviews are curated content.
The rating box links to the shop's Google listing.

### Replace the shop photos
- Hero: `assets/about/showroom.webp`
- Signboard: `assets/banner/banner.webp`

Keep the same aspect ratios (4:3 and 5:2) or update
`width`/`height` in `index.html` and the matching `aspect-ratio` in `styles.css`.

> The current hero and banner are illustrative images. Replace them with real
> photos of the shop and staff when available — real photos are the single
> biggest authenticity win for a local business site.

### Change cache-busting versions
CSS/JS links use `?v=N`. After editing `styles.css` or any component, bump that
file's `?v=` value in `index.html` so browsers fetch the new version.

---

## 5. Run and deploy

```bash
# any static server works
python -m http.server 3000
# open http://localhost:3000
```

Deploy by uploading the folder to Netlify, Vercel, GitHub Pages, Cloudflare
Pages or cPanel — no build command needed.

> **Do not upload everything in this directory.** `rockstargames-vi/` is a
> separate project, and the legacy folders in §8 are not part of this site.
> Upload only `index.html`, `css/`, `js/`, `assets/`, `site.webmanifest`,
> `robots.txt`, `sitemap.xml` and `README.md`.

If the domain changes, update `canonical`, `og:url`, the JSON-LD `url`, and
`sitemap.xml`.

---

## 6. Performance notes

- Category, hero and banner images are **WebP**. Original PNG/JPG files stay on
  the local machine and are not committed; the site only requests `.webp`.
- Every non-hero image uses `loading="lazy"`.
- Logo is served at 160 px for the header, with 192/512 px PWA icons.
- Total first-load transfer is roughly **1.3 MB** including Google Fonts.
- Fonts are the only third-party request.

To compress a new image:

```bash
python -c "from PIL import Image; im=Image.open('in.png').convert('RGB'); im.save('out.webp','WEBP',quality=80,method=6)"
```

---

## 7. SEO, PWA and accessibility

- Title, meta description/keywords, canonical, Open Graph + Twitter card tags,
  `HardwareStore` and `FAQPage` JSON-LD, `robots.txt`, `sitemap.xml`.
- PWA manifest with 192/512 icons, shortcuts for Products, Brands, Call,
  WhatsApp and Directions.
- Skip link, ARIA labels, keyboard support for cards/modals/lightbox, `Escape`
  to close, visible focus rings, `prefers-reduced-motion` support.
- Google Maps is embedded in the Contact section; the address card and
  "Open in Maps" link still work if the iframe is blocked.

---

## 8. Legacy files (not in the repo)

These belong to an earlier version of the site and are no longer referenced by
`index.html`. They are listed in `.gitignore`, so they stay on the local machine
but are not published to GitHub:

```
js/components/ticker.js
js/components/media-grids.js
js/components/reviews.js
js/config/gallery-media.js
js/config/projects-media.js
js/config/achievements-media.js
assets/gallery/       (placeholder photos, 3 unique images repeated)
assets/projects/      (placeholder photos)
assets/achievements/  (placeholder photos)
assets/banner/background.jpg
```

They are safe to delete from the local folder once you have a backup.

---

*Plain HTML, CSS and JavaScript. No frameworks, no build tools.*
