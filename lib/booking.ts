import { brand, services } from '@/lib/site';

export const eventTypes = [...services.items.map((item) => item.title), 'Other'];

export type BookingInput = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  location: string;
  guests: string;
  message: string;
};

export const emptyBooking: BookingInput = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  date: '',
  location: '',
  guests: '',
  message: '',
};

export type BookingErrors = Partial<Record<keyof BookingInput, string>>;

const limits: Record<keyof BookingInput, number> = {
  name: 100,
  email: 200,
  phone: 40,
  eventType: 40,
  date: 10,
  location: 150,
  guests: 6,
  message: 2000,
};

/** Trims every field to a string within its length limit. */
export function normaliseBooking(raw: unknown): BookingInput {
  const source = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const result = { ...emptyBooking };
  for (const key of Object.keys(emptyBooking) as (keyof BookingInput)[]) {
    const value = source[key];
    result[key] = typeof value === 'string' ? value.trim().slice(0, limits[key]) : '';
  }
  return result;
}

/** Shared by the form and the API route so both enforce the same rules. */
export function validateBooking(input: BookingInput): BookingErrors {
  const errors: BookingErrors = {};

  if (input.name.length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (input.phone && !/^[+\d][\d\s().-]{6,}$/.test(input.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!eventTypes.includes(input.eventType)) errors.eventType = 'Please choose the type of event.';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || Number.isNaN(Date.parse(input.date))) {
    errors.date = 'Please choose the event date.';
  } else {
    // Allow "today" in any timezone by comparing against yesterday (UTC).
    const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    if (input.date < yesterday) errors.date = 'The event date is in the past.';
  }

  if (input.location.length < 2) errors.location = 'Please tell us the city or venue.';
  if (input.guests && !/^\d{1,6}$/.test(input.guests)) {
    errors.guests = 'Please enter a number.';
  }

  return errors;
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function bookingSummaryLines(input: BookingInput) {
  return [
    ['Name', input.name],
    ['Email', input.email],
    ['Phone', input.phone],
    ['Event', input.eventType],
    ['Date', input.date ? formatDate(input.date) : ''],
    ['City / venue', input.location],
    ['Guests', input.guests],
  ].filter(([, value]) => value) as [string, string][];
}

/** A prefilled WhatsApp chat, so a booking can be sent without email. */
export function whatsappBookingLink(input: BookingInput) {
  const lines = [
    'Hi DJ TBLACK, I would like to check your availability.',
    '',
    ...bookingSummaryLines(input).map(([label, value]) => `${label}: ${value}`),
    ...(input.message ? ['', input.message] : []),
  ];
  return `${brand.whatsappHref}?text=${encodeURIComponent(lines.join('\n'))}`;
}
