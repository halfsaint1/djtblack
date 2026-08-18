import Image from 'next/image';
import Link from 'next/link';
import { story } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';

export default function About() {
  return (
    <section id="story" className="relative isolate bg-charcoal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
      />

      <div className="shell py-20 md:py-24 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <div className="relative aspect-[5/6] overflow-hidden sm:aspect-[4/5]">
              <Image
                src={story.image}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 1024px) 92vw, 36vw"
                className="object-cover object-[center_14%]"
              />
            </div>
          </figure>

          <article className="lg:col-span-7 lg:border-l lg:border-line lg:pl-16">
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(1.45rem,3.4vw,2.5rem)]">{story.headline}</h2>
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

            <Link href={story.readMoreHref} className="text-link mt-12">
              {story.readMoreCta}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
