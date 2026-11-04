import Landing from "@/components/Landing";
import DualPathways from "@/components/DualPathways";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ManifestoAndStats from "@/components/ManifestoAndStats";
import EcosystemLogos from "@/components/EcosystemLogos";
import SelectedWork from "@/components/SelectedWork";
import EngagementModels from "@/components/EngagementModels";
import WorkingWithUzair from "@/components/WorkingWithUzair";
import TrustStrip from "@/components/TrustStrip";
import StickyNav from "@/components/StickyNav";
import ScrollReveal from "@/components/ScrollReveal";
import BookingModal from "@/components/BookingModal";
import MobileActionBar from "@/components/MobileActionBar";
import AEOQuestions from "@/components/AEOQuestions";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <StickyNav />
      <Landing />
      <DualPathways />
      <EcosystemLogos />
      <ManifestoAndStats />
      <SelectedWork />
      <About />
      <AEOQuestions show="services" />
      <Writing />
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
