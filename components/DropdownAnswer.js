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
      backgroundColor: "#f5f5f5", // Light gray on hover
    });
    gsap.to(plusRef.current, {
      duration: 0.1,
      color: "black",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(plusCircleRef.current, {
      duration: 0.1,
      scale: 1.0,
      backgroundColor: "white", // White as default
    });
    gsap.to(plusRef.current, {
      duration: 0.1,
      color: "black",
    });
  };

  const handleClick = () => {
    gsap.to(plusRef.current, {
      duration: 0.3,
      rotation: isOpen ? 0 : -180,
    });

    if (!isOpen) {
      const fullHeight = answerRef.current.scrollHeight;
      gsap.fromTo(
        answerRef.current,
        { height: 0 },
        {
          duration: 0.3,
          height: fullHeight,
          ease: "power1.inOut",
          onComplete: () => {
            answerRef.current.style.height = "auto";
          },
        }
      );
    } else {
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
            className="flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full bg-white ml-4 border border-gray-300"
          >
            <span
              ref={plusRef}
              className="text-lg md:text-3xl"
              style={{ color: "black" }}
            >
              {isOpen ? "-" : "+"}
            </span>
          </div>
        </div>
      </button>
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
