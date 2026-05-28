import Landing from "@/components/Landing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroStats from "@/components/HeroStats";
import SelectedWork from "@/components/SelectedWork";
import TrustStrip from "@/components/TrustStrip";
import StickyNav from "@/components/StickyNav";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Uzair Khatri AI systems architect portfolio</h1>
      <StickyNav />
      <Landing />
      <HeroStats />
      <About />
      <TrustStrip />
      <SelectedWork />
      <Contact />
      <Footer />
    </main>
  );
}
