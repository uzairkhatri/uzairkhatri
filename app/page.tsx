import Landing from "@/components/Landing";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ManifestoAndStats from "@/components/ManifestoAndStats";
import SelectedWork from "@/components/SelectedWork";
import ProductionCommandCenter from "@/components/ProductionCommandCenter";
import TrustStrip from "@/components/TrustStrip";
import StickyNav from "@/components/StickyNav";
import ScrollReveal from "@/components/ScrollReveal";
import BookingModal from "@/components/BookingModal";
export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Uzair Khatri AI production architect portfolio</h1>
      <ScrollReveal />
      <StickyNav />
      <Landing />
      <ManifestoAndStats />
      <SelectedWork />
      <ProductionCommandCenter />
      <About />
      <Timeline />
      <TrustStrip />
      <Contact />
      <Footer />
      <BookingModal />
    </main>
  );
}
