"use client";

import { useEffect, useRef } from "react";

import * as THREE from "three";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AIHeroCore() {
  const canvas = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100); //  (FOV, aspect, near, far);

    camera.position.z = 7;

    // 3D scene to pixel
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(520, 520);

    canvas.current.appendChild(renderer.domElement);

    const COUNT = 700;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(COUNT * 3);

    const raw = [];

    const structured = [];

    for (let i = 0; i < COUNT; i++) {
      // RAW DATA

      const r = 2 + Math.random() * 2;

      const theta = Math.random() * Math.PI * 2;

      const phi = Math.random() * Math.PI;

      raw.push({
        x: r * Math.sin(phi) * Math.cos(theta),

        y: r * Math.sin(phi) * Math.sin(theta),

        z: r * Math.cos(phi),
      });

      // INTELLIGENCE GRID

      const size = 2.5;

      const row = Math.floor(i / 20);

      const col = i % 20;

      structured.push({
        x: (col / 20 - 0.5) * size,

        y: (row / 35 - 0.5) * size,

        z: 0,
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

      size: 0.035,
    });

    const points = new THREE.Points(geometry, material);

    scene.add(points);

    let progress = {
      value: 0,
    };

    ScrollTrigger.create({
      trigger: canvas.current,

      start: "top 60%",

      end: "bottom 20%",

      scrub: true,

      onUpdate(self) {
        progress.value = self.progress;
      },
    });

    let mouse = {
      x: 0,
      y: 0,
    };

    function move(e) {
      mouse.x = e.clientX / window.innerWidth - 0.5;

      mouse.y = e.clientY / window.innerHeight - 0.5;
    }

    window.addEventListener("mousemove", move);

    let frame;

    function animate() {
      const attr = geometry.attributes.position;

      for (let i = 0; i < COUNT; i++) {
        const target = progress.value > 0.5 ? structured[i] : raw[i];

        attr.array[i * 3] += (target.x - attr.array[i * 3]) * 0.03;

        attr.array[i * 3 + 1] += (target.y - attr.array[i * 3 + 1]) * 0.03;

        attr.array[i * 3 + 2] += (target.z - attr.array[i * 3 + 2]) * 0.03;
      }

      attr.needsUpdate = true;

      points.rotation.y += 0.002;

      points.rotation.x = mouse.y * 0.3;

      points.rotation.z = mouse.x * 0.2;

      renderer.render(scene, camera);

      frame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("mousemove", move);

      geometry.dispose();

      material.dispose();

      renderer.dispose();

      canvas.current.innerHTML = "";
    };
  }, []);

  return <div ref={canvas} className=""></div>;
}
