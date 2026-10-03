'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { brand } from '@/lib/site';
import {
  emptyBooking,
  eventTypes,
  validateBooking,
  whatsappBookingLink,
  type BookingErrors,
  type BookingInput,
} from '@/lib/booking';
import Eyebrow from '@/components/ui/Eyebrow';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function Field({
  id,
  label,
  optional,
  error,
  children,
  className = '',
}: {
  id: keyof BookingInput;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`booking-${id}`} className="micro mb-2 flex justify-between text-ivory/70">
        {label}
        {optional ? <span className="text-ivory/35">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`booking-${id}-error`} className="mt-2 text-[0.8rem] text-[#e08a6d]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Booking() {
  const [values, setValues] = useState<BookingInput>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [today, setToday] = useState('');
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setToday(now.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (status === 'sent' || status === 'error') statusRef.current?.focus();
  }, [status]);

  const update =
    (key: keyof BookingInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [key]: value }));
      if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
    };

  const describedBy = (key: keyof BookingInput) =>
    errors[key] ? { 'aria-invalid': true, 'aria-describedby': `booking-${key}-error` } : {};

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    ) as BookingInput;
    const found = validateBooking(trimmed);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`booking-${first}`)?.focus();
      return;
    }

    const company = (event.currentTarget.elements.namedItem('company') as HTMLInputElement)?.value;
    setStatus('sending');
    setServerError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...trimmed, company, startedAt: startedAt.current }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'Your enquiry could not be sent.');
      }
      setStatus('sent');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Your enquiry could not be sent.');
      setStatus('error');
    }
  }

  const whatsappLink = whatsappBookingLink(values);

  return (
    <section id="book" className="relative isolate bg-charcoal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
      />

      <div className="shell py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-4">
            <Eyebrow>Bookings</Eyebrow>
            <h2 className="display mt-4 text-[clamp(1.45rem,3.4vw,2.5rem)]">
              Book <span className="text-gold">the night.</span>
            </h2>
            <p className="body-copy mt-5 max-w-[36ch]">
              Tell me about the event and I will reply with availability and a quote, usually
              within a day.
            </p>

            <div className="mt-8 space-y-4 border-t border-line pt-6">
              <p className="micro text-gold">Prefer to talk?</p>
              <div className="space-y-1.5 text-sm text-ivory/65">
                <a className="block hover:text-ivory" href={brand.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp {brand.phone}
                </a>
                <a className="block hover:text-ivory" href={`tel:${brand.phoneHref}`}>
                  Call {brand.phone}
                </a>
                <a className="block hover:text-ivory" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>
              </div>
            </div>
          </header>

          <div className="lg:col-span-8">
            {status === 'sent' ? (
              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                className="border border-gold/40 bg-ink/60 p-8 outline-none md:p-10"
              >
                <p className="micro text-gold">Enquiry sent</p>
                <h3 className="display mt-4 text-[clamp(1.3rem,2.4vw,1.8rem)]">
                  Thank you, {values.name.split(' ')[0]}.
                </h3>
                <p className="body-copy mt-4">
                  Your enquiry is in. I will reply to {values.email} shortly. For anything urgent,
                  message me on WhatsApp.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link mt-8"
                >
                  Message on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
                {/* Honeypot: hidden from people, filled by bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="booking-company">Company</label>
                  <input id="booking-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <Field id="name" label="Your name" error={errors.name}>
                  <input
                    id="booking-name"
                    className="folio-field"
                    autoComplete="name"
                    value={values.name}
                    onChange={update('name')}
                    required
                    {...describedBy('name')}
                  />
                </Field>

                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="booking-email"
                    type="email"
                    className="folio-field"
                    autoComplete="email"
                    value={values.email}
                    onChange={update('email')}
                    required
                    {...describedBy('email')}
                  />
                </Field>

                <Field id="phone" label="Phone / WhatsApp" optional error={errors.phone}>
                  <input
                    id="booking-phone"
                    type="tel"
                    className="folio-field"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={update('phone')}
                    {...describedBy('phone')}
                  />
                </Field>

                <Field id="eventType" label="Type of event" error={errors.eventType}>
                  <select
                    id="booking-eventType"
                    className="folio-field"
                    value={values.eventType}
                    onChange={update('eventType')}
                    required
                    {...describedBy('eventType')}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="date" label="Event date" error={errors.date}>
                  <input
                    id="booking-date"
                    type="date"
                    className="folio-field"
                    min={today || undefined}
                    value={values.date}
                    onChange={update('date')}
                    required
                    {...describedBy('date')}
                  />
                </Field>

                <Field id="location" label="City / venue" error={errors.location}>
                  <input
                    id="booking-location"
                    className="folio-field"
                    placeholder="e.g. Dubai Marina"
                    value={values.location}
                    onChange={update('location')}
                    required
                    {...describedBy('location')}
                  />
                </Field>

                <Field id="guests" label="Number of guests" optional error={errors.guests}>
                  <input
                    id="booking-guests"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    className="folio-field"
                    value={values.guests}
                    onChange={update('guests')}
                    {...describedBy('guests')}
                  />
                </Field>

                <Field id="message" label="Tell me about the night" optional className="sm:col-span-2">
                  <textarea
                    id="booking-message"
                    rows={5}
                    className="folio-field resize-y"
                    placeholder="Timings, music you love, anything I should know."
                    value={values.message}
                    onChange={update('message')}
                    maxLength={2000}
                  />
                </Field>

                {status === 'error' ? (
                  <div
                    ref={statusRef}
                    tabIndex={-1}
                    role="alert"
                    className="border border-[#e08a6d]/50 p-4 text-sm text-ivory/80 outline-none sm:col-span-2"
                  >
                    {serverError} Your details are still here. Send them on WhatsApp instead, or email{' '}
                    <a className="underline" href={`mailto:${brand.email}`}>
                      {brand.email}
                    </a>
                    .
                  </div>
                ) : null}

                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[44ch] text-[0.78rem] leading-relaxed text-ivory/40">
                    Your details are only used to reply to this enquiry.
                  </p>
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={status === 'error' ? 'button-primary' : 'text-link'}
                    >
                      Send on WhatsApp
                    </a>
                    <button
                      type="submit"
                      className={status === 'error' ? 'text-link' : 'button-primary'}
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : 'Send enquiry'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
