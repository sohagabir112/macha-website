"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import MatchaSplashCanvas from "@/components/MatchaSplashCanvas";
import ProductSection from "@/components/ProductSection";

// Helper for Scrollytelling Beats
function OverlaySection({
  range,
  progress,
  children,
  className = ""
}: {
  range: [number, number],
  progress: any,
  children: React.ReactNode,
  className?: string
}) {
  const [start, end] = range;
  // Fade in over first 10% of range, fade out over last 10%
  const fadeInEnd = start + ((end - start) * 0.1);
  const fadeOutStart = end - ((end - start) * 0.1);

  const opacity = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, end],
    [20, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className={`fixed inset-0 w-full h-full pointer-events-none z-20 flex p-8 ${className}`}
    >
      <div className="pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <main ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]" style={{ position: "relative" }}>
        {/* Sticky Canvas Background */}
        <div className="fixed inset-0 w-full h-screen z-0">
          <MatchaSplashCanvas scrollYProgress={scrollYProgress} />
        </div>

        {/* Scrollytelling Sections Overlays */}
        <div className="relative z-10 w-full">

          {/* Beat A: Pure Fusion (0-20%) */}
          <OverlaySection
            range={[0, 0.2]}
            progress={scrollYProgress}
            className="items-center justify-center text-center"
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-white/90 mb-4">
              PURE FUSION
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide text-white/60">
              The perfect collision of earth and energy.
            </p>
          </OverlaySection>

          {/* Beat B: The Impact (25-45%) */}
          <OverlaySection
            range={[0.25, 0.45]}
            progress={scrollYProgress}
            className="items-center justify-start pl-10 md:pl-24"
          >
            <div className="max-w-2xl text-left">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 mb-4">
                THE IMPACT
              </h2>
              <p className="text-xl md:text-2xl font-light tracking-wide text-white/60">
                Hand-crafted precision meets raw dynamic motion.
              </p>
            </div>
          </OverlaySection>

          {/* Beat C: Artisan Chaos (50-70%) */}
          <OverlaySection
            range={[0.50, 0.70]}
            progress={scrollYProgress}
            className="items-center justify-end pr-10 md:pr-24"
          >
            <div className="max-w-2xl text-right">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 mb-4">
                ARTISAN CHAOS
              </h2>
              <p className="text-xl md:text-2xl font-light tracking-wide text-white/60">
                A suspended cloud of vibrant matcha and rich crema.
              </p>
            </div>
          </OverlaySection>

          {/* Beat D: Taste the Balance (75-95%) */}
          <OverlaySection
            range={[0.75, 0.95]}
            progress={scrollYProgress}
            className="items-center justify-center text-center"
          >
            <div className="flex flex-col items-center">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 mb-8">
                TASTE THE BALANCE
              </h2>
              <p className="text-xl md:text-2xl font-light tracking-wide text-white/60 mb-12">
                Ready to pour.
              </p>
              <Link href="/shop" className="px-12 py-4 bg-matcha hover:bg-white text-white hover:text-matcha transition-colors duration-300 text-lg font-medium tracking-widest uppercase rounded-full">
                Shop Now
              </Link>
            </div>
          </OverlaySection>

        </div>
      </main>

      {/* Product / Store Section (Lives after the scroll sequence) */}
      <div className="relative z-20 bg-[#050505]">
        <ProductSection />
      </div>
    </>
  );
}
