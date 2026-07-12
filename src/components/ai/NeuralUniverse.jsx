"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function NeuralUniverse() {
  const wrapper = useRef();
  const canvas = useRef();

  const [mode, setMode] = useState("RAW SIGNALS");

  const activated = useRef(false);
  function activate() {
    //     activated.current = !activated.current;
    //     gsap.to(".activate-btn", {
    //       scale: 1.15,
    //       duration: 0.3,
    //       yoyo: true,
    //       repeat: 1,
    //     });
  }
  return (
    <section
      ref={wrapper}
      className="relative min-h-screen bg-[#020617] px-6 py-10 overflow-hidden"
    >
      <div className="absolute w-[600px] h-[600px] bg-cyan-400/10 blur-[160px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
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
          className="relative md:w-full -ml-35 md:ml-0 h-[350px] sm:h-[500px] lg:h-[600px]"
        >
          <div className="absolute inset-20 bg-cyan-400/20 blur-[120px] rounded-full" />
        </div>
      </div>
    </section>
  );
}

export default NeuralUniverse;
