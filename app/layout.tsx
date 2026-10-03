import type { Metadata, Viewport } from 'next';
import './globals.css';
import Grain from '@/components/ui/Grain';
import SmoothScroll from '@/components/providers/SmoothScroll';
import RevealController from '@/components/providers/RevealController';
import JsonLd from '@/components/seo/JsonLd';
import { rootMetadata } from '@/lib/seo';

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: '#070605',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AE" className="js-ready">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,900&f[]=gambetta@400,400i&f[]=bespoke-serif@400,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
        />
        <noscript>
          <style>{`html.js-ready [data-reveal]{opacity:1;transform:none}html.js-ready [data-mask]{clip-path:none}html.js-ready [data-mask]>*{transform:none}`}</style>
        </noscript>
      </head>
      <body>
        <div id="top" aria-hidden="true" />
        <JsonLd />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <RevealController />
        <Grain />
        {children}
      </body>
    </html>
  );
}
