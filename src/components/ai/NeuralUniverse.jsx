"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NeuralUniverse() {
  const wrapper = useRef();
  const canvas = useRef();

  const [mode, setMode] = useState("RAW SIGNALS");

  const activated = useRef(false);

  useEffect(() => {
    const container = canvas.current;

    if (!container) return;

    const isMobile = window.innerWidth < 640;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    camera.position.z = isMobile ? 7 : 9;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);

      camera.aspect = width / height;

      camera.updateProjectionMatrix();
    }

    resize();

    container.appendChild(renderer.domElement);

    window.addEventListener("resize", resize);

    // Mobile 500 particle
    // Desktop 900 particle

    const COUNT = window.innerWidth < 640 ? 500 : 900;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(COUNT * 3);

    const raw = [];
    const brain = [];
    const cube = [];

    for (let i = 0; i < COUNT; i++) {
      // RAW DATA

      raw.push({
        x: (Math.random() - 0.5) * 5,

        y: (Math.random() - 0.5) * 5,

        z: (Math.random() - 0.5) * 4,
      });

      // BRAIN FORM

      const angle = (i / COUNT) * Math.PI * 2;

      brain.push({
        x: Math.cos(angle) * 1.7,

        y: Math.sin(angle) * 1.2,

        z: Math.sin(i * 0.2) * 0.5,
      });

      // CUBE FORM

      const cubeSize = 2.5;

      cube.push({
        x: (Math.random() - 0.5) * cubeSize,

        y: (Math.random() - 0.5) * cubeSize,

        z: (Math.random() - 0.5) * cubeSize,
      });

      positions[i * 3] = raw[i].x;

      positions[i * 3 + 1] = raw[i].y;

      positions[i * 3 + 2] = raw[i].z;
    }

    geometry.setAttribute(
      "position",

      new THREE.BufferAttribute(positions, 3),
    );

    const material = new THREE.PointsMaterial({
      color: "#67e8f9",

      // Mobile particle

      size: isMobile ? 0.08 : 0.05,

      transparent: true,

      opacity: 0.9,

      blending: THREE.AdditiveBlending,

      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);

    scene.add(points);

    // CONNECTION SYSTEM

    const lineGeometry = new THREE.BufferGeometry();

    const lineArray = new Float32Array(COUNT * 6);

    lineGeometry.setAttribute(
      "position",

      new THREE.BufferAttribute(lineArray, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#22d3ee",

      transparent: true,

      opacity: 0.25,
    });

    const network = new THREE.LineSegments(
      lineGeometry,

      lineMaterial,
    );

    scene.add(network);

    const progress = {
      value: 0,
    };

    ScrollTrigger.create({
      trigger: wrapper.current,

      start: "top 85%",

      end: "bottom 10%",

      scrub: 1.2,

      onUpdate(self) {
        progress.value = self.progress;

        if (self.progress < 0.3) {
          setMode("RAW SIGNALS");
        } else if (self.progress < 0.65) {
          setMode("NEURAL PROCESSING");
        } else {
          setMode("INTELLIGENCE CORE");
        }
      },
    });

    const mouse = {
      x: 0,

      y: 0,
    };

    function mouseMove(e) {
      mouse.x = e.clientX / window.innerWidth - 0.5;

      mouse.y = e.clientY / window.innerHeight - 0.5;
    }

    window.addEventListener("mousemove", mouseMove);

    let frame;

    function animate() {
      const attr = geometry.attributes.position;

      for (let i = 0; i < COUNT; i++) {
        let target;

        if (progress.value < 0.5) {
          target = raw[i];
        } else if (progress.value < 0.85) {
          target = brain[i];
        } else {
          target = cube[i];
        }

        attr.array[i * 3] += (target.x - attr.array[i * 3]) * 0.035;

        attr.array[i * 3 + 1] += (target.y - attr.array[i * 3 + 1]) * 0.035;

        attr.array[i * 3 + 2] += (target.z - attr.array[i * 3 + 2]) * 0.035;
      }

      attr.needsUpdate = true;

      const lp = lineGeometry.attributes.position;

      for (let i = 0; i < COUNT - 2; i++) {
        const a = i * 3;

        const b = (i + 2) * 3;

        lp.array[i * 6] = attr.array[a];

        lp.array[i * 6 + 1] = attr.array[a + 1];

        lp.array[i * 6 + 2] = attr.array[a + 2];

        lp.array[i * 6 + 3] = attr.array[b];

        lp.array[i * 6 + 4] = attr.array[b + 1];

        lp.array[i * 6 + 5] = attr.array[b + 2];
      }

      lp.needsUpdate = true;

      points.rotation.y += 0.002;

      network.rotation.y += 0.002;

      points.rotation.x += (mouse.y * 0.4 - points.rotation.x) * 0.03;

      points.rotation.z += (mouse.x * 0.3 - points.rotation.z) * 0.03;

      const move = isMobile ? 0.4 : 0.8;

      camera.position.x += (mouse.x * move - camera.position.x) * 0.03;

      camera.position.y += (mouse.y * move - camera.position.y) * 0.03;

      renderer.render(scene, camera);

      frame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("mousemove", mouseMove);

      window.removeEventListener("resize", resize);

      geometry.dispose();

      material.dispose();

      lineGeometry.dispose();

      lineMaterial.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  function activate() {
    activated.current = !activated.current;

    gsap.to(".activate-btn", {
      scale: 1.15,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });
  }

  return (
    <section
      ref={wrapper}
      className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-8 text-white lg:px-10"
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[100px] lg:h-[650px] lg:w-[650px] lg:blur-[160px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* LEFT CONTENT */}

        <div className="text-center lg:text-left">
          <p className="text-xs tracking-[5px] text-cyan-300 sm:text-sm sm:tracking-[6px]">
            SIGNATURE AI CORE
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AI that
            <span className="block text-cyan-300">evolves.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base md:text-lg lg:mx-0 lg:mt-6">
            Raw data reorganizes into neural intelligence, structured systems
            and predictive decisions.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-xs font-medium tracking-wide text-cyan-300 backdrop-blur-md sm:text-sm">
              {mode}
            </div>

            <button
              onClick={activate}
              className="activate-btn rounded-full bg-cyan-300 px-5 py-3 text-xs font-semibold text-black transition hover:bg-cyan-200 sm:text-sm"
            >
              Activate Core
            </button>
          </div>
        </div>

        {/* THREE JS CANVAS */}

        <div
          ref={canvas}
          className="relative mx-auto h-[400px] w-full max-w-[500px] overflow-hidden lg:h-[600px] lg:max-w-none"
        >
          {/* Inner Glow */}

          <div className="pointer-events-none absolute inset-[20%] rounded-full bg-cyan-400/20 blur-[80px] sm:blur-[120px]" />
        </div>
      </div>
    </section>
  );
}
