import { brand, channels, footer, nav } from '@/lib/site';
import Wordmark from '@/components/ui/Wordmark';
import PlatformIcon from '@/components/ui/PlatformIcon';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-ink">
      <div className="shell py-7 md:py-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-12 md:items-center md:gap-6">
          <div className="col-span-2 md:col-span-7">
            <Wordmark size="md" />
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-x-5 md:col-span-5">
            <nav aria-label="Footer">
              <p className="micro mb-2 text-gold">Navigate</p>
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    <a
                      className="text-sm text-ivory/60 hover:text-ivory"
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="micro mb-2 text-gold">Contact</p>
              <div className="space-y-1 text-sm text-ivory/60">
                <a className="block hover:text-ivory" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>
                <a className="block hover:text-ivory" href={`tel:${brand.phoneHref}`}>
                  {brand.phone}
                </a>
                <a
                  className="block hover:text-ivory"
                  href={brand.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
              <nav aria-label="Social" className="mt-4 flex flex-wrap gap-2">
                {channels.socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex size-9 items-center justify-center border border-line text-ivory/50 transition-colors duration-300 hover:border-gold/45 hover:text-gold"
                  >
                    <PlatformIcon platform={item.platform} className="size-[0.95rem]" />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="micro">{footer.copyright}</p>
          <a className="micro hover:text-gold" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
