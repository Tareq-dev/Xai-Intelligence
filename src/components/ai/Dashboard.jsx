"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

const tabs = ["Overview", "Signals", "Automation"];

const data = {
  Overview: {
    score: "96%",
    title: "AI Confidence",
    desc: "Prediction accuracy based on analyzed intelligence",
  },

  Signals: {
    score: "12.8K",
    title: "Processed Signals",
    desc: "Events analyzed from multiple data sources",
  },

  Automation: {
    score: "42",
    title: "Active Workflows",
    desc: "AI generated automation processes",
  },
};

export default function Dashboard() {
  const section = useRef();

  const [active, setActive] = useState("Overview");

  useGSAP(
    () => {
      gsap.from(".dashboard-shell", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 50%",
        },
      });
    },
    {
      scope: section,
    },
  );

  return (
    <section ref={section} className="relative bg-[#030712] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-cyan-300 tracking-[5px] text-sm">
            AI COMMAND CENTER
          </p>

          <h2 className="mt-5 text-5xl md:text-7xl font-bold">
            Intelligence
            <span className="text-cyan-300"> Dashboard</span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            A real-time interface where AI insights become operational
            decisions.
          </p>
        </div>
        <div className="dashboard-shell grid lg:grid-cols-[260px_1fr] rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
          <aside className="border-r border-white/10 p-6 bg-black/20">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 flex justify-center items-center text-black font-bold rounded-xl bg-cyan-300">
                AI
              </div>

              <div>
                <h3 className="font-semibold">Xai</h3>

                <p className="text-[10px] tracking-[2px] text-cyan-300">
                  INTELLIGENCE
                </p>
              </div>
            </div>

            <nav className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`w-full cursor-pointer text-left px-5 py-3 rounded-xl transition ${
                    active === tab
                      ? "bg-cyan-300 text-black"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="mt-12 rounded-3xl border border-white/10 p-5 bg-white/5">
              <p className="text-xs text-gray-500">SYSTEM HEALTH</p>

              <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-cyan-300 rounded-full" />
              </div>

              <p className="mt-3 text-sm text-gray-300">92% Stable</p>
            </div>
          </aside>

          <main className="p-6 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-500 text-sm">
                  Workspace / Intelligence
                </p>

                <h3 className="text-3xl font-bold mt-2">{active}</h3>
              </div>

              <div className="px-5 py-2 rounded-full bg-green-400/10 text-green-300 text-sm">
                ● LIVE
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                <div className="grid md:grid-cols-3 gap-5">
                  <Card title={data[active].title} value={data[active].score} />

                  <Card title="Data Quality" value="98%" />

                  <Card title="Automation" value="87%" />
                </div>

                <div className="mt-8 grid lg:grid-cols-[1.3fr_.7fr] gap-5">
                  <div className="rounded-3xl border border-white/10 p-8 bg-white/3">
                    <h4 className="font-semibold mb-8">Neural Activity</h4>

                    <div className="flex items-end gap-4 h-52">
                      {[40, 80, 55, 90, 65, 95, 70, 85].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            height: 0,
                          }}
                          animate={{
                            height: `${h}%`,
                          }}
                          transition={{
                            delay: i * 0.05,
                          }}
                          className="flex-1 rounded-t-xl bg-cyan-300"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 p-8 bg-white/3">
                    <h4>AI Intelligence Score</h4>

                    <div className="relative w-44 h-44 mx-auto mt-10 rounded-full border-14 border-cyan-300/20 flex items-center justify-center">
                      <span className="text-4xl font-bold">96</span>
                    </div>

                    <p className="text-center mt-5 text-gray-400">
                      Confidence Level
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  );
}
