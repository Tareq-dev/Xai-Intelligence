"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Flow() {
  const section = useRef();

  useGSAP(
    () => {
      const root = section.current;

      const paths = root.querySelectorAll(".connection");

      paths.forEach((path) => {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 10%",
          end: "center 50%",
          scrub: 2,
        },
      });

      tl.to(".connection", {
        strokeDashoffset: 0,
        duration: 2,
      })
        .to(".raw-node", {
          scale: 0.4,
          opacity: 0.3,
          duration: 1.5,
          stagger: 0.01,
        })
        .to(".ai-core", {
          opacity: 1,
          scale: 1,
          rotate: 360,
          duration: 2,
        })
        .to(".insight-box", {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.5,
        })
        .to(".automation", {
          opacity: 1,
          y: 0,
          duration: 1.5,
        });
    },
    {
      scope: section,
    },
  );

  return (
    <section
      ref={section}
      className="relative min-h-[140vh] bg-[#020617] px-4 sm:px-6 py-28 overflow-hidden"
    >
      <div className="absolute w-[500px] h-[500px] bg-cyan-400/10 blur-[140px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-cyan-300 tracking-[5px] text-sm">
            INTELLIGENCE PIPELINE
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-5">
            Raw Data
            <span className="text-cyan-300"> → Intelligence</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-xl">
            Watch unstructured information transform into AI powered decisions.
          </p>
        </div>

        <div className="relative h-[900px] md:h-[750px] rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          {/* SVG AREA */}

          <svg
            viewBox="0 0 900 700"
            className="hidden md:block absolute inset-0 w-full h-full"
          >
            <path
              className="connection"
              d="M150 250 C350 250 400 350 600 350"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
            />

            <path
              className="connection"
              d="M600 350 C720 350 760 450 780 520"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
            />

            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={i}
                className="raw-node"
                cx={120 + (i % 5) * 40}
                cy={220 + Math.floor(i / 5) * 40}
                r="10"
                fill="#67e8f9"
              />
            ))}

            <circle
              className="ai-core opacity-0"
              cx="450"
              cy="350"
              r="50"
              fill="transparent"
              stroke="#22d3ee"
              strokeWidth="4"
            />
          </svg>
          {/* MOBILE SVG */}

          <svg
            viewBox="0 0 400 900"
            className="md:hidden absolute inset-0 w-full h-full"
          >
            <path
              className="connection"
              d="M200 250 C200 350 200 400 200 450"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
            />

            <path
              className="connection"
              d="M200 500 C200 600 200 650 200 720"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
            />

            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={i}
                className="raw-node"
                cx={140 + (i % 5) * 30}
                cy={150 + Math.floor(i / 5) * 35}
                r="8"
                fill="#67e8f9"
              />
            ))}

            <circle
              className="ai-core opacity-0"
              cx="200"
              cy="480"
              r="45"
              fill="transparent"
              stroke="#22d3ee"
              strokeWidth="4"
            />
          </svg>

          {/* RAW LABEL */}

          <div className="absolute left-8 top-5">
            <h3 className="text-2xl font-bold">Raw Data</h3>

            <p className="text-gray-400 mt-2">Noise • Events • Signals</p>
          </div>

          {/* AI CORE */}

          <div className="ai-core absolute mt-12 md:mt-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 text-center">
            <div className="w-28 h-28 rounded-full border border-cyan-300 bg-cyan-300/10 flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,.5)]">
              <span className="text-cyan-300 font-bold">AI</span>
            </div>

            <p className="mt-4 text-cyan-300 text-xs tracking-[4px]">
              PROCESSING
            </p>
          </div>

          {/* INSIGHT */}

          <div className="insight-box absolute right-6 top-[70%] md:top-[45%] opacity-0 scale-50 rotate-12 w-[140px] md:w-[220px] rounded-3xl border border-cyan-300/30 bg-black/40 p-3 md:p-7 backdrop-blur-xl">
            <p className="text-gray-400 text-sm">Confidence</p>

            <h3 className="text-3xl md:text-5xl font-bold text-cyan-300 mt-3">
              96%
            </h3>

            <p className="text-gray-400 mt-3 text-xs md:text-sm">
              Generated Insight
            </p>
          </div>

          {/* AUTOMATION */}

          <div className="automation absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 translate-y-20 flex flex-wrap justify-center gap-3 w-full px-4">
            {["Workflow", "Decision", "Action"].map((item) => (
              <div
                key={item}
                className="px-5 py-1 md:py-3 rounded-full border border-white/10 bg-white/5 text-sm"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
