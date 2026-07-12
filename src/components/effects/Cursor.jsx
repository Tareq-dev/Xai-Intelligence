"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursor = useRef(null);

  useEffect(() => {
    const el = cursor.current;
    if (!el) return;

    const move = (e) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const hover = () => {
      gsap.to(el, {
        scale: 3,
        backgroundColor: "#67e8f9",
        duration: 0.25,
      });
    };

    const leave = () => {
      gsap.to(el, {
        scale: 1,
        backgroundColor: "#ffffff",
        duration: 0.25,
      });
    };

    window.addEventListener("mousemove", move);

    const items = document.querySelectorAll("button, a");

    items.forEach((item) => {
      item.addEventListener("mouseenter", hover);
      item.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      items.forEach((item) => {
        item.removeEventListener("mouseenter", hover);
        item.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <div
      ref={cursor}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 rounded-full bg-white mix-blend-difference"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}