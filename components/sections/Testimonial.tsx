import { voices } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Testimonial() {
  if (!voices.quotes.length) return null;

  return (
    <section id="reviews" className="relative isolate bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
      />

      <div className="shell py-14 md:py-16">
        <header data-reveal className="border-b border-line pb-6 md:pb-8">
          <Eyebrow>{voices.eyebrow}</Eyebrow>
          <h2 className="display mt-4 max-w-[24ch] text-[clamp(1.45rem,3.4vw,2.5rem)]">
            {voices.title}
          </h2>
        </header>

        <div className="mt-8 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {voices.quotes.map((item, index) => (
            <figure
              key={item.author}
              data-reveal
              data-reveal-delay={(index * 0.08).toFixed(2)}
              className="flex flex-col justify-between bg-charcoal p-6 sm:p-7"
            >
              <blockquote className="text-[1.02rem] leading-[1.75] text-ivory/80">
                <span aria-hidden="true" className="mr-1 text-gold">
                  “
                </span>
                {item.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-4">
                <span className="micro block text-ivory">{item.author}</span>
                <span className="mt-1 block text-[0.78rem] text-ivory/45">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {voices.credentials.map((credential) => (
            <li key={credential} className="micro bg-ink px-3 py-5 text-center text-ivory/55">
              {credential}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
