import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

export default function HeroSection() {
  const videoRef = useRef(null);

  // Pause the video after 3 seconds
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleTimeUpdate = () => {
        if (video.currentTime >= 3) {
          video.pause();
          video.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  // Typewriter effect for job titles
  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const roles = ["researcher.", "data analyst.", "developer.", "planner."];

    // Create a timeline that repeats indefinitely.
    let tl = gsap.timeline({ repeat: -1 });

    // Start with an empty text.
    tl.set(".typewriter-text", { text: "" });

    roles.forEach((role) => {
      // Animate the text in (typewriter effect)
      tl.to(".typewriter-text", {
        duration: 1.5,
        text: role,
        ease: "none",
      })
        // Pause briefly then clear the text before typing the next role
        .to(".typewriter-text", {
          duration: 0.5,
          text: "",
          ease: "none",
          delay: 2,
        });
    });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-black relative pt-12">
      {/* Text container */}
      <div className="absolute z-10 flex flex-col items-center">
        <h1 className="text-[12rem] font-bold text-white">OE 1</h1>
        <p className="text-3xl mt-[-2rem] font-semibold text-white">
          Your overnight{" "}
          <span className="typewriter-text border-r-2 border-white pr-1"></span>
        </p>
      </div>
      {/* Video container */}
      <div className="relative w-[95%] h-[95%] mt-16 rounded-[48px] overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover filter blur-lg"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
          }}
          autoPlay
          muted
          loop
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Film Grain Overlay */}
        <Image
          src="/grain.jpg"
          alt="Film Grain"
          fill
          className="object-cover pointer-events-none"
          style={{ opacity: 0.25 }}
        />
      </div>
    </section>
  );
}
