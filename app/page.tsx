import Landing from "@/components/Landing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ManifestoAndStats from "@/components/ManifestoAndStats";
import SelectedWork from "@/components/SelectedWork";
import TrustStrip from "@/components/TrustStrip";
import StickyNav from "@/components/StickyNav";
import Writing from "@/components/Writing";
import ScrollReveal from "@/components/ScrollReveal";
import BookingModal from "@/components/BookingModal";
import Diagnostics from "@/components/Diagnostics";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Uzair Khatri AI systems architect portfolio</h1>
      <ScrollReveal />
      <StickyNav />
      <Landing />
      <ManifestoAndStats />
      <SelectedWork />
      <About />
      <TrustStrip />
      <Diagnostics />
      <Writing />
      <Contact />
      <Footer />
      <BookingModal />
    </main>
  );
}
