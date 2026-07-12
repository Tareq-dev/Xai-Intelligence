"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Home", "Intelligence", "Systems", "Analytics", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4 rounded-md border border-white/10 bg-white/[0.05] backdrop-blur-xl">
          {/* LOGO */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-300 flex items-center justify-center">
              <span className="text-black font-bold">AI</span>
            </div>

            <div>
              <h1 className="font-bold text-xl">NEXUS</h1>

              <p className="text-[10px] tracking-[4px] text-cyan-300">
                INTELLIGENCE
              </p>
            </div>
          </motion.div>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href="#"
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="text-gray-300 hover:text-cyan-300 transition text-sm"
              >
                {item}
              </motion.a>
            ))}

            <button className="px-6 py-3 rounded-full bg-cyan-300 text-black font-semibold hover:scale-105 transition">
              Launch AI
            </button>
          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="md:hidden mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
            >
              <div className="p-6 flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setOpen(false)}
                    className="text-gray-300 hover:text-cyan-300 transition"
                  >
                    {item}
                  </a>
                ))}

                <button className="px-6 py-3 rounded-full bg-cyan-300 text-black font-semibold">
                  Launch AI
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
