# Starrmount Solutions FZ-LLC website

Single-page marketing site built with React, Vite and TypeScript. Plain CSS, no backend.

## Run it

Requires Node.js 20 or newer.

```bash
npm install       # first time only
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the built dist/ locally to check it
```

## Where to edit content

| What | File |
| --- | --- |
| Products (names, descriptions, points, slideshow photos and captions) | `src/data/products.ts` |
| Product selected on page load | `defaultProductId` in `src/data/products.ts` |
| Partner brands (logos, links, captions, placeholder cards) | `src/data/partners.ts` |
| Phone, email, office address | `src/data/contact.ts` |
| About paragraph and the three "why choose us" cards | `src/components/About.tsx` |
| Hero heading and text | `src/components/Hero.tsx` |
| Colours, fonts, spacing | CSS variables at the top of `src/index.css` |
| Page title and meta description | `index.html` |

Images are served from `public/images/`. To add a photo, put the file there and reference its exact file name (spaces are fine) in the data file, with its pixel `width` and `height`.

**Logo:** `public/images/logo.png` is the original. The header uses `logo-header.png` (the same logo trimmed of white space, 192px tall) and the favicon uses `favicon.png` (the star mark, 192x192). If the logo changes, re-create those two files from the new original. If the header logo ever fails to load, a text wordmark is shown instead.

**Contact form:** each enquiry is emailed through [Web3Forms](https://web3forms.com) to the inbox linked to `contact.web3formsKey` in `src/data/contact.ts` (see `src/lib/enquiry.ts`). To send enquiries to a different address, request a new access key for it at web3forms.com and replace the key. Changing `contact.email` alone only changes the address shown on the site. While running `npm run dev`, each send attempt is logged in the terminal as `[enquiry] ...`.

## Deploy

Run `npm run build`, then upload the contents of `dist/` to any static host.

- **Netlify:** drag the `dist/` folder onto app.netlify.com/drop, or connect the repo with build command `npm run build` and publish directory `dist`.
- **Vercel:** import the repo; it detects Vite automatically (build `npm run build`, output `dist`).
- **Any other host (cPanel, S3, nginx, etc.):** copy everything inside `dist/` to the web root.

If the site will live in a sub-folder (e.g. `example.com/site/`), set `base: '/site/'` in `vite.config.ts` before building.
