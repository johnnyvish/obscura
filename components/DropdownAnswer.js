"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

export default function DropdownAnswer({ question, answer }) {
  const plusCircleRef = useRef(null);
  const plusRef = useRef(null);
  const answerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    gsap.to(plusCircleRef.current, {
      duration: 0.1,
      scale: 1.1,
      backgroundColor: "#0083B0", // Darker blue on hover
    });
    gsap.to(plusRef.current, {
      duration: 0.1,
      color: "white",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(plusCircleRef.current, {
      duration: 0.1,
      scale: 1.0,
      backgroundColor: "#E0F7FA", // Light blue as default
    });
    gsap.to(plusRef.current, {
      duration: 0.1,
      color: "#0083B0",
    });
  };

  const handleClick = () => {
    // Rotate the plus/minus icon
    gsap.to(plusRef.current, {
      duration: 0.3,
      rotation: isOpen ? 0 : -180,
    });

    if (!isOpen) {
      // Opening: measure the full height and animate from 0 to that height.
      const fullHeight = answerRef.current.scrollHeight;
      gsap.fromTo(
        answerRef.current,
        { height: 0 },
        {
          duration: 0.3,
          height: fullHeight,
          ease: "power1.inOut",
          onComplete: () => {
            // Set to auto so it adjusts if content size changes.
            answerRef.current.style.height = "auto";
          },
        }
      );
    } else {
      // Closing: If height is "auto", set it to the current pixel value before animating.
      gsap.set(answerRef.current, { height: answerRef.current.scrollHeight });
      gsap.to(answerRef.current, {
        duration: 0.3,
        height: 0,
        ease: "power1.inOut",
      });
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border-b border-gray-300">
      {/* FAQ Header */}
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="w-full text-left focus:outline-none"
      >
        <div className="flex justify-between items-center py-4 px-4">
          <h2 className="text-2xl md:text-4xl font-semibold flex-1">
            {question}
          </h2>
          <div
            ref={plusCircleRef}
            className="flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full bg-[#E0F7FA] ml-4"
          >
            <span
              ref={plusRef}
              className="text-lg md:text-3xl"
              style={{ color: "#0083B0" }}
            >
              {isOpen ? "-" : "+"}
            </span>
          </div>
        </div>
      </button>

      {/* FAQ Answer */}
      <div
        ref={answerRef}
        className="overflow-hidden px-4"
        style={{ height: "0px" }}
      >
        <p className="text-lg md:text-xl py-4">{answer}</p>
      </div>
    </div>
  );
}
