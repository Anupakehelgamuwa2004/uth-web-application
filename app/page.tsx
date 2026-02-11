"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Particles from "./components/Particles";
import Preloader from "./components/Preloader";
import BentoGrid from "./components/BentoGrid";
import WorkSection from "./components/WorkSection";
import ParallaxSection from "./components/ParallaxSection";
import ContactFooter from "./components/ContactFooter";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <div className="min-h-screen bg-zinc-950">
          <Navbar />
          <main>
            <Hero />
            <Particles />
            <BentoGrid />
            <WorkSection />
            <ParallaxSection />
            <ContactFooter />
          </main>
        </div>
      )}
    </>
  );
}
