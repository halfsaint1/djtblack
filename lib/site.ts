export const brand = {
  name: 'DJ TBLACK',
  role: 'Dubai-based DJ',
  base: 'Dubai, United Arab Emirates',
  origin: 'Lagos, Nigeria',
  email: 'booking@djtblack.com',
  phone: '+971 50 418 2276',
  phoneHref: '+971504182276',
};

export const nav = [
  { label: 'About Me', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Shop', href: '#shop' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  kicker: 'From Lagos · Based in Dubai',
  title: ['DJ TBLACK', 'The Vibe Master'],
  statement:
    'Afrobeats is home. Amapiano, highlife, house and soul move around it, built for the people in the room.',
  primaryCta: 'Hire DJ TBLACK',
  secondaryCta: 'Explore My Mixes',
  cities: ['Lagos', 'Dubai', 'Abu Dhabi', 'Doha', 'London', 'Marrakech'],
};

export const story = {
  eyebrow: 'About Me',
  headline: 'DJ TBLACK',
  lead:
    'Lagos-born. Dubai-based. Clubs, weddings, birthdays, festivals, corporate nights and private events worldwide.',
  paragraphs: [
    'Afrobeats is the foundation. Amapiano, highlife, house and soul follow when the room is ready, not when a playlist says so.',
    'The craft began in Lagos, where the floor is earned record by record. Dubai added precision: timing, restraint, and knowing when to hold back so the room can catch up.',
    'That travels now. Festival stages, club residencies, weddings that need to move by midnight, birthdays and private rooms where every transition counts.',
    'I do not arrive with a saved set. I arrive with range, instinct, and enough discipline to let the night build.',
  ],
  readMoreCta: 'Read more about me',
  readMoreHref: '/about',
  closing: 'The floor is the brief.',
  image: '/images/about-portrait.png',
  imageAlt: 'DJ TBLACK at the decks in a club, wearing headphones',
};

export const nights = {
  eyebrow: 'Selected nights',
  title: 'Proof lives on the floor.',
  intro:
    'A selection of rooms with different expectations, different audiences and one shared outcome: nobody checking how long is left.',
  items: [
    {
      image: '/images/work-01.jpg',
      number: '01',
      title: 'The Garden Ceremony',
      place: 'Emirates Hills',
      year: '2025',
      type: 'Luxury wedding',
      audience: '320 guests · 11 nationalities',
      story:
        'A restrained ceremony gave way to a reception moving from old soul into Afrobeats and a closing hour of amapiano.',
      alt: 'Wedding table set with florals and candlelight',
    },
    {
      image: '/images/work-05.jpg',
      number: '02',
      title: 'After the Headliner',
      place: 'Al Marmoom',
      year: '2025',
      type: 'Festival closing set',
      audience: '4,000 guests · open air',
      story:
        'A high-pressure closing slot built around percussion, call-and-response and a patient final release.',
      alt: 'Festival main stage seen from within the crowd',
    },
    {
      image: '/images/work-06.jpg',
      number: '03',
      title: 'The Brand Room',
      place: 'DIFC',
      year: '2024',
      type: 'Global product launch',
      audience: '480 guests · invitation only',
      story:
        'Elegant arrival music, exact speech cues and a dance floor that opened without changing the character of the brand.',
      alt: 'Guests gathered at an evening brand launch',
    },
    {
      image: '/images/work-08.jpg',
      number: '04',
      title: 'Homecoming',
      place: 'Victoria Island',
      year: '2024',
      type: 'Private celebration',
      audience: '650 guests · Lagos',
      story:
        'A return to the music that started it: highlife memory, new Afrobeats and a room singing every word.',
      alt: 'Hands raised through stage haze at a homecoming show',
    },
  ],
};

export const services = {
  eyebrow: 'Services',
  headline: 'Available for your night',
  lead: 'Clubs, weddings, birthdays, festivals, corporate nights and private events. Wherever the room needs a set built around the people in it.',
  cta: 'Hire DJ TBLACK',
  items: [
    {
      title: 'Clubs',
      summary: 'Residencies, guest sets and late rooms where the floor has to keep moving.',
      icon: 'clubs' as const,
    },
    {
      title: 'Weddings',
      summary: 'From the ceremony to the last dance, one night that works for both families and everyone who came to party.',
      icon: 'weddings' as const,
    },
    {
      title: 'Birthdays',
      summary: 'Milestone nights that start personal and end with the whole room involved.',
      icon: 'birthdays' as const,
    },
    {
      title: 'Private events',
      summary: 'Villas, rooftops and closed-door rooms where every transition has to land.',
      icon: 'private' as const,
    },
    {
      title: 'Festivals',
      summary: 'Open-air stages and main rooms, from warm-up and peak time through to closing the night.',
      icon: 'festivals' as const,
    },
    {
      title: 'Corporate events',
      summary: 'Launches, galas and company nights. Sharp through the programme, open on the floor when it counts.',
      icon: 'corporate' as const,
    },
  ],
};

export const channels = {
  eyebrow: 'Listen & Follow',
  headline: 'Hear the night.',
  lead: 'Full sets, guest mixes and the feed between bookings. Stream it, follow it, stay close to the room.',
  socials: [
    {
      label: 'Instagram',
      handle: '@djtblackworldwide',
      href: 'https://www.instagram.com/djtblackworldwide/',
      platform: 'instagram' as const,
    },
    {
      label: 'TikTok',
      handle: '@djtblack',
      href: 'https://tiktok.com/@djtblack',
      platform: 'tiktok' as const,
    },
    {
      label: 'X',
      handle: '@iamdjtblack',
      href: 'https://x.com/iamdjtblack',
      platform: 'x' as const,
    },
    {
      label: 'Facebook',
      handle: '@djtblack',
      href: 'https://facebook.com/djtblack',
      platform: 'facebook' as const,
    },
  ],
  sound: [
    {
      label: 'SoundCloud',
      handle: 'DJ TBLACK',
      href: 'https://soundcloud.com/djtblack',
      platform: 'soundcloud' as const,
    },
    {
      label: 'Spotify',
      handle: 'DJ TBLACK',
      href: 'https://open.spotify.com/artist/djtblack',
      platform: 'spotify' as const,
    },
    {
      label: 'Mixcloud',
      handle: 'DJ TBLACK',
      href: 'https://mixcloud.com/djtblack',
      platform: 'mixcloud' as const,
    },
    {
      label: 'YouTube',
      handle: 'DJ TBLACK',
      href: 'https://youtube.com/@djtblack',
      platform: 'youtube' as const,
    },
    {
      label: 'Apple Music',
      handle: 'DJ TBLACK',
      href: 'https://music.apple.com/artist/djtblack',
      platform: 'apple-music' as const,
    },
  ],
};

export const voices = {
  eyebrow: 'From the room',
  title: 'What remains after the last record.',
  quotes: [
    {
      quote:
        'We handed him four hundred guests from nine countries and a father of the bride who insisted he does not dance. By eleven, both were on the floor.',
      author: 'Amira Haddad',
      role: 'Private client · Emirates Hills',
    },
    {
      quote:
        'He understood that the brand mattered before the party—and exactly when the party was allowed to take over.',
      author: 'Maya Richardson',
      role: 'Regional events director · Dubai',
    },
    {
      quote:
        'No panic, no empty transitions, no ego. Just a room that kept getting better for six hours.',
      author: 'Khalid Al Mansoori',
      role: 'Private host · Abu Dhabi',
    },
  ],
  image: '/images/client-portrait.jpg',
  imageAlt: 'Portrait of a DJ TBLACK client',
  credentials: ['Dubai based', 'Worldwide travel', 'Planner friendly', 'Full technical rider'],
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} DJ TBLACK`,
};
