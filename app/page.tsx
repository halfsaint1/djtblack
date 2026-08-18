import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Channels from '@/components/sections/Channels';
import Footer from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Channels />
      </main>
      <Footer />
    </>
  );
}
