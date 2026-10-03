'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { brand, nav } from '@/lib/site';
import Wordmark from '@/components/ui/Wordmark';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          scrolled ? 'border-b border-line bg-ink/95' : 'bg-transparent'
        }`}
      >
        <div
          className={`shell hidden transition-[height] duration-200 lg:grid ${
            scrolled
              ? 'h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center'
              : 'h-36 grid-cols-1 place-items-center content-center gap-5'
          }`}
        >
          <Wordmark
            size={scrolled ? 'compact' : 'sm'}
            className={scrolled ? 'justify-self-start' : 'justify-self-center'}
          />

          <nav
            aria-label="Primary"
            className={scrolled ? 'col-start-2 row-start-1' : 'row-start-2'}
          >
            <ul className="flex items-center gap-8 xl:gap-10">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="py-3 text-[0.875rem] font-semibold uppercase tracking-[0.16em] text-ivory/70 transition-colors duration-200 hover:text-ivory"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="shell flex h-20 items-center justify-between lg:hidden">
          <Wordmark />
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex size-11 flex-col items-center justify-center gap-1.5"
          >
            <span className="h-px w-6 bg-ivory" />
            <span className="h-px w-4 bg-ivory" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-ink lg:hidden"
          >
            <div className="shell flex h-20 items-center justify-between">
              <Wordmark />
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="relative size-11"
              >
                <span className="absolute left-2.5 top-1/2 h-px w-6 rotate-45 bg-ivory" />
                <span className="absolute left-2.5 top-1/2 h-px w-6 -rotate-45 bg-ivory" />
              </button>
            </div>

            <div className="shell flex min-h-[calc(100dvh-5rem)] flex-col justify-between py-12">
              <nav aria-label="Mobile">
                <ul>
                  {nav.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                      className="border-b border-line"
                    >
                      <a
                        href={item.href}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        onClick={() => setOpen(false)}
                        className="display flex items-baseline gap-5 py-5 text-[clamp(2.7rem,13vw,5.5rem)]"
                      >
                        <span className="micro text-gold">0{index + 1}</span>
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-12 flex flex-col gap-2 text-sm text-ivory/60">
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
                <a href={`tel:${brand.phoneHref}`}>{brand.phone}</a>
                <a href={brand.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                <span className="micro mt-4">{brand.base}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
