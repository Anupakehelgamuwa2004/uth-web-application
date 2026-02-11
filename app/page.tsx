"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Particles from "./components/Particles";
import RocketPreloader from "./components/RocketPreloader";
import BentoGrid from "./components/BentoGrid";
import WorkSection from "./components/WorkSection";
import ParallaxSection from "./components/ParallaxSection";
import ContactFooter from "./components/ContactFooter";
import FooterWrapper from "./components/sections/FooterWrapper";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <RocketPreloader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <div className="min-h-screen bg-zinc-950">
          <Navbar />
          <main>
            <Hero />
            <Particles />
            <BentoGrid />
            <WorkSection />
            <FooterWrapper>
              <ParallaxSection />
              <ContactFooter />
            </FooterWrapper>
          </main>
        </div>
      )}
    </>
  );
}
