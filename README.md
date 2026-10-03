# DJ TBLACK

Website for DJ TBLACK, built with Next.js (App Router), React, Tailwind CSS 4, GSAP and Lenis.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Booking form

The form in `components/sections/Booking.tsx` posts to `app/api/booking/route.ts`,
which emails each enquiry through [Resend](https://resend.com). The client's
address is set as reply-to, so replying to the email answers them directly.

1. Create a Resend account and an API key.
2. In Resend, add and verify the `djtblack.com` domain (DNS records at your
   domain registrar).
3. Set these environment variables in your host (see `.env.example`):
   - `RESEND_API_KEY`
   - `BOOKING_FROM_EMAIL`, e.g. `DJ TBLACK Website <bookings@djtblack.com>`
   - `BOOKING_TO_EMAIL` (optional, defaults to hello@djtblack.com)

Until the key is set, the form tells visitors to send the same details on
WhatsApp instead (one tap, message prefilled), so no enquiry is lost. Spam is
filtered with a hidden honeypot field, a minimum fill time and a per-IP rate
limit.

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
