import { services } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import ServiceIcon from '@/components/ui/ServiceIcon';

export default function Services() {
  return (
    <section id="services" className="relative isolate bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
      />

      <div className="shell py-14 md:py-16">
        <div className="grid gap-5 border-b border-line pb-6 md:grid-cols-12 md:items-end md:gap-6 md:pb-8">
          <header className="md:col-span-7">
            <Eyebrow>{services.eyebrow}</Eyebrow>
            <h2 className="display mt-4 text-[clamp(1.45rem,3.4vw,2.5rem)]">{services.headline}</h2>
          </header>
          <p className="body-copy max-w-[36ch] md:col-span-5 md:justify-self-end md:text-right md:text-pretty">
            {services.lead}
          </p>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
          {services.items.map((item) => (
            <div
              key={item.title}
              className="group bg-charcoal p-5 transition-[background-color,box-shadow] duration-300 hover:bg-[#161411] hover:shadow-[inset_0_0_0_1px_rgba(184,146,85,0.22)] sm:p-6"
            >
              <dt className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center border border-line text-ivory/35 transition-colors duration-300 group-hover:border-gold/35 group-hover:text-gold">
                  <ServiceIcon name={item.icon} className="size-4" />
                </span>
                <span className="display text-[clamp(1rem,1.7vw,1.25rem)] text-ivory transition-colors duration-300 group-hover:text-gold">
                  {item.title}
                </span>
              </dt>
              <dd className="mt-3 max-w-[34ch] pl-12 text-[0.9rem] leading-[1.65] text-ivory/55 transition-colors duration-300 group-hover:text-ivory/70">
                {item.summary}
              </dd>
            </div>
          ))}
        </dl>

        <a href="#book" className="text-link mt-8">
          {services.cta}
        </a>
      </div>
    </section>
  );
}
