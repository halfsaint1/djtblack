import Image from 'next/image';
import { voices } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Testimonial() {
  return (
    <section id="reviews" className="bg-ivory text-ink">
      <div className="shell section-space">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div data-reveal className="lg:sticky lg:top-28">
              <Eyebrow>{voices.eyebrow}</Eyebrow>
              <h2 className="display display-md mt-7 max-w-[9ch] text-balance">
                What remains after the <span className="accent-italic text-gold">last record.</span>
              </h2>
              <div className="relative mt-12 aspect-[4/3] max-w-sm overflow-hidden">
                <Image
                  src={voices.image}
                  alt={voices.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 30vw"
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-black/15">
              {voices.quotes.map((item, index) => (
                <figure
                  key={item.author}
                  data-reveal
                  data-reveal-delay={(index * 0.08).toFixed(2)}
                  className="border-b border-black/15 py-10 md:py-14"
                >
                  <span aria-hidden="true" className="accent-italic text-4xl text-gold">
                    “
                  </span>
                  <blockquote className="display mt-3 text-balance text-[clamp(1.75rem,3.2vw,3.6rem)] leading-[1.05]">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-xs font-bold uppercase tracking-[0.16em]">{item.author}</span>
                    <span className="text-xs text-black/50">— {item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-px bg-black/15 md:grid-cols-4">
              {voices.credentials.map((credential) => (
                <li
                  key={credential}
                  className="bg-ivory px-3 py-5 text-center text-[0.58rem] font-bold uppercase tracking-[0.18em] text-black/55"
                >
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
