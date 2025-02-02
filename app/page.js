"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import DropdownAnswer from "@/components/DropdownAnswer";

// Dynamically import Particles so it only renders on the client side.
const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });

// ParticleBackground component without calling loadFull.
const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // Simply log the engine initialization.
    console.log("Particles engine initialized:", engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "#000" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          collisions: { enable: false },
          move: {
            enable: true,
            speed: 1,
            outModes: { default: "bounce" },
          },
          number: {
            density: { enable: true, area: 800 },
            value: 50,
          },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
};

const Logo = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300"
    whileHover={{ scale: 1.15, rotate: 360 }}
  >
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7F00FF" />
        <stop offset="100%" stopColor="#E100FF" />
      </linearGradient>
    </defs>
    <circle cx="30" cy="50" r="20" stroke="url(#grad)" strokeWidth="6" />
    <circle cx="50" cy="50" r="20" stroke="url(#grad)" strokeWidth="6" />
  </motion.svg>
);

const NavBar = () => (
  <motion.nav
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7 }}
    className="flex justify-between items-center px-8 md:px-16 py-4 bg-black bg-opacity-80 text-white fixed w-full z-50 backdrop-blur-lg shadow-lg"
  >
    <div className="flex items-center gap-2">
      <Logo />
      <span className="text-xl font-bold">Overnight Engine</span>
    </div>
    <div className="hidden md:flex gap-8 text-lg">
      {["Features", "About", "Contact"].map((item, idx) => (
        <a
          key={idx}
          href={`#${item.toLowerCase()}`}
          className="relative hover:text-pink-500 transition-colors"
        >
          {item}
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100"></span>
        </a>
      ))}
    </div>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition"
    >
      Pre-order
    </motion.button>
  </motion.nav>
);

const FeaturesSection = () => (
  <motion.section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-24 py-24 bg-black text-white">
    {/* "What is OE1?" */}
    <div className="max-w-3xl text-center pb-32">
      <h2 className="text-5xl md:text-6xl font-extrabold mb-6">What is OE1?</h2>
      <p className="text-xl md:text-2xl opacity-90">
        OE1 is your personal AI agent that works overnight to complete tasks,
        generate insights, and prepare what you need—so you wake up with
        results, not to-dos.
      </p>
    </div>

    {/* "How it works" */}
    <div className="max-w-3xl text-center mb-12 bg-white rounded-2xl p-12 text-black">
      <h3 className="text-4xl md:text-5xl font-bold mb-4">How it works</h3>
      <ol className="list-decimal list-inside text-xl space-y-4">
        <li>
          <strong>Assign Tasks</strong> – Tell OE1 what you need.
        </li>
        <li>
          <strong>Sleep</strong> – OE1 runs AI-powered workflows overnight.
        </li>
        <li>
          <strong>Wake Up to Results</strong> – Find completed work, insights,
          and progress waiting for you.
        </li>
      </ol>
    </div>

    {/* Call-to-Action */}
    <div className="max-w-3xl text-center">
      <h3 className="text-4xl md:text-5xl font-bold mb-4">
        Get work done while you get sleep.
      </h3>
      <p className="text-xl mb-2">Maximize your time.</p>
      <p className="text-xl mb-2">Wake up to progress.</p>
      <p className="text-xl mb-6">Experience OE1 today.</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-black px-8 py-3 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition"
      >
        Pre-Order Now
      </motion.button>
    </div>
  </motion.section>
);

const AboutSection = () => (
  <motion.section
    id="about"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24 bg-black bg-opacity-80 text-white"
  >
    <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
      About OE1
    </h2>
    <p className="text-xl md:text-2xl max-w-3xl text-center opacity-90 mb-6">
      <strong>Wake Up to Progress. Let AI Work While You Rest.</strong>
    </p>
    <p className="text-lg md:text-xl max-w-3xl text-center opacity-80 mb-6">
      OE1 is your <strong>personal AI agent</strong> that works overnight to{" "}
      <strong>
        complete tasks, generate insights, and prepare what you need
      </strong>{" "}
      — so you wake up with results, not to-dos.
    </p>
    <ul className="text-lg md:text-xl max-w-3xl text-center opacity-80 mb-6 list-disc list-inside space-y-2">
      <li>
        <strong>🚀 Automate Workflows</strong> – Let OE1 handle tasks while you
        sleep.
      </li>
      <li>
        <strong>🔍 Analyze & Generate</strong> – Get reports, research, and
        summaries by morning.
      </li>
      <li>
        <strong>⚡ Supercharge Productivity</strong> – From emails to code, let
        AI handle it all.
      </li>
    </ul>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-4 bg-gradient-to-r from-purple-400 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition"
    >
      Try OE1 Now
    </motion.button>
  </motion.section>
);

const FAQSection = () => {
  const questionsAndAnswers = [
    {
      question: "What is OE1?",
      answer:
        "OE1 is your personal AI agent that works overnight to complete tasks, generate insights, and prepare what you need.",
    },
    {
      question: "How does OE1 work?",
      answer:
        "Simply input your tasks, and our AI processes them while you sleep, delivering the results by morning.",
    },
    {
      question: "Who is OE1 for?",
      answer:
        "OE1 is designed for busy professionals, entrepreneurs, researchers, and developers looking to maximize productivity.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 py-24 bg-black bg-opacity-90 text-white"
    >
      <div className="flex justify-center items-start pl-[4vw] md:pl-[16vw] pb-8">
        <h2 className="text-4xl md:text-6xl font-semibold leading-[3rem] md:leading-[4rem]">
          Have questions?
          <br />
          <span className="bg-gradient-to-r from-[#00B4DB] to-[#0083B0] inline-block text-transparent bg-clip-text">
            Get answers
          </span>
        </h2>
      </div>
      {questionsAndAnswers.map((qa, index) => (
        <DropdownAnswer key={index} question={qa.question} answer={qa.answer} />
      ))}
    </section>
  );
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      {/* <AboutSection /> */}
      {/* <FAQSection /> */}
    </div>
  );
}
