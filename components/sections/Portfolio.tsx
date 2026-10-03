import Image from 'next/image';
import { brand, nights } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Portfolio() {
  const [lead, accent] = nights.title;

  return (
    <section id="nights" className="relative isolate bg-charcoal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
      />

      <div className="shell py-14 md:py-16">
        <div className="grid gap-5 border-b border-line pb-6 md:grid-cols-12 md:items-end md:gap-6 md:pb-8">
          <header data-reveal className="md:col-span-7">
            <Eyebrow>{nights.eyebrow}</Eyebrow>
            <h2 className="display mt-4 text-[clamp(1.45rem,3.4vw,2.5rem)]">
              {lead} <span className="text-gold">{accent}</span>
            </h2>
          </header>
          <p
            data-reveal
            className="body-copy max-w-[36ch] md:col-span-5 md:justify-self-end md:text-right md:text-pretty"
          >
            {nights.intro}
          </p>
        </div>

        <ol>
          {nights.items.map((night, index) => (
            <li
              key={night.title}
              className="grid gap-6 border-b border-line py-10 md:py-12 lg:grid-cols-12 lg:items-center lg:gap-10"
            >
              <div
                data-mask
                className={`relative aspect-[16/10] overflow-hidden bg-ink lg:col-span-6 ${
                  index % 2 ? 'lg:col-start-7' : ''
                }`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={night.image}
                    alt={night.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/20" />
                </div>
              </div>

              <article
                data-reveal
                className={`lg:col-span-5 ${
                  index % 2 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <span className="micro text-gold">{night.number}</span>
                  <span className="micro">{night.type}</span>
                </div>
                <h3 className="display mt-6 text-[clamp(1.35rem,2.6vw,2rem)]">{night.title}</h3>
                <p className="micro mt-4 text-ivory/60">{night.flow}</p>
                <p className="body-copy mt-5 max-w-[44ch] text-pretty">{night.story}</p>
                <a href={`mailto:${brand.email}`} className="text-link mt-7">
                  {nights.cta}
                </a>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
