import { Routes, Route } from "react-router-dom";

import FAQ from "./components/FAQ";
import FeaturedProperties from "./components/FeaturedProperties";
import Footer from "./components/Footer.jsx";
import HelpfulGuides from "./components/HelpfulGuides";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import SmartWay from "./components/SmartWay";
import SuccessCTA from "./components/SuccessCTA";
import TeamSection from "./components/TeamSection";
import Testimonials from "./components/Testemonials";
import Search from "./components/Search.jsx";

import Details from "./components/Details.jsx";
import ScheduleViewingModal from "./components/ScheduleViewingModal.jsx";
import ContactAgentModal from "./components/ContactAgentModule.jsx";
import ContactPage from "./components/ContactPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import GuideDetails from "./components/GuideDetails.jsx";
import SavedProperties from "./components/SavedProperties.jsx";
function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedProperties />
      <HowItWorks />
      <SmartWay />
      <TeamSection />
      <Testimonials />
      <SuccessCTA />
      <HelpfulGuides />
      <FAQ />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/details/:type/:id" element={<Details />} />
      <Route
        path="/viewing/:Name/:address"
        element={<ScheduleViewingModal />}
      />
      <Route path="/agentcontact" element={<ContactAgentModal />} />
      <Route path="/Contact-us" element={<ContactPage />} />
      <Route path="/About-us" element={<AboutPage />} />
      <Route path="/guides/:slug" element={<GuideDetails />} />
      <Route path="/saved-properties" element={<SavedProperties />} />
    </Routes>
  );
}
