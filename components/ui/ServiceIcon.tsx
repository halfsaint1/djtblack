import type { IconType } from 'react-icons';
import { LuBriefcase, LuCake, LuDisc3, LuHeart, LuLock, LuTent } from 'react-icons/lu';

export type ServiceIconName =
  | 'clubs'
  | 'weddings'
  | 'birthdays'
  | 'private'
  | 'festivals'
  | 'corporate';

const icons: Record<ServiceIconName, IconType> = {
  clubs: LuDisc3,
  weddings: LuHeart,
  birthdays: LuCake,
  private: LuLock,
  festivals: LuTent,
  corporate: LuBriefcase,
};

export default function ServiceIcon({
  name,
  className = '',
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = icons[name];

  return <Icon aria-hidden="true" className={className} strokeWidth={1.35} />;
}
