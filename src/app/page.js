"use client"
import React, { useEffect, useRef } from "react";
import MainNav from "@/components/Header/MainNav";
import WorkSection from "@/components/mainpage/WorkSection";
import FaqSection from "@/components/mainpage/FaqSection";
import Footer from "@/components/mainpage/Footer";
import FeaturedSection from "@/components/mainpage/FeaturedSection";
import HeroSection from "@/components/mainpage/HeroSection";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const Page = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollContainerRef.current,
        smooth: true,
      });

      // Cleanup to prevent memory leaks
      return () => {
        locomotiveScroll.destroy();
      };
    }
  }, []);

  return (
    <div ref={scrollContainerRef} className="w-full h-screen" data-scroll-container>
      <MainNav />
      <div className="pt-10">
        <HeroSection />
      </div>
      <WorkSection />
      <FaqSection />
      <FeaturedSection />
      <Footer />
    </div>
  );
};

export default Page;
