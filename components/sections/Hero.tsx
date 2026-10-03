'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { brand, hero } from '@/lib/site';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden bg-ink">
      {/* A single cinematic plate, composed like the reference but built
          specifically around TBLACK's transparent portrait. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute left-1/2 top-8 h-[90%] w-[min(1580px,148vw)] -translate-x-1/2 md:top-12 md:h-[92%]"
          style={{
            background:
              'radial-gradient(ellipse 58% 54% at 50% 43%, rgba(77,45,22,0.38) 0%, rgba(30,20,13,0.3) 42%, rgba(7,6,5,0) 76%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute left-1/2 top-8 h-[90%] w-[min(1500px,148vw)] -translate-x-1/2 md:top-12 md:h-[92%]"
          style={{
            maskImage:
              'radial-gradient(ellipse 53% 61% at 50% 46%, #000 40%, rgba(0,0,0,0.92) 57%, rgba(0,0,0,0.34) 74%, transparent 91%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 53% 61% at 50% 46%, #000 40%, rgba(0,0,0,0.92) 57%, rgba(0,0,0,0.34) 74%, transparent 91%)',
          }}
        >
          <Image
            src="/images/tblack-portrait.png"
            alt={`${brand.name}, ${brand.role} based in ${brand.base}`}
            fill
            priority
            sizes="(max-width: 768px) 148vw, 1500px"
            className="object-contain object-center"
          />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-linear-to-t from-ink via-ink/88 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[22%] bg-linear-to-r from-ink to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[22%] bg-linear-to-l from-ink to-transparent" />
      </div>

      <div className="shell relative z-10 flex min-h-[100dvh] flex-col items-center justify-end pb-3 pt-36 text-center md:pb-5 md:pt-44">
        <h1 className="font-hero w-full max-w-none translate-y-8 text-[clamp(2.4rem,6.4vw,5.4rem)] font-normal uppercase leading-[0.9] tracking-[0.06em] text-ivory">
          {hero.title.map((line, index) => (
            <span key={line} className="block overflow-hidden whitespace-nowrap pb-[0.03em]">
              <motion.span
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.45 + index * 0.11,
                  ease: 'easeOut',
                }}
                className={`block ${
                  index === 1
                    ? 'mt-3 text-[clamp(0.9rem,2.3vw,1.35rem)] tracking-[0.42em] text-gold'
                    : ''
                }`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.02, ease: 'easeOut' }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5 md:mt-12"
        >
          <a
            href={`mailto:${brand.email}`}
            className="button-primary !min-h-14 !px-8 !text-[0.78rem] !font-extrabold !tracking-[0.16em]"
          >
            {hero.primaryCta}
          </a>
          <a href="#channels" className="text-link !text-[0.78rem] !tracking-[0.16em] !gap-3 after:!w-11">
            {hero.secondaryCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
