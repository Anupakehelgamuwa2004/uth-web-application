"use client";

import { useState } from "react";
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

  return (
    <>
      <RocketPreloader onComplete={() => setIsLoading(false)} />
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
