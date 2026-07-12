"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-14 sm:pt-36 px-4 sm:px-6 bg-[#020617]">
      {/* Background Glow */}

      <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-cyan-400/20 blur-[100px] sm:blur-[120px] rounded-full left-[-120px] sm:left-[-200px] top-[100px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-10 items-center w-full">
        {/* TEXT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="text-center lg:text-left"
        >
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="text-cyan-300 tracking-[4px] sm:tracking-[5px] text-xs sm:text-sm"
          >
            AI INTELLIGENCE ENGINE
          </motion.p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.1] mt-6">
            Data
            <span className="text-cyan-300"> becomes</span>
            <br />
            Intelligence.
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
            Watch raw signals transform into structured intelligence, predictive
            insights and autonomous AI workflows.
          </p>

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="mt-8 sm:mt-10 px-7 sm:px-8 py-3 sm:py-4 rounded-full bg-cyan-300 text-black font-semibold text-sm sm:text-base"
          >
            Explore System
          </motion.button>
        </motion.div>

        {/* THREE JS VISUAL */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="relative flex justify-center items-center ml-[-80px] md:ml-0 order-first lg:order-last"
        >
          <div className="w-105 h-105 lg:w-130 lg:h-130">
           
          </div>
        </motion.div>
      </div>
    </section>
  );
}
