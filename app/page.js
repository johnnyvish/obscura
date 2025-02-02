"use client";

import HeroSection from "../components/HeroSection";

/* ---------------------------------- TODO ---------------------------------- */

// 1. Add film grain overlay to video

/* ---------------------------------- CODE ---------------------------------- */

const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
  >
    {/* Interlocking Rings */}
    <circle cx="30" cy="50" r="20" stroke="white" strokeWidth="6" />
    <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="6" />
  </svg>
);

const AboutSection = () => (
  <section className="flex flex-col items-center justify-center min-h-screen px-8 lg:px-32 py-24 bg-black text-white">
    <h2 className="text-6xl font-bold mb-8 text-center">About</h2>
    <p className="text-xl max-w-3xl text-center opacity-75 mb-16">
      Born from a vision to empower human perception, Obscura blurs the line
      between authenticity and invention. We are a team of neuroscientists,
      engineers, and designers who believe in pushing the boundaries of what’s
      possible—and what’s permissible.
    </p>
    <p className="text-xl max-w-3xl text-center opacity-75 mb-16">
      Our mission is to offer unprecedented agency over reality. Through our
      ethically flexible approach, we invite you to ask yourself: should we
      reshape the world to fit our desires, or confront it as it is?
    </p>
  </section>
);

const NavBar = () => (
  <nav className="flex justify-between items-center px-16 py-4 bg-black text-white w-full fixed z-50 opacity-[0.95] backdrop-blur-lg">
    <div className="flex items-center">
      <Logo />
      <span className="text-xl font-bold">Overnight Engine</span>
    </div>
    <div className="flex gap-8 absolute left-1/2 transform -translate-x-1/2 text-lg">
      <a href="#" className="hover:text-gray-300">
        Features
      </a>
      <a href="#" className="hover:text-gray-300">
        About
      </a>
      <a href="#" className="hover:text-gray-300">
        Contact
      </a>
    </div>
    <button className="bg-white text-black px-6 py-2 rounded-2xl flex items-center gap-4">
      pre-order
      <div className="bg-black rounded-full w-6 h-6 flex items-center justify-center">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 6H10M10 6L6 2M10 6L6 10"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  </nav>
);

// Overnight Engine
// OE1

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <AboutSection />
    </div>
  );
}
