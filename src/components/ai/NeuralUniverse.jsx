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

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100); //  (FOV, aspect, near, far);

    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    function resize() {
      const size = container.clientWidth;

      renderer.setSize(size, size);

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    resize();

    container.appendChild(renderer.domElement);

    const COUNT = 900;

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

      // NEURAL BRAIN FORM

      const angle = (i / COUNT) * Math.PI * 2;

      brain.push({
        x: Math.cos(angle) * 1.7,

        y: Math.sin(angle) * 1.2,

        z: Math.sin(i * 0.2) * 0.5,
      });

      // INTELLIGENCE CUBE

      const size = 1.8;

      cube.push({
        x: (Math.random() - 0.5) * size,

        y: (Math.random() - 0.5) * size,

        z: (Math.random() - 0.5) * size,
      });

      positions[i * 3] = raw[i].x;

      positions[i * 3 + 1] = raw[i].y;

      positions[i * 3 + 2] = raw[i].z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#67e8f9",

      size: 0.05,

      transparent: true,

      opacity: 0.9,

      blending: THREE.AdditiveBlending,
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

    const network = new THREE.LineSegments(lineGeometry, lineMaterial);

    scene.add(network);

    const progress = {
      value: 0,
    };

    ScrollTrigger.create({
      trigger: wrapper.current,

      start: "top 60%",

      end: "bottom 30%",

      scrub: 2,

      onUpdate(self) {
        progress.value = self.progress;

        if (self.progress < 0.3) setMode("RAW SIGNALS");
        else if (self.progress < 0.65) setMode("NEURAL PROCESSING");
        else setMode("INTELLIGENCE CORE");
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

    window.addEventListener("resize", resize);

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

      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.03;

      camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.03;

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
      className="relative min-h-screen bg-[#020617] px-6 py-10 overflow-hidden"
    >
      <div className="absolute w-[600px] h-[600px] bg-cyan-400/10 blur-[160px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10  items-center">
        <div>
          <p className="text-cyan-300 tracking-[6px] text-sm">
            SIGNATURE AI CORE
          </p>

          <h2 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
            AI that
            <span className="text-cyan-300">evolves.</span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            Raw data reorganizes into neural intelligence, structured systems
            and predictive decisions.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <div className="px-6 py-3 rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-300">
              {mode}
            </div>

            <button
              onClick={activate}
              className="activate-btn px-6 py-3 rounded-full bg-cyan-300 text-black font-semibold"
            >
              Activate Core
            </button>
          </div>
        </div>

        <div
          ref={canvas}
          className="relative w-full max-w-[350px] mx-auto md:max-w-none md:w-full md:ml-0 h-[350px] lg:h-[600px]"
        >
          <div className="absolute inset-20 bg-cyan-400/20 blur-[120px] rounded-full" />
        </div>
      </div>
    </section>
  );
}
