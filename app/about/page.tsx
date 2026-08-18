import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import Eyebrow from '@/components/ui/Eyebrow';
import { brand, story } from '@/lib/site';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About Me',
  description:
    'Learn about DJ TBLACK. Lagos-born, Dubai-based. Afrobeats, amapiano, clubs, weddings, festivals and private events worldwide.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative isolate bg-charcoal pt-24 md:pt-28 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
        />

        <div className="shell pb-16 pt-10 md:pb-20 md:pt-12">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <figure className="lg:col-span-5">
              <div className="relative aspect-[5/6] overflow-hidden sm:aspect-[4/5]">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 36vw"
                  className="object-cover object-[center_14%]"
                  priority
                />
              </div>
            </figure>

            <article className="lg:col-span-7 lg:border-l lg:border-line lg:pl-16">
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <h1 className="display mt-5 text-[clamp(1.45rem,3.4vw,2.5rem)]">{story.headline}</h1>
              <p className="mt-7 max-w-[42ch] text-[1.08rem] leading-[1.65] text-ivory/88 md:text-[1.15rem]">
                {story.lead}
              </p>

              <div className="mt-8 max-w-[44ch] space-y-6">
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[0.98rem] leading-[1.85] text-ivory/65">
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="display mt-12 max-w-[44ch] text-[clamp(1rem,1.7vw,1.35rem)] tracking-[0.08em] text-gold">
                {story.closing}
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-8">
                <a href={`mailto:${brand.email}`} className="button-primary">
                  Hire DJ TBLACK
                </a>
                <Link href="/#story" className="text-link">
                  Back to home
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
