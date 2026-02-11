"use client";

import { ReactNode } from "react";
import MagneticStars from "../MagneticStars";

interface FooterWrapperProps {
  children: ReactNode;
}

export default function FooterWrapper({ children }: FooterWrapperProps) {
  return (
    <section 
      className="relative w-full bg-black"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Single Background Layer - Shared across both sections */}
      <div className="absolute inset-0 z-0">
        <MagneticStars starCount={150} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
