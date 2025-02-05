"use client";

import React, { useCallback, memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import DropdownAnswer from "@/components/DropdownAnswer";

// Dynamically import Particles so it only renders on the client side.
const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });

// Enhanced particles configuration with a dark background and dynamic properties.
const particlesOptions = {
  background: { color: { value: "#121212" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 120, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 140,
      enable: true,
      opacity: 0.1,
      width: 1,
    },
    collisions: { enable: false },
    move: {
      enable: true,
      speed: 1.5,
      outModes: { default: "bounce" },
    },
    number: {
      density: { enable: true, area: 800 },
      value: 70,
    },
    opacity: { value: 0.3 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 4 } },
  },
  detectRetina: true,
};

const ParticleBackground = memo(() => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Particles engine initialized:", engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      className="absolute inset-0 z-0"
    />
  );
});
ParticleBackground.displayName = "ParticleBackground";

const Logo = memo(() => (
  <motion.svg
    width="50"
    height="50"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-500"
    whileHover={{ scale: 1.2, rotate: 360 }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
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
));
Logo.displayName = "Logo";

const navItems = ["How It Works", "About", "Designed For", "FAQ"];

/* --------------------------------- NAV BAR -------------------------------- */

const NavBar = memo(() => (
  <motion.nav
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="flex justify-between items-center px-8 md:px-16 py-4 bg-black text-white fixed w-full z-50 backdrop-blur-lg shadow-2xl"
    aria-label="Main Navigation"
  >
    <div className="flex items-center gap-3">
      <Logo />
      <motion.span
        className="text-xl font-extrabold bg-white bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Overnight Engine
      </motion.span>
    </div>
    <div className="hidden md:flex gap-8 text-lg">
      {navItems.map((item, index) => (
        <motion.a
          key={item}
          href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
          className="relative hover:text-[#E100FF] transition-colors"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
        >
          {item}
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100"></span>
        </motion.a>
      ))}
    </div>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white text-black px-6 py-2 rounded-full flex items-center gap-3 font-semibold shadow-lg hover:shadow-2xl transition"
    >
      Buy
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.button>
  </motion.nav>
));
NavBar.displayName = "NavBar";

/* ------------------------------ HOW IT WORKS ------------------------------ */

const HowItWorksSection = memo(() => {
  const steps = [
    {
      title: "Assign Tasks",
      desc: "Tell OE 1 what you need.",
    },
    {
      title: "Sleep",
      desc: "OE 1 runs AI-powered workflows overnight.",
    },
    {
      title: "Wake Up to Results",
      desc: "Find completed work, insights, and progress waiting for you.",
    },
  ];

  return (
    <motion.section
      id="how-it-works"
      className="relative z-10 flex flex-col items-center justify-center px-6 py-24 bg-black text-white"
    >
      <motion.h2
        className="text-8xl md:text-6xl font-extrabold mb-16 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={item.title}
            className="p-6 rounded-2xl bg-[#161618] hover:bg-[#2a2a2a] cursor-pointer"
            custom={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-xl font-bold mb-4">
              {index + 1}
            </div>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-lg">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
});
HowItWorksSection.displayName = "HowItWorksSection";

/* ------------------------------ WHAT IS OE 1? ------------------------------ */

const AboutSection = memo(() => (
  <motion.section
    id="about"
    viewport={{ once: true }}
    className="relative z-10 flex flex-col items-center justify-center px-6 py-24 bg-black text-white"
  >
    <motion.h2
      className="text-8xl md:text-6xl font-black mb-8 text-center text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    >
      What is OE 1?
    </motion.h2>
    <motion.p
      className="text-2xl md:text-2xl max-w-3xl text-center font-medium opacity-80 mb-8 leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    >
      OE 1 is your personal AI agent that works overnight to complete tasks,
      generate insights, and prepare what you need—so you wake up with results,
      not to-dos.
    </motion.p>
  </motion.section>
));
AboutSection.displayName = "AboutSection";

/* ------------------------------ FEATURES SECTION ------------------------------ */

const FeaturesSection = memo(() => {
  const features = [
    {
      emoji: "🚀",
      title: "Automate Workflows",
      desc: "Give OE 1 tasks, and it works while you sleep.",
    },
    {
      emoji: "🔍",
      title: "Analyze & Generate",
      desc: "Reports, research, summaries—ready by morning.",
    },
    {
      emoji: "⚡",
      title: "Supercharge Productivity",
      desc: "From emails to code, let AI handle it.",
    },
  ];

  return (
    <motion.section
      id="features"
      className="relative z-10 flex flex-col items-center justify-center px-6 py-24 bg-black text-white"
    >
      <motion.h2
        className="text-8xl md:text-6xl font-extrabold mb-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Features
      </motion.h2>
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="p-6 rounded-xl bg-[#161618] hover:bg-[#2a2a2a] cursor-pointer"
            custom={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold mb-3 text-white">
              {feature.emoji} {feature.title}
            </h3>
            <p className="text-lg opacity-90">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
});
FeaturesSection.displayName = "FeaturesSection";

/* ----------------------------- DESIGNED FOR ----------------------------- */

const DesignedForSection = memo(() => (
  <motion.section
    id="designed-for"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
    className="relative z-10 flex flex-col items-center justify-center px-6 py-24 bg-black text-white"
  >
    <motion.h2
      className="text-4xl md:text-5xl font-extrabold mb-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      Designed for:
    </motion.h2>
    <div className="max-w-3xl w-full">
      <ul className="list-none space-y-4 text-xl md:text-2xl">
        <li className="flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <span>Busy Professionals – Start your day ahead of schedule.</span>
        </li>
        <li className="flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <span>
            Entrepreneurs & Researchers – Get insights and reports overnight.
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <span>
            Developers & Creators – Let AI handle drafts, summaries, and
            automation.
          </span>
        </li>
      </ul>
    </div>
  </motion.section>
));
DesignedForSection.displayName = "DesignedForSection";

/* ------------------------------ CTA SECTION ------------------------------ */

const CTASection = memo(() => (
  <motion.section
    id="cta"
    className="relative z-10 flex flex-col items-center justify-center px-6 py-24 bg-black text-white text-center"
  >
    <motion.h2
      className="text-7xl md:text-6xl font-extrabold mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      Get work done while you sleep.
    </motion.h2>
    <motion.p
      className="text-2xl md:text-2xl max-w-3xl mb-16 leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      Maximize your time. Wake up to progress. Experience <strong>OE 1</strong>{" "}
      today.
    </motion.p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white text-black px-8 py-4 rounded-full text-2xl font-black shadow-xl hover:shadow-2xl transition"
    >
      Pre-Order Now
    </motion.button>
  </motion.section>
));
CTASection.displayName = "CTASection";

/* ------------------------------- FAQ SECTION ------------------------------ */

const faqData = [
  {
    question: "What types of tasks can OE 1 automate?",
    answer:
      "OE 1 can handle a range of tasks—from scheduling and data analysis to content generation and even code drafting—all tailored to your specific needs.",
  },
  {
    question: "How does OE 1 ensure the quality of its outputs?",
    answer:
      "OE 1 leverages advanced AI algorithms and continuous learning, integrating feedback loops to deliver high-quality, contextually relevant results.",
  },
  {
    question: "Is my data secure with OE 1?",
    answer:
      "Absolutely. OE 1 uses industry-standard encryption and robust data protection protocols to ensure your information remains confidential and secure.",
  },
  {
    question: "Can I customize the AI workflows?",
    answer:
      "Yes, OE 1 is designed to be flexible. You can tailor workflows to match your specific requirements, ensuring optimal productivity.",
  },
  {
    question: "Who can benefit the most from using OE 1?",
    answer:
      "Busy professionals, entrepreneurs, researchers, developers, and creators can all leverage OE 1 to automate repetitive tasks and gain valuable insights overnight.",
  },
];

const FAQSection = memo(() => (
  <section
    id="faq"
    className="relative z-10 flex flex-col items-center justify-start px-6 py-24 bg-black text-white"
  >
    <div className="max-w-4xl w-full mx-auto">
      <motion.h2
        className="text-5xl md:text-8xl font-semibold leading-relaxed text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Got questions?
        <br />
        <span className="text-4xl md:text-8xl inline-block text-white leading-relaxed">
          We’ve got answers.
        </span>
      </motion.h2>
      {faqData.map((qa, index) => (
        <DropdownAnswer key={index} question={qa.question} answer={qa.answer} />
      ))}
    </div>
  </section>
));
FAQSection.displayName = "FAQSection";

/* ------------------------------- MAIN COMPONENT ------------------------------ */

export default function Home() {
  return (
    <div className="relative bg-black">
      <ParticleBackground />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesSection />
      {/* <DesignedForSection /> */}
      <CTASection />
      <FAQSection />
    </div>
  );
}
