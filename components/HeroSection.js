import { useRef, useEffect } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);

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
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-black relative">
      <div className="absolute z-10 flex flex-col items-center">
        <h1 className="text-[12rem] font-bold text-white">OE 1</h1>
        <p className="text-3xl mt-[-2rem] font-semibold text-white">
          Wake up to results, not to-do&apos;s.
        </p>
      </div>
      <div className="w-[95%] h-[95%] mt-16">
        <video
          className="w-full h-full object-cover filter blur-lg rounded-[48px]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
            WebkitMaskImagße:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
          }}
          autoPlay
          muted
          loop
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <img
          src="/grain.jpg"
          alt="Film Grain"
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none rounded-[48px]"
          style={{ opacity: 0.25 }}
        /> */}
      </div>
    </section>
  );
}
