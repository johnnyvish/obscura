"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

export default function DropdownAnswer({ question, answer }) {
  const plusCircleRef = useRef(null);
  const plusRef = useRef(null);
  const answerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="flex flex-col justify-center items-center w-[95%] gap-2 md:gap-9 pl-[4vw] "
      onMouseEnter={() => {
        gsap.to(plusCircleRef.current, {
          duration: 0.1,
          scale: 1.1,
          backgroundColor: "#0083B0" // Darker blue on hover
        });
        gsap.to(plusRef.current, {
          duration: 0.1,
          color: "white"
        });
      }}
      onMouseLeave={() => {
        gsap.to(plusCircleRef.current, {
          duration: 0.1,
          scale: 1.0,
          backgroundColor: "#E0F7FA" // Light blue as default
        });
        gsap.to(plusRef.current, {
          duration: 0.1,
          color: "#0083B0"
        });
      }}
      onClick={() => {
        gsap.to(plusRef.current, {
          duration: 0.3,
          rotation: isOpen ? 0 : -180
        });
        gsap.to(answerRef.current, {
          duration: 0.3,
          height: isOpen ? "0px" : "auto"
        });
        setIsOpen(!isOpen);
      }}
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl md:text-4xl font-semibold text-left w-[80%]">
          {question}
        </h2>
        <div
          ref={plusCircleRef}
          className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-[#E0F7FA] flex justify-center items-center"
        >
          <p ref={plusRef} className="text-lg md:text-3xl" style={{ color: "#0083B0" }}>
            {isOpen ? "-" : "+"}
          </p>
        </div>
      </div>
      <div
        ref={answerRef}
        className="overflow-hidden w-full h-0 flex justify-end items-center"
      >
        <p className="text-lg md:text-xl text-start w-[50%] mt-4">{answer}</p>
      </div>
      <div className="w-full h-[1px] md:h-[2px] bg-gray-300" />
    </button>
  );
}