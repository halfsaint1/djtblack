import Link from 'next/link';
import Image from 'next/image';

export default function Wordmark({
  className = '',
  size = 'sm',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'compact';
}) {
  const scale =
    size === 'lg'
      ? 'w-[min(88vw,42rem)]'
      : size === 'md'
        ? 'w-44 md:w-72'
        : size === 'compact'
          ? 'w-28 md:w-36'
          : 'w-44 md:w-64';

  return (
    <Link
      href="/#top"
      aria-label="DJ TBLACK, home"
      className={`inline-flex shrink-0 ${scale} ${className}`}
    >
      <Image
        src="/images/tblack-logo.png"
        alt="DJ TBLACK — The Vibe Master"
        width={811}
        height={250}
        priority={size === 'sm'}
        sizes={size === 'lg' ? '(max-width: 768px) 88vw, 672px' : '(max-width: 768px) 176px, 256px'}
        className="h-auto w-full object-contain"
      />
    </Link>
  );
}
