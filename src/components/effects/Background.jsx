"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Background() {
  const glow = useRef(null);

  useEffect(() => {
    if (!glow.current) return;

    const tween = gsap.to(glow.current, {
      x: 200,
      y: -100,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => tween.kill();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <div
        ref={glow}
        className="absolute left-[20%] top-[20%] h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[150px]"
      />

      <div className="absolute bottom-[10%] right-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[150px]" />
    </div>
  );
}