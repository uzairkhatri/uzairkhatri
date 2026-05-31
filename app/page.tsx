import Landing from "@/components/Landing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroStats from "@/components/HeroStats";
import Manifesto from "@/components/Manifesto";
import SelectedWork from "@/components/SelectedWork";
import TrustStrip from "@/components/TrustStrip";
import StickyNav from "@/components/StickyNav";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Uzair Khatri AI systems architect portfolio</h1>
      <StickyNav />
      <Landing />
      <HeroStats />
      <Manifesto />
      <SelectedWork />
      <About />
      <TrustStrip />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}
