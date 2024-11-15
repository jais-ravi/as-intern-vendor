import React from "react";
import MainNav from "@/components/Header/MainNav";
import WorkSection from "@/components/mainpage/WorkSection";
import FaqSection from "@/components/mainpage/FaqSection";
import Footer from "@/components/mainpage/Footer";
import FeaturedSection from "@/components/mainpage/FeaturedSection";
import HeroSection from "@/components/mainpage/HeroSection";

const page = () => {
  return (
    <div className="w-full h-screen ">
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

export default page;
