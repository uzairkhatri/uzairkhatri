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
import AEOQuestions from "@/components/AEOQuestions";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">
        Uzair Khatri | AI Services, SaaS Applications, Autonomous AI Workflows & Web Development Architect
      </h1>
      <ScrollReveal />
      <StickyNav />
      <Landing />
      <ManifestoAndStats />
      <SelectedWork />
      <ProductionCommandCenter />
      <About />
      <Timeline />
      <TrustStrip />
      <AEOQuestions />
      <Contact />
      <Footer />
      <BookingModal />
    </main>
  );
}
