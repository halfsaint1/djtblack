import { NextResponse } from 'next/server';
import { brand } from '@/lib/site';
import { bookingSummaryLines, normaliseBooking, validateBooking } from '@/lib/booking';

export const runtime = 'nodejs';

const RESEND_URL = 'https://api.resend.com/emails';
const MIN_FILL_MS = 3000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Best effort per server instance; the honeypot and fill time catch most bots.
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > RATE_MAX;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Bots fill the hidden "company" field or submit instantly. Pretend success.
  const startedAt = Number(body.startedAt);
  if (body.company || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later or message on WhatsApp.' },
      { status: 429 },
    );
  }

  const booking = normaliseBooking(body);
  const errors = validateBooking(booking);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Please check the highlighted fields.', errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[booking] RESEND_API_KEY is not set; enquiry not sent.');
    return NextResponse.json(
      { error: 'Online booking is temporarily unavailable.', fallback: true },
      { status: 503 },
    );
  }

  const to = process.env.BOOKING_TO_EMAIL || brand.email;
  const from = process.env.BOOKING_FROM_EMAIL || 'DJ TBLACK Website <onboarding@resend.dev>';
  const lines = bookingSummaryLines(booking);
  const subject = `Booking enquiry: ${booking.eventType}, ${lines.find(([l]) => l === 'Date')?.[1]} (${booking.name})`;

  const text = [
    'New booking enquiry from djtblack.com',
    '',
    ...lines.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    booking.message || '(none)',
    '',
    'Reply to this email to answer the client directly.',
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">New booking enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${lines
          .map(
            ([label, value]) =>
              `<tr><td style="color:#666;padding-right:16px">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:20px 0 6px;color:#666">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(booking.message || '(none)')}</p>
      <p style="margin:24px 0 0;color:#666;font-size:13px">Reply to this email to answer the client directly.</p>
    </div>`;

  try {
    const response = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: to.split(',').map((address) => address.trim()),
        reply_to: booking.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error('[booking] Resend error', response.status, await response.text());
      throw new Error('send failed');
    }
  } catch {
    return NextResponse.json(
      { error: 'Your enquiry could not be sent.', fallback: true },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
