import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import Eyebrow from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        id="main-content"
        className="relative isolate flex min-h-[80dvh] items-center bg-charcoal pt-24 lg:pt-36"
      >
        <div className="shell py-20">
          <Eyebrow>404</Eyebrow>
          <h1 className="display mt-5 text-[clamp(1.6rem,4vw,3rem)]">
            Wrong room. <span className="text-gold">The party is this way.</span>
          </h1>
          <p className="body-copy mt-6 max-w-[40ch]">
            The page you were looking for has moved or never existed.
          </p>
          <Link href="/" className="button-primary mt-10">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
