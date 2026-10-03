# DJ TBLACK

Website for DJ TBLACK, built with Next.js (App Router), React, Tailwind CSS 4, GSAP and Lenis.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Editing content

Almost all copy, links and contact details live in `lib/site.ts`:

- `brand`: email, phone and WhatsApp link.
- `shopUrl`: set it to the store URL to add "Shop" to the navigation.
- `voices.quotes`: real client reviews. The Reviews section and its nav link
  stay hidden while this list is empty.
- `nights`: the Events section.
- `channels`: social and streaming links. Only links that point to a real
  profile (not a platform home page) are listed for search engines.

SEO defaults (titles, descriptions, structured data) live in `lib/seo.ts`.
