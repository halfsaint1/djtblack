import type { IconType } from 'react-icons';
import {
  SiApplemusic,
  SiFacebook,
  SiInstagram,
  SiMixcloud,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
  SiX,
  SiYoutube,
} from 'react-icons/si';

type Platform =
  | 'instagram'
  | 'tiktok'
  | 'x'
  | 'facebook'
  | 'soundcloud'
  | 'spotify'
  | 'mixcloud'
  | 'youtube'
  | 'apple-music';

const icons: Record<Platform, IconType> = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  x: SiX,
  facebook: SiFacebook,
  soundcloud: SiSoundcloud,
  spotify: SiSpotify,
  mixcloud: SiMixcloud,
  youtube: SiYoutube,
  'apple-music': SiApplemusic,
};

export default function PlatformIcon({
  platform,
  className = '',
}: {
  platform: Platform;
  className?: string;
}) {
  const Icon = icons[platform];

  return <Icon aria-hidden="true" className={className} />;
}

export type { Platform };
