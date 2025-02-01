"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

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

export default function Home() {
  const threeContainer = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      threeContainer.current.clientWidth / threeContainer.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      threeContainer.current.clientWidth,
      threeContainer.current.clientHeight
    );
    threeContainer.current.appendChild(renderer.domElement);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    // Glasses Model (Box)
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube for some basic animation
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      const width = threeContainer.current.clientWidth;
      const height = threeContainer.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on Unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      threeContainer.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      {/* Navigation */}
      <nav className="flex justify-between items-center px-16 py-4 bg-black text-white w-full fixed z-50 opacity-[0.95] backdrop-blur-lg">
        <div className="flex items-center">
          <Logo />
          <span className="text-xl font-bold">Obscura</span>
        </div>
        <div className="flex gap-8 absolute left-1/2 transform -translate-x-1/2 text-lg">
          <a href="#" className="hover:text-gray-300">
            Technology
          </a>
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

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-black">
        <div className="z-10 justify-center items-center flex flex-col">
          <h1 className="text-[12rem] font-bold text-white">Obscura 1</h1>
          <p className="text-3xl mt-[-2rem] font-semibold text-white">
            See What You Want to See.
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] mt-16">
          <video
            className="w-full h-full object-cover filter blur-lg rounded-[48px]"
            style={{
              maskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
            }}
            autoPlay
            loop
            muted
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img
            src="/grain.jpg"
            alt="Film Grain"
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none rounded-[48px]"
            style={{ opacity: 0.25 }}
          />
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="flex justify-center items-center h-screen bg-black">
        <div
          ref={threeContainer}
          style={{ width: "100%", height: "100%" }}
        ></div>
      </section>

      {/* About Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-8 lg:px-32 py-24 bg-black text-white">
        <h2 className="text-6xl font-bold mb-8 text-center">About</h2>
        <p className="text-xl max-w-3xl text-center opacity-75 mb-16">
          Born from a vision to empower human perception, Obscura blurs the line
          between authenticity and invention. We are a team of neuroscientists,
          engineers, and designers who believe in pushing the boundaries of
          what’s possible—and what’s permissible.
        </p>
        <p className="text-xl max-w-3xl text-center opacity-75 mb-16">
          Our mission is to offer unprecedented agency over reality. Through our
          ethically flexible approach, we invite you to ask yourself: should we
          reshape the world to fit our desires, or confront it as it is?
        </p>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-8 lg:px-32 py-24 bg-black text-white">
        <h2 className="text-6xl font-bold mb-8 text-center">Contact</h2>
        <p className="text-xl max-w-xl text-center opacity-75 mb-8">
          Ready to take the next step?
        </p>
        <form className="w-full max-w-md flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          ></textarea>
          <button
            type="submit"
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Send
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row px-16 py-8 bg-black text-white border-t border-gray-800">
        <div className="flex-1"></div>
        <p className="text-sm opacity-50">
          © {new Date().getFullYear()} Obscura Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
