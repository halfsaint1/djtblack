import PlatformIcon, { type Platform } from '@/components/ui/PlatformIcon';

export type ChannelItem = {
  label: string;
  handle: string;
  href: string;
  platform: Platform;
};

type ChannelCardProps = {
  item: ChannelItem;
  variant?: 'featured' | 'standard' | 'social';
};

export default function ChannelCard({ item, variant = 'standard' }: ChannelCardProps) {
  const isFeatured = variant === 'featured';
  const isSocial = variant === 'social';

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'group relative flex flex-col justify-between overflow-hidden bg-charcoal',
        'transition-[background-color,box-shadow] duration-500 ease-out',
        'hover:bg-[#161411] hover:shadow-[inset_0_0_0_1px_rgba(184,146,85,0.22)]',
        isFeatured
          ? 'min-h-[10.5rem] p-5 sm:min-h-[11rem] sm:p-6 lg:col-span-2 lg:row-span-2 lg:min-h-full lg:p-7'
          : isSocial
            ? 'min-h-[7.5rem] p-5 sm:min-h-[8rem]'
            : 'min-h-[8.5rem] p-5 sm:min-h-[9rem] sm:p-6',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 0% 100%, rgba(184,146,85,0.12) 0%, transparent 62%)',
        }}
      />

      <span className="relative flex items-start justify-between gap-4">
        <span
          className={[
            'flex items-center justify-center border border-line text-ivory/75 transition-colors duration-300 group-hover:border-gold/45 group-hover:text-gold',
            isFeatured ? 'size-11 md:size-12' : 'size-10',
          ].join(' ')}
        >
          <PlatformIcon
            platform={item.platform}
            className={isFeatured ? 'size-5 md:size-6' : 'size-[1.15rem]'}
          />
        </span>

        <span
          aria-hidden="true"
          className="micro translate-x-1 text-ivory/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-gold"
        >
          ↗
        </span>
      </span>

      <span className="relative mt-auto pt-4">
        {isFeatured ? (
          <span className="micro mb-2 block text-gold/80">Full sets &amp; mixes</span>
        ) : null}
        <span
          className={[
            'display block text-ivory transition-colors duration-300 group-hover:text-gold',
            isFeatured
              ? 'text-[clamp(1.35rem,2.8vw,2.2rem)]'
              : isSocial
                ? 'text-[clamp(1rem,1.6vw,1.2rem)]'
                : 'text-[clamp(1.05rem,1.9vw,1.45rem)]',
          ].join(' ')}
        >
          {item.label}
        </span>
        <span className="mt-1 block text-[0.78rem] tracking-[0.06em] text-ivory/40 transition-colors duration-300 group-hover:text-ivory/58">
          {item.handle}
        </span>
      </span>
    </a>
  );
}
