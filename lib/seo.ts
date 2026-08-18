import type { Metadata } from 'next';
import { brand, channels } from '@/lib/site';

export const siteUrl = 'https://djtblack.com';

export const seo = {
  siteName: brand.name,
  defaultTitle: 'DJ TBLACK | Dubai DJ for Clubs, Weddings and Events',
  titleTemplate: '%s | DJ TBLACK',
  defaultDescription:
    'DJ TBLACK is a Lagos-born, Dubai-based DJ for clubs, weddings, birthdays, festivals, corporate nights and private events worldwide.',
  ogImage: '/images/og.jpg',
  ogImageAlt: 'DJ TBLACK, The Vibe Master',
  twitterHandle: '@iamdjtblack',
  locale: 'en_AE',
} as const;

export const sameAs = [
  ...channels.socials.map((item) => item.href),
  ...channels.sound.map((item) => item.href),
];

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const pageTitle = title;
  const url = absoluteUrl(path);

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${pageTitle} | ${seo.siteName}`,
      description,
      url,
      type: 'website',
      locale: seo.locale,
      siteName: seo.siteName,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | ${seo.siteName}`,
      description,
      images: [seo.ogImage],
      creator: seo.twitterHandle,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.defaultDescription,
  applicationName: seo.siteName,
  authors: [{ name: seo.siteName, url: siteUrl }],
  creator: seo.siteName,
  publisher: seo.siteName,
  category: 'music',
  keywords: [
    'DJ TBLACK',
    'Dubai DJ',
    'Afrobeats DJ',
    'wedding DJ Dubai',
    'club DJ Dubai',
    'festival DJ',
    'birthday DJ',
    'corporate event DJ',
    'private event DJ',
    'Lagos DJ',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  openGraph: {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    url: siteUrl,
    type: 'website',
    locale: seo.locale,
    siteName: seo.siteName,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    images: [seo.ogImage],
    creator: seo.twitterHandle,
  },
};

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: seo.siteName,
        description: seo.defaultDescription,
        inLanguage: 'en-AE',
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: seo.siteName,
        alternateName: 'The Vibe Master',
        url: siteUrl,
        image: absoluteUrl(seo.ogImage),
        jobTitle: 'DJ',
        email: brand.email,
        telephone: brand.phoneHref,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressRegion: 'Dubai',
          addressCountry: 'AE',
        },
        homeLocation: {
          '@type': 'Place',
          name: brand.base,
        },
        nationality: {
          '@type': 'Country',
          name: 'Nigeria',
        },
        sameAs,
        knowsAbout: [
          'Afrobeats',
          'Amapiano',
          'Club DJ',
          'Wedding DJ',
          'Festival DJ',
          'Corporate events',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: `${seo.siteName} DJ Services`,
        url: absoluteUrl('/#services'),
        provider: { '@id': `${siteUrl}/#person` },
        areaServed: ['Dubai', 'Abu Dhabi', 'Lagos', 'Worldwide'],
        serviceType: [
          'Club DJ',
          'Wedding DJ',
          'Festival DJ',
          'Corporate event DJ',
          'Private event DJ',
        ],
      },
    ],
  };
}
