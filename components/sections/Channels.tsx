import { channels } from '@/lib/site';
import ChannelCard from '@/components/ui/ChannelCard';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Channels() {
  const [featured, ...soundRest] = channels.sound;

  return (
    <section id="channels" className="relative isolate bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
      />

      <div className="shell py-14 md:py-16">
        <div className="grid gap-5 border-b border-line pb-6 md:grid-cols-12 md:items-end md:gap-6 md:pb-8">
          <header className="md:col-span-7">
            <Eyebrow>{channels.eyebrow}</Eyebrow>
            <h2 className="display mt-4 text-[clamp(1.45rem,3.4vw,2.5rem)]">{channels.headline}</h2>
          </header>
          <p className="body-copy max-w-[36ch] md:col-span-5 md:justify-self-end md:text-right md:text-pretty">
            {channels.lead}
          </p>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-end justify-between gap-4">
            <p className="micro text-gold">Listen</p>
            <p className="micro hidden text-ivory/28 sm:block">{channels.sound.length} channels</p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            <ChannelCard item={featured} variant="featured" />
            {soundRest.map((item) => (
              <ChannelCard key={item.label} item={item} variant="standard" />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="micro mb-3 text-gold">Follow Me On</p>
          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {channels.socials.map((item) => (
              <ChannelCard key={item.label} item={item} variant="social" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
