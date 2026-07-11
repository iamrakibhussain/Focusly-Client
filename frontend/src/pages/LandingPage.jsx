/*
File Purpose:
Public landing page composition using the marketing sections.

Connected With:
- frontend/src/components/landingpagecomponent/*
*/
import HeroSection from "../components/landingpagecomponent/HeroSection";
import TrustBar from "../components/landingpagecomponent/TrustBar";
import FeatureSection from "../components/landingpagecomponent/FeatureSection";
import HowToWork from "../components/landingpagecomponent/HowToWork";
import WhyFocusly from "../components/landingpagecomponent/WhyFocusly";
import TestimonialComponent from "../components/landingpagecomponent/TestimonialComponent";
import CallToAction from "../components/landingpagecomponent/CallToAction";
import Footer from "../components/landingpagecomponent/Footer";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeatureSection />
      <HowToWork />
      <WhyFocusly />
      <TestimonialComponent />
      <CallToAction />
      <Footer />
    </>
  );
}
