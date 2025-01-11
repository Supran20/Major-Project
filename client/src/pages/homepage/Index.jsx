// import React from "react";
// import Header from ".../components/layouts/Navbar";
import Slider from "./Slider";
import MidSection from "./MidSection";
import Discover from "./Discover";
import NewYorkSection from "./NewYorkSection";
import Section from "../../assets/images/Section.png";

export const Home = () => {
  return (
    <div>
      <img src={Section} alt="Section" className="w-full" />
      <Slider />
      <MidSection />
      <img
        src="/src/assets/images/Section2.png"
        alt="Section 2"
        className="w-full my-0"
      />
      <Discover />
      <NewYorkSection />
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 VIU. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
