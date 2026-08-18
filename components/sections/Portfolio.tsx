import Image from 'next/image';
import { brand, nights } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Portfolio() {
  return (
    <section id="nights" className="bg-ink">
      <div className="shell section-space">
        <div className="grid gap-8 border-b border-line pb-14 lg:grid-cols-12 lg:items-end">
          <div data-reveal className="lg:col-span-8">
            <Eyebrow>{nights.eyebrow}</Eyebrow>
            <h2 className="display display-lg mt-7 max-w-[10ch] text-balance">
              Proof lives on <span className="accent-italic text-gold">the floor.</span>
            </h2>
          </div>
          <p data-reveal className="body-copy text-pretty lg:col-span-4">
            {nights.intro}
          </p>
        </div>

        <ol>
          {nights.items.map((night, index) => (
            <li
              key={night.title}
              className="grid gap-8 border-b border-line py-12 md:py-16 lg:grid-cols-12 lg:items-center"
            >
              <div
                data-mask
                className={`relative aspect-[4/3] overflow-hidden bg-charcoal lg:col-span-6 ${
                  index % 2 ? 'lg:col-start-7' : ''
                }`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={night.image}
                    alt={night.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/15" />
                </div>
              </div>

              <article
                data-reveal
                className={`lg:col-span-5 ${
                  index % 2 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'
                }`}
              >
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="micro text-gold">{night.number}</span>
                  <span className="micro">
                    {night.place} · {night.year}
                  </span>
                </div>
                <h3 className="display mt-7 text-[clamp(2.4rem,4.5vw,5rem)] leading-[0.92]">
                  {night.title}
                </h3>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                  <span className="micro text-ivory/70">{night.type}</span>
                  <span className="micro text-ivory/70">{night.audience}</span>
                </div>
                <p className="body-copy mt-6 text-pretty">{night.story}</p>
                <a href={`mailto:${brand.email}`} className="text-link mt-8">
                  Plan a night like this
                </a>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
