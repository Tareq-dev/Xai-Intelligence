"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020617]"
        >
          <div className="text-center">
            <p className="text-sm tracking-[8px] text-cyan-300">
              INITIALIZING AI CORE
            </p>

            <div className="mt-8 h-2 w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                className="h-full bg-cyan-300"
              />
            </div>

            <p className="mt-5 text-sm text-gray-500">SYSTEM READY ✓</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}