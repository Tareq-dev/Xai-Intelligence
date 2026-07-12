"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] border-t border-white/10 px-6 py-16 overflow-hidden">
      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-400/10 blur-[120px] rounded-full left-1/2 top-0 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-300 flex items-center justify-center">
                <span className="text-black font-bold">AI</span>
              </div>

              <div>
                <h1 className="font-bold text-xl">Xai</h1>

                <p className="text-[10px] tracking-[2px] text-cyan-300">
                  INTELLIGENCE
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-400 max-w-sm leading-relaxed">
              Transforming raw data into intelligent systems through advanced AI technology.
            </p>
          </div>


          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-cyan-300 transition cursor-pointer">
                Home
              </li>

              <li className="hover:text-cyan-300 transition cursor-pointer">
                Intelligence
              </li>

              <li className="hover:text-cyan-300 transition cursor-pointer">
                Solutions
              </li>

              <li className="hover:text-cyan-300 transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Connect
            </h3>

            <div className="flex gap-4">

              <a className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-300 hover:border-cyan-300/40 transition">
                <Github size={20} />
              </a>

              <a className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-300 hover:border-cyan-300/40 transition">
                <Linkedin size={20} />
              </a>

              <a className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-300 hover:border-cyan-300/40 transition">
                <Twitter size={20} />
              </a>

              <a className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-300 hover:border-cyan-300/40 transition">
                <Mail size={20} />
              </a>

            </div>
          </div>

        </div>


        {/* Bottom */}

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">

          <p>
            © 2026 Xai. All rights reserved.
          </p>

          <p>
            Built with AI • Data • Intelligence
          </p>

        </div>

      </div>
    </footer>
  );
}