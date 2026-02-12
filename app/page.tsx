"use client";

import { useState, useEffect } from "react";
import FloatingNav from "./components/FloatingNav";
import Hero from "./components/Hero";
import Particles from "./components/Particles";
import RocketPreloader from "./components/RocketPreloader";
import BentoGrid from "./components/BentoGrid";
import WorkSection from "./components/WorkSection";
import Team from "./components/Team";
import ContactFooter from "./components/ContactFooter";
import FooterWrapper from "./components/sections/FooterWrapper";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    // Check session storage to see if user has visited before
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      // If visited, skip loading instantly
      setIsLoading(false);
      setShowPreloader(false);
    } else {
      // If first time, show preloader and play animation
      setShowPreloader(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("hasVisited", "true");
  };

  return (
    <>
      {showPreloader && <RocketPreloader onComplete={handlePreloaderComplete} />}
      {!isLoading && (
        <div className="min-h-screen bg-zinc-950">
          <FloatingNav />
          <main>
            <Hero />
            <Particles />
            <BentoGrid />
            <FooterWrapper>
              <WorkSection />
              <Team />
              <ContactFooter />
            </FooterWrapper>
          </main>
        </div>
      )}
    </>
  );
}
