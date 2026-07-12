"use client";

import Navbar from "@/components/Navbar";
import Dashboard from "@/components/ai/Dashboard";
import Flow from "@/components/ai/Flow";
import Hero from "@/components/ai/Hero";
import NeuralUniverse from "@/components/ai/NeuralUniverse";

export default function Page() {
  return (
    <main className="ai-page  ">
      <Navbar />
      <Hero />
      <Flow />
      <Dashboard />
      <NeuralUniverse />
    </main>
  );
}
