import Landing from "@/components/Landing";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ManifestoAndStats from "@/components/ManifestoAndStats";
import EcosystemLogos from "@/components/EcosystemLogos";
import SelectedWork from "@/components/SelectedWork";
import ProductionCommandCenter from "@/components/ProductionCommandCenter";
import EngagementModels from "@/components/EngagementModels";
import WorkingWithUzair from "@/components/WorkingWithUzair";
import TrustStrip from "@/components/TrustStrip";
import StickyNav from "@/components/StickyNav";
import ScrollReveal from "@/components/ScrollReveal";
import BookingModal from "@/components/BookingModal";
import MobileActionBar from "@/components/MobileActionBar";
import AEOQuestions from "@/components/AEOQuestions";

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <StickyNav />
      <Landing />
      <EcosystemLogos />
      <ManifestoAndStats />
      <SelectedWork />
      <ProductionCommandCenter />
      <About />
      <AEOQuestions show="services" />
      <EngagementModels />
      <Timeline />
      <WorkingWithUzair />
      <TrustStrip />
      <AEOQuestions show="faq" />
      <Contact />
      <Footer />
      <BookingModal />
      <MobileActionBar />
    </main>
  );
}
