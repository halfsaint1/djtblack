export default function Eyebrow({
  children,
  className = '',
  align = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${className}`}
    >
      <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
