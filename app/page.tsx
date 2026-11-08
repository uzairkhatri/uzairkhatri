import Landing from "@/components/Landing";
import DualPathways from "@/components/DualPathways";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SelectedWork from "@/components/SelectedWork";
import EngagementModels from "@/components/EngagementModels";
import StickyNav from "@/components/StickyNav";
import ScrollReveal from "@/components/ScrollReveal";
import BookingModal from "@/components/BookingModal";
import MobileActionBar from "@/components/MobileActionBar";
import { FaqJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <main>
      <FaqJsonLd />
      <ScrollReveal />
      <StickyNav />
      <Landing />
      <DualPathways />
      <SelectedWork />
      <EngagementModels />
      <Contact />
      <Footer />
      <BookingModal />
      <MobileActionBar />
    </main>
  );
}
